import { Buffer } from "buffer";

const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqlcw9xqc29veuf65ynl3uftkc3dysmtca899q6zsrc5";
const GATEWAY_URL = "https://gateway.multiversx.com";

export async function getAllVotes(): Promise<Record<string, number>> {
    try {
        // Using direct fetch to the gateway for maximum compatibility and to avoid SDK version conflicts
        const response = await fetch(`${GATEWAY_URL}/vm-values/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                scAddress: CONTRACT_ADDRESS,
                funcName: "getAllNftVotes",
                args: [],
            }),
        });

        if (!response.ok) {
            throw new Error(`Gateway returned status ${response.status}`);
        }

        const result = await response.json();
        const returnData = result?.data?.data?.returnData || [];
        const votes: Record<string, number> = {};

        // getAllNftVotes returns variadic multiValue: [id, count, id, count, ...]
        // All values are base64 encoded
        for (let i = 0; i < returnData.length; i += 2) {
            const idB64 = returnData[i];
            const countB64 = returnData[i + 1];

            if (idB64 && countB64) {
                const id = Buffer.from(idB64, 'base64').toString();
                const countHex = Buffer.from(countB64, 'base64').toString('hex');
                // Ensure we handle potential leading zeros or empty buffers
                const count = countHex ? parseInt(countHex, 16) : 0;
                votes[id] = count;
            }
        }

        return votes;
    } catch (error) {
        console.error("Failed to fetch votes:", error);
        return {};
    }
}
