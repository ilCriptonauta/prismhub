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
const PAGE_SIZE = 100; // Max supported by the MultiversX API per call

function processNft(nft: any): NFT {
    let resolvedUrl = nft.url;

    // If url is missing or an ipfs link, try to resolve it
    if (!resolvedUrl || resolvedUrl.startsWith("ipfs://")) {
        const cid = resolvedUrl?.replace("ipfs://", "");
        if (cid) {
            resolvedUrl = `https://ipfs.io/ipfs/${cid}`;
        } else if (nft.media && nft.media.length > 0) {
            const imgMedia =
                nft.media.find((m: any) => m.fileType?.startsWith("image")) ||
                nft.media[0];
            resolvedUrl = imgMedia.url;
        }
    }

    const workingUrl = resolvedUrl || nft.thumbnailUrl;

    return {
        ...nft,
        url: workingUrl,
        gatewayUrl: `https://media.multiversx.com/nfts/asset/${nft.identifier}`,
        resolvedUrl: workingUrl,
    };
}

export function useUserNFTs() {
    const { address } = useGetAccountInfo();
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!address) {
            setNfts([]);
            setLoadedCount(0);
            setTotalCount(0);
            return;
        }

        let cancelled = false;

        const fetchAllNFTs = async () => {
            setIsLoading(true);
            setError(null);
            setNfts([]);
            setLoadedCount(0);

            try {
                // Step 1: get the total count so we can show progress
                const countRes = await fetch(
                    `${API_URL}/accounts/${address}/nfts/count`
                );
                if (!countRes.ok) throw new Error("Failed to fetch NFT count");
                const count: number = await countRes.json();

                if (cancelled) return;
                setTotalCount(count);

                if (count === 0) {
                    setIsLoading(false);
                    return;
                }

                // Step 2: fetch all pages in sequence
                let allNfts: NFT[] = [];
                let from = 0;

                while (from < count) {
                    if (cancelled) return;

                    const res = await fetch(
                        `${API_URL}/accounts/${address}/nfts?size=${PAGE_SIZE}&from=${from}`
                    );
                    if (!res.ok) throw new Error("Failed to fetch NFTs");
                    const page: any[] = await res.json();

                    if (page.length === 0) break; // safety guard

                    const processed = page.map(processNft);
                    allNfts = [...allNfts, ...processed];

                    if (!cancelled) {
                        // Progressively update the list so the UI can show NFTs as they load
                        setNfts([...allNfts]);
                        setLoadedCount(allNfts.length);
                    }

                    from += PAGE_SIZE;
                }
            } catch (err: any) {
                if (!cancelled) {
                    console.error("Error fetching NFTs:", err);
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchAllNFTs();

        return () => {
            cancelled = true;
        };
    }, [address]);

    return { nfts, isLoading, loadedCount, totalCount, error };
}
