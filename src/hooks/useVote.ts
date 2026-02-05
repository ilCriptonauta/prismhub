import { useState } from "react";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/out/react/account/useGetIsLoggedIn";
import { getAccountProvider } from "@multiversx/sdk-dapp/out/providers/helpers/accountProvider";
import { getAccount } from "@multiversx/sdk-dapp/out/methods/account/getAccount";
import { getAddress } from "@multiversx/sdk-dapp/out/methods/account/getAddress";
import { TransactionManager } from "@multiversx/sdk-dapp/out/managers/TransactionManager/TransactionManager";
import { refreshAccount } from "@multiversx/sdk-dapp/out/utils/account/refreshAccount";
import { Address, Transaction } from "@multiversx/sdk-core";
import { Buffer } from "buffer";

const ONX_TOKEN_ID = "ONX-3e51c8";
const VOTE_PRICE = "200"; // 200 ONX
const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqlcw9xqc29veuf65ynl3uftkc3dysmtca899q6zsrc5";

export function useVote() {
    const isLoggedIn = useGetIsLoggedIn();
    const [isVoting, setIsVoting] = useState(false);

    const handleVote = async (projectId: string) => {
        if (!isLoggedIn) {
            const { UnlockPanelManager } = await import("@multiversx/sdk-dapp/out/managers/UnlockPanelManager/UnlockPanelManager");
            const unlockPanelManager = UnlockPanelManager.init({
                loginHandler: async () => {
                    console.log("Logged in!");
                }
            });
            unlockPanelManager.openUnlockPanel();
            return;
        }

        setIsVoting(true);

        try {
            const provider = getAccountProvider();
            const account = getAccount();
            const senderAddress = getAddress();

            if (!provider || !account) {
                throw new Error("Provider or account not found");
            }

            // Price in atomic units (18 decimals)
            const amount = BigInt(VOTE_PRICE) * BigInt(10) ** BigInt(18);

            // ESDTTransfer@<token_id_hex>@<amount_hex>@<function_hex>@<arg1_hex>
            const tokenHex = Buffer.from(ONX_TOKEN_ID).toString("hex");
            const amountHex = amount.toString(16).length % 2 !== 0 ? '0' + amount.toString(16) : amount.toString(16);
            const functionHex = Buffer.from("vote").toString("hex");
            const argHex = Buffer.from(projectId).toString("hex");

            const dataContent = `ESDTTransfer@${tokenHex}@${amountHex}@${functionHex}@${argHex}`;

            const tx = new Transaction({
                nonce: BigInt(account.nonce),
                value: 0n,
                sender: new Address(senderAddress),
                receiver: new Address(CONTRACT_ADDRESS),
                gasLimit: 10000000n,
                chainID: "1", // Use "1" for mainnet
                data: new TextEncoder().encode(dataContent),
            });

            // Sign
            const signedTxs = await provider.signTransactions([tx]);

            // Send
            const sentTxs = await TransactionManager.getInstance().send(signedTxs);

            // Track
            const sessionId = await TransactionManager.getInstance().track(sentTxs, {
                transactionsDisplayInfo: {
                    processingMessage: "Processing vote...",
                    errorMessage: "An error occurred during vote",
                    successMessage: "Vote cast successfully!"
                }
            });

            if (sessionId) {
                console.log("Vote transaction sent, session:", sessionId);
            }

            await refreshAccount();
        } catch (error) {
            console.error("Voting failed:", error);
        } finally {
            setIsVoting(false);
        }
    };

    return {
        handleVote,
        isVoting,
        isLoggedIn
    };
}
