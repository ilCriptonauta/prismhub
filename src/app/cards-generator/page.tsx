"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Sparkles, Wand2, Search, Wallet, Download, RefreshCw, X } from "lucide-react";
import { XpIcon } from "@/components/icons/XpIcon";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BaseCard } from "@/components/BaseCard";
import { Button } from "@/components/modern-ui/button";
import Link from "next/link";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/out/react/account/useGetIsLoggedIn";
import { useUserNFTs, NFT } from "@/hooks/useUserNFTs";
import { getAllVotes, getSingleNftVotes, getCollectionFloorPrice } from "@/lib/mx-votes";
import html2canvas from 'html2canvas';
import { UnlockPanelManager } from "@multiversx/sdk-dapp/out/managers/UnlockPanelManager/UnlockPanelManager";

export default function CardsGeneratorPage() {
    const isLoggedIn = useGetIsLoggedIn();
    const { nfts, isLoading: isLoadingNfts } = useUserNFTs();
    const [selectedNft, setSelectedNft] = useState<NFT | null>(null);
    const [allVotes, setAllVotes] = useState<Record<string, number>>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isSelectionOpen, setIsSelectionOpen] = useState(false);
    const [floorPrice, setFloorPrice] = useState<number>(0);
    const [exportCb, setExportCb] = useState<string | undefined>(undefined);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Initial fetch for all votes
    useEffect(() => {
        const fetchVotes = async () => {
            const result = await getAllVotes();
            const votes = result.nfts;
            setAllVotes(prev => {
                // Merge votes but keep any optimistically higher values
                // This prevents the score from "blinking" down to 0 if the API hasn't indexed a newly cast vote yet.
                const merged = { ...votes };
                Object.keys(prev).forEach(key => {
                    if (prev[key] > (merged[key] || 0)) {
                        merged[key] = prev[key];
                    }
                });
                return merged;
            });
        };
        fetchVotes();
        // Regular refresh for the whole map every minute
        const interval = setInterval(fetchVotes, 60000);
        return () => clearInterval(interval);
    }, []);

    // Real-time polling for selected NFT
    useEffect(() => {
        if (!selectedNft) return;

        const refreshSelectedVote = async () => {
            const collection = selectedNft.collection;
            const nonceHex = selectedNft.nonce.toString(16);
            const votes = await getSingleNftVotes(collection, nonceHex);

            if (votes !== null) {
                // Optimistically update the global votes map, preserving max value
                setAllVotes(prev => ({
                    ...prev,
                    [selectedNft.identifier]: Math.max(prev[selectedNft.identifier] || 0, votes)
                }));
            }

            // Also fetch the floor price for the collection
            const floor = await getCollectionFloorPrice(collection);
            setFloorPrice(floor);
        };

        // Initial refresh on select
        refreshSelectedVote();

        // Fast poll every 10 seconds while selected
        const interval = setInterval(refreshSelectedVote, 10000);
        return () => clearInterval(interval);
    }, [selectedNft]);

    const handleLogin = () => {
        const unlockPanelManager = UnlockPanelManager.init({
            loginHandler: async () => {
                console.log("Logged in!");
            }
        });
        unlockPanelManager.openUnlockPanel();
    };
    const handleDownload = useCallback(async () => {
        if (!cardRef.current || !selectedNft) return;
        setIsDownloading(true);

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const timestamp = new Date().getTime().toString();

        try {
            const fileName = `oox-card-${selectedNft?.name.replace(/\s+/g, '-').toLowerCase() || "creative"}.png`;

            // 1. Enter export mode and pre-fetch image as Base64
            setIsExporting(true);
            setExportCb(timestamp);

            if (selectedNft.url.startsWith('http')) {
                const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(selectedNft.url)}&cb=${timestamp}`;
                const response = await fetch(proxyUrl);
                if (!response.ok) throw new Error("Failed to fetch image via proxy");

                const blob = await response.blob();
                const b64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
                setBase64Image(b64);
            }

            // 2. Wait for React to render the Base64 image and UI state
            await new Promise(resolve => setTimeout(resolve, isIOS ? 1500 : 500));

            // 3. CAPTURE using html2canvas (Better iOS Support)
            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // Retina scale
                useCORS: true, // Allow external images
                allowTaint: true, // Allow tainted canvas if CORS fails, might let iOS save a local version
                backgroundColor: null, // Transparent background
                ignoreElements: (element) => {
                    const exclusionClasses = ['blur-3xl', 'animate-pulse', 'animate-spin'];
                    if (element.classList) {
                        return exclusionClasses.some(cls => element.classList.contains(cls));
                    }
                    return false;
                }
            });
            const dataUrl = canvas.toDataURL('image/png', 1.0);

            // 4. Handle the download with iOS specific persistence
            if (isIOS) {
                // On iOS, we provide the image in a blob for sharing or a new window
                // direct "link.click()" is often ignored by Chrome/Safari for dataUrls
                if (navigator.share) {
                    try {
                        // Fetch blob directly to ensure share sheet handles the file instead of a long data URL
                        const res = await fetch(dataUrl);
                        const blob = await res.blob();
                        const file = new File([blob], fileName, { type: 'image/png' });
                        await navigator.share({
                            files: [file],
                            title: 'OOX Hub Card',
                            text: 'My MultiversX NFT Card from OOX Hub'
                        });
                    } catch (shareErr) {
                        try {
                            const link = document.createElement("a");
                            link.download = fileName;
                            link.href = dataUrl;
                            link.click();
                        } catch (e) {
                            window.location.href = dataUrl;
                        }
                    }
                } else {
                    const link = document.createElement("a");
                    link.download = fileName;
                    link.href = dataUrl;
                    link.click();
                }
            } else {
                const link = document.createElement("a");
                link.download = fileName;
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err: any) {
            console.error("Failed to download card:", err);
            alert(`Export failed: ${err.message || 'Unknown error'}`);
        } finally {
            setIsDownloading(false);
            setIsExporting(false);
            setExportCb(undefined);
            setBase64Image(null);
        }
    }, [selectedNft, base64Image]);

    const filteredNfts = nfts.filter(nft =>
        nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.identifier.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -z-10 animate-pulse delay-1000" />

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-center mb-4"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-text-tertiary hover:text-primary transition-colors font-black uppercase tracking-[0.3em] text-xs group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Hub
                            </Link>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-text-primary tracking-tight uppercase"
                        >
                            Cards <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Generator</span>
                        </motion.h1>
                        <p className="text-text-secondary font-medium tracking-widest uppercase text-[10px] sm:text-xs">
                            Select an NFT and generate your high-res collectible card
                        </p>
                    </div>

                    <div className="min-h-[500px] flex flex-col items-center">
                        {!isLoggedIn ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 space-y-8"
                            >
                                <div className="w-32 h-32 bg-primary/10 rounded-[40px] flex items-center justify-center border border-primary/20 relative group">
                                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50" />
                                    <Wallet className="w-16 h-16 text-primary relative z-10" />
                                </div>
                                <div className="text-center space-y-4">
                                    <h3 className="text-3xl font-black text-text-primary uppercase">Unlock Your Wallet</h3>
                                    <p className="text-text-secondary text-lg max-w-md">Connect your wallet to see your NFTs and start generating cards.</p>
                                </div>
                                <Button
                                    variant="default"
                                    size="lg"
                                    onClick={handleLogin}
                                    className="rounded-2xl px-12 py-8 text-xl font-bold shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
                                >
                                    CONNECT WALLET
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="w-full flex flex-col items-center space-y-12">
                                {/* The Main Card */}
                                <motion.div
                                    className="w-full max-w-sm sm:max-w-md space-y-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="group relative" ref={cardRef}>
                                        <div className="absolute -inset-12 bg-primary/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        <div className="relative">
                                            <BaseCard
                                                title={selectedNft?.name || "SELECT YOUR NFT"}
                                                nftNumber={selectedNft ? `#${selectedNft.identifier.split('-').pop()}` : "#0000"}
                                                image={base64Image || selectedNft?.url}
                                                votes={selectedNft ? (allVotes[selectedNft.identifier] || 0) : 0}
                                                traits={(selectedNft?.metadata?.attributes || (selectedNft?.attributes as any)) || []}
                                                description={selectedNft?.metadata?.description}
                                                onArtClick={() => setIsSelectionOpen(true)}
                                                isExporting={isExporting}
                                                exportCb={exportCb}
                                                floorPrice={floorPrice}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-6 w-full">
                                        <Button
                                            variant="default"
                                            size="lg"
                                            disabled={isDownloading || !selectedNft}
                                            onClick={handleDownload}
                                            className="w-full rounded-2xl px-8 py-7 font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isDownloading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                                            {isDownloading ? "Capturing..." : "DOWNLOAD PNG"}
                                        </Button>
                                    </div>
                                    {!selectedNft && (
                                        <motion.p
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="text-primary font-black uppercase tracking-[0.2em] text-[10px]"
                                        >
                                            Click the lightning icon to begin
                                        </motion.p>
                                    )}
                                </motion.div>
                            </div>
                        )}

                        {/* Selection Proxy Info */}
                        <AnimatePresence>
                            {isSelectionOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                                >
                                    <div
                                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                                        onClick={() => setIsSelectionOpen(false)}
                                    />

                                    <motion.div
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                        className="relative w-full max-w-5xl bg-surface border border-border/50 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                                    >
                                        {/* Modal Header */}
                                        <div className="p-8 border-b border-border/30 flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/50">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">Select your NFT</h3>
                                                <p className="text-text-secondary text-sm">Choose the digital asset to transform into a high-res card</p>
                                            </div>
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="relative flex-grow md:w-80">
                                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="w-full bg-background border border-border rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => setIsSelectionOpen(false)}
                                                    className="p-3 hover:bg-white/5 rounded-full transition-colors font-bold"
                                                >
                                                    <X className="w-6 h-6 text-text-tertiary" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Modal Content - NFT Grid */}
                                        <div className="p-8 overflow-y-auto custom-scrollbar">
                                            {isLoadingNfts ? (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                                    {Array(10).fill(0).map((_, i) => (
                                                        <div key={i} className="aspect-square bg-background border border-border/50 rounded-3xl animate-pulse" />
                                                    ))}
                                                </div>
                                            ) : filteredNfts.length > 0 ? (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                                    {filteredNfts.map((nft) => (
                                                        <div
                                                            key={nft.identifier}
                                                            onClick={() => {
                                                                setSelectedNft(nft);
                                                                setIsSelectionOpen(false);
                                                            }}
                                                            className={`bg-background border rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] ${selectedNft?.identifier === nft.identifier ? 'border-primary ring-2 ring-primary/20' : 'border-border/50 hover:border-primary/40'}`}
                                                        >
                                                            <div className="aspect-square overflow-hidden relative">
                                                                <img
                                                                    src={nft.url}
                                                                    alt={nft.name}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">USE THIS</span>
                                                                </div>
                                                            </div>
                                                            <div className="p-4 space-y-2">
                                                                <div className="flex justify-between items-start">
                                                                    <p className="text-[10px] font-black text-text-tertiary uppercase truncate">{nft.collection}</p>
                                                                    {allVotes[nft.identifier] > 0 && (
                                                                        <span className="text-[10px] font-black text-primary italic">
                                                                            LVL {Math.floor((allVotes[nft.identifier] * 10) / 250)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm font-bold text-text-primary truncate">{nft.name}</p>
                                                                <div className="flex items-center gap-1.5 opacity-60">
                                                                    <XpIcon className="w-3 h-3 text-primary" />
                                                                    <span className="text-[10px] font-bold text-text-secondary">{(allVotes[nft.identifier] || 0) * 10} XP</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-20 space-y-4">
                                                    <Search className="w-12 h-12 text-text-tertiary mx-auto opacity-20" />
                                                    <p className="text-text-secondary text-lg">No NFTs found</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 border-t border-border/20">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <h4 className="text-xl font-bold text-text-primary">XP System</h4>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Your card level is tied to OOX Marketplace votes. More votes = more power and unique colors.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                                <Download className="w-6 h-6 text-secondary" />
                            </div>
                            <h4 className="text-xl font-bold text-text-primary">High Quality Export</h4>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Download your cards in 4K PNG format, perfect for sharing on social media or using in games.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
                                <RefreshCw className="w-6 h-6 text-accent" />
                            </div>
                            <h4 className="text-xl font-bold text-text-primary">Dynamic Rarity</h4>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Collectibles automatically update their rarity frames based on global community sentiment.
                            </p>
                        </div>
                    </div>

                    {/* How to increase XP Section */}
                    <div className="mt-16 p-8 md:p-12 rounded-[40px] border border-border/20 bg-surface/30 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
                            <div className="w-20 h-20 shrink-0 bg-primary/10 rounded-[28px] flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/5 group-hover:scale-105 transition-transform duration-500">
                                <XpIcon className="w-10 h-10 text-primary" />
                            </div>
                            <div className="space-y-4 flex-grow">
                                <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight uppercase">
                                    How to increase XP & Level
                                </h3>
                                <div className="space-y-3 text-text-secondary leading-relaxed text-sm md:text-base">
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span>Get <strong className="text-primary">10 XP</strong> for each vote on OOX using <strong className="text-text-primary">$ONX</strong>.</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        <span>Every <strong className="text-secondary">250 XP</strong> your card increases in level.</span>
                                    </p>
                                    <div className="pt-2 mt-2 border-t border-border/30">
                                        <p className="text-[10px] uppercase tracking-widest text-text-tertiary">
                                            Note: XP points are updated every 15 minutes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
