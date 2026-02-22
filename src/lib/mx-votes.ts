import { Buffer } from "buffer";

const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqlcw9xqc29veuf65ynl3uftkc3dysmtca899q6zsrc5";
const GATEWAY_URL = "https://gateway.multiversx.com";

const OOX_API_URL = "https://api.oox.art/contracts/marketplace/processed";

export async function getAllVotes(): Promise<Record<string, number>> {
    try {
        const response = await fetch(OOX_API_URL);

        if (!response.ok) {
            throw new Error(`OOX API returned status ${response.status}`);
        }

        const result = await response.json();
        const votesData = result?.votes || {};
        const votes: Record<string, number> = {};

        // votesData is a dictionary like { "COLLECTION:NONCE": COUNT }
        Object.entries(votesData).forEach(([key, count]: [string, any]) => {
            const parts = key.split(':');
            if (parts.length >= 2) {
                const collection = parts[0];
                const nonceDecimal = parseInt(parts[1]);
                const voteCount = Number(count);

                if (!isNaN(nonceDecimal) && !isNaN(voteCount)) {
                    let nonceHex = nonceDecimal.toString(16);
                    if (nonceHex.length % 2 !== 0) {
                        nonceHex = '0' + nonceHex;
                    }
                    const identifier = `${collection}-${nonceHex}`;
                    votes[identifier] = voteCount;
                }
            }
        });

        return votes;
    } catch (error) {
        console.error("Failed to fetch votes from OOX API:", error);
        return {};
    }
}

export async function getSingleNftVotes(collection: string, nonceHex: string): Promise<number | null> {
    try {
        const nonceDecimal = parseInt(nonceHex, 16);

        // Direct Query for real-time data
        const response = await fetch(`${GATEWAY_URL}/vm-values/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                scAddress: CONTRACT_ADDRESS,
                funcName: "getVotes",
                args: [
                    Buffer.from(collection).toString('hex'),
                    nonceDecimal.toString(16).length % 2 === 0 ? nonceDecimal.toString(16) : '0' + nonceDecimal.toString(16)
                ],
            }),
        });

        if (!response.ok) return null;

        const result = await response.json();

        // Return null if there's a gateway error with the contract interaction
        if (result?.error || result?.data?.returnCode !== 'ok') {
            return null;
        }

        const returnData = result?.data?.data?.returnData || [];

        if (returnData.length > 0) {
            if (returnData[0] === "") return 0; // Empty string means 0 votes

            const countHex = Buffer.from(returnData[0], 'base64').toString('hex');
            return countHex ? parseInt(countHex, 16) : 0;
        }

        return 0;
    } catch (error) {
        console.error("Failed to fetch direct votes:", error);
        return null;
    }
}

export async function getCollectionFloorPrice(collection: string): Promise<number> {
    try {
        const response = await fetch(`https://api.oox.art/collections/${collection}/nfts?size=1&sort=auctionPrice`);
        if (!response.ok) return 0;

        const result = await response.json();

        if (result && result.length > 0 && result[0].auctionInfo) {
            const currentPriceStr = result[0].auctionInfo.currentPrice;
            if (currentPriceStr) {
                // Convert from smallest denomination (18 decimals for EGLD)
                return Number(currentPriceStr) / 1e18;
            }
        }

        return 0;
    } catch (error) {
        console.error("Failed to fetch floor price from OOX API:", error);
        return 0;
    }
}
