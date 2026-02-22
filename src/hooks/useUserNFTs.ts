"use client";

import { useState, useEffect } from "react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/out/react/account/useGetAccountInfo";

export interface NFT {
    identifier: string;
    collection: string;
    nonce: number;
    timestamp: number;
    attributes: string;
    name: string;
    creator: string;
    type: string;
    balance: string;
    url: string;
    thumbnailUrl: string;
    gatewayUrl?: string;
    resolvedUrl?: string;
    metadata?: {
        attributes?: Array<{ trait_type: string; value: string }>;
        description?: string;
    };
}

const API_URL = "https://api.multiversx.com";

export function useUserNFTs() {
    const { address } = useGetAccountInfo();
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            if (!address) {
                setNfts([]);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                // Fetch first 100 NFTs for the account
                const response = await fetch(`${API_URL}/accounts/${address}/nfts?size=100`);
                if (!response.ok) throw new Error("Failed to fetch NFTs");
                const data = await response.json();

                // Process NFTs to ensure best image URL and CORS compatibility
                const processedData = data.map((nft: any) => {
                    let resolvedUrl = nft.url;

                    // If url is missing or an ipfs link, try to resolve it
                    if (!resolvedUrl || resolvedUrl.startsWith('ipfs://')) {
                        const cid = resolvedUrl?.replace('ipfs://', '');
                        if (cid) {
                            resolvedUrl = `https://ipfs.io/ipfs/${cid}`;
                        } else if (nft.media && nft.media.length > 0) {
                            // Find image type or use first
                            const imgMedia = nft.media.find((m: any) => m.fileType?.startsWith('image')) || nft.media[0];
                            resolvedUrl = imgMedia.url;
                        }
                    }

                    const workingUrl = resolvedUrl || nft.thumbnailUrl;

                    return {
                        ...nft,
                        // url is used for the grid - MUST be the working one
                        url: workingUrl,
                        // gatewayUrl is for potential high-res in the card
                        gatewayUrl: `https://media.multiversx.com/nfts/asset/${nft.identifier}`,
                        // resolvedUrl is the fallback
                        resolvedUrl: workingUrl
                    };
                });

                setNfts(processedData);
            } catch (err: any) {
                console.error("Error fetching NFTs:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNFTs();
    }, [address]);

    return { nfts, isLoading, error };
}
