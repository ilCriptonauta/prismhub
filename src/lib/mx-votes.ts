import { Buffer } from "buffer";

const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqlcw9xqc29veuf65ynl3uftkc3dysmtca899q6zsrc5";
const GATEWAY_URL = "https://gateway.multiversx.com";

const OOX_API_URL = "https://api.oox.art/contracts/marketplace/processed";

export interface VotesResult {
    nfts: Record<string, number>;
    collections: Record<string, number>;
    projects: Record<string, number>;
}

export async function getAllVotes(): Promise<VotesResult> {
    const nfts: Record<string, number> = {};
    const collections: Record<string, number> = {};
    const projects: Record<string, number> = {};

    try {
        // 1. Fetch from OOX API (Marketplace / NFT votes)
        const ooxResponse = await fetch(OOX_API_URL);
        if (ooxResponse.ok) {
            const result = await ooxResponse.json();
            const votesData = result?.votes || {};

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
                        nfts[identifier] = voteCount;
                        collections[collection] = (collections[collection] || 0) + voteCount;
                    }
                }
            });
        }
    } catch (error) {
        console.error("Failed to fetch votes from OOX API:", error);
    }

    try {
        // 2. Fetch directly from the Hub Voting Contract (Project / Artist specific votes)
        const scResponse = await fetch(`${GATEWAY_URL}/vm-values/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                scAddress: CONTRACT_ADDRESS,
                funcName: "getAllNftVotes",
                args: [],
            }),
        });

        if (scResponse.ok) {
            const result = await scResponse.json();
            const returnData = result?.data?.data?.returnData || [];

            // data comes in pairs: [ID, Count]
            for (let i = 0; i < returnData.length; i += 2) {
                const id = Buffer.from(returnData[i], 'base64').toString();
                const countHex = Buffer.from(returnData[i + 1], 'base64').toString('hex');
                const count = countHex ? parseInt(countHex, 16) : 0;

                if (id && !isNaN(count)) {
                    projects[id] = count;
                }
            }
        }
    } catch (error) {
        console.error("Failed to fetch direct hub votes:", error);
    }

    return { nfts, collections, projects };
}

export async function getSingleNftVotes(collection: string, nonceHex: string): Promise<number | null> {
    try {
        const nonceDecimal = parseInt(nonceHex, 16);

        // Direct Query for real-time data
        // For NFTs, the key seems to be in the format COLLECTION:NONCE or COLLECTION-NONCE
        // But the Hub Contract likely expects the key as passed in 'vote'
        const identifier = `${collection}-${nonceHex}`;

        const response = await fetch(`${GATEWAY_URL}/vm-values/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                scAddress: CONTRACT_ADDRESS,
                funcName: "getVotes",
                args: [Buffer.from(identifier).toString('hex')],
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
