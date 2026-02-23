"use client";

import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { XpIcon } from "@/components/icons/XpIcon";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface BaseCardProps {
    id?: string;
    title?: string;
    nftNumber?: string;
    description?: string;
    image?: string;
    fallbackImage?: string;
    banner?: string;
    votes?: number;
    traits?: Array<{ trait_type: string; value: string }>;
    onArtClick?: () => void;
    isExporting?: boolean;
    exportCb?: string;
    floorPrice?: number;
}

export function BaseCard({
    id = "card-to-export",
    title = "OOX CREATIVE",
    nftNumber = "#0001",
    description = "A new evolution of digital art on MultiversX network.",
    image,
    fallbackImage,
    banner,
    votes = 0,
    traits = [],
    onArtClick,
    isExporting = false,
    exportCb,
    floorPrice
}: BaseCardProps) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // XP Calculation: 1 vote = 10 XP
    const xp = votes * 10;

    // Level Calculation: 1 level every 250 XP
    const level = Math.floor(xp / 250);

    // Progress to next level (0-100)
    const progressToNextLevel = ((xp % 250) / 250) * 100;

    // Rarity and Color logic based on Levels
    const getRarityInfo = (lvl: number) => {
        if (lvl >= 10) return { name: "LEGENDARY", color: "from-orange-500 to-yellow-500", glow: "shadow-orange-500/50" };
        if (lvl >= 5) return { name: "EPIC", color: "from-purple-500 to-pink-500", glow: "shadow-purple-500/50" };
        if (lvl >= 2) return { name: "RARE", color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/50" };
        return { name: "COMMON", color: "from-primary via-secondary to-accent", glow: "shadow-primary/30" };
    };

    const rarity = getRarityInfo(level);

    const [imgLoading, setImgLoading] = React.useState(true);
    const [imgError, setImgError] = React.useState(false);
    const [currentImage, setCurrentImage] = React.useState(image);

    // Normalize traits data
    const parsedTraits = React.useMemo(() => {
        if (!traits) return [];
        if (Array.isArray(traits)) return traits;
        if (typeof traits === 'string') {
            try {
                return JSON.parse(traits);
            } catch (e) {
                return [];
            }
        }
        return [];
    }, [traits]);

    // Reset and sync image state
    React.useEffect(() => {
        setImgError(false);

        let finalImage = image;
        if (isExporting && image && image.startsWith('http') && !image.startsWith('data:')) {
            finalImage = `/api/proxy-image?url=${encodeURIComponent(image)}${exportCb ? `&cb=${exportCb}` : ''}`;
        }

        if (!isExporting) {
            setImgLoading(true);
        }

        setCurrentImage(finalImage);
    }, [image, isExporting, exportCb]);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full aspect-[1/1.75] bg-surface rounded-[40px] animate-pulse" />;

    // Logic: If site is DARK, card is LIGHT. If site is LIGHT, card is DARK.
    const isDarkMode = resolvedTheme === 'dark';
    const cardBg = isDarkMode ? 'bg-white' : 'bg-[#0F172A]'; // Solid light (not transparent) or solid deep dark
    const textPrimary = isDarkMode ? 'text-slate-900' : 'text-white';
    const textSecondary = isDarkMode ? 'text-slate-600' : 'text-slate-300';
    const textTertiary = isDarkMode ? 'text-slate-400' : 'text-slate-500';
    const borderColor = isDarkMode ? 'border-slate-200' : 'border-white/10';
    const separatorColor = isDarkMode ? 'via-slate-200' : 'via-white/20';

    return (
        <motion.div
            id={id}
            initial="initial"
            whileHover="hover"
            className={`relative w-full aspect-[1/1.75] ${cardBg} border-2 ${borderColor} rounded-[40px] overflow-hidden shadow-2xl flex flex-col group ${isExporting ? '' : 'transition-all duration-700'} ${rarity.glow}`}
            style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
            }}
        >
            {/* Holographic Flash Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-50 overflow-hidden">
                <motion.div
                    variants={{
                        hover: { x: ["-100%", "200%"] }
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "easeInOut",
                            repeatDelay: 0.5
                        }
                    }}
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20"
                />
            </div>

            {/* Content Wrapper */}
            <div className="flex flex-col h-full">

                {/* Header: Name & ID */}
                <div className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0">
                    <div className="space-y-1">
                        <h3 className={`text-2xl font-black ${textPrimary} tracking-tighter uppercase leading-none break-all max-w-[220px]`}>
                            {title}
                        </h3>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black tracking-widest ${textTertiary} uppercase`}>LEVEL</span>
                            <span className={`text-2xl font-black ${textPrimary}`}>{level}</span>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="px-8 mb-4 shrink-0">
                    <div className={`h-[1px] w-full bg-gradient-to-r from-transparent ${separatorColor} to-transparent`} />
                </div>

                {/* Main Art Area */}
                <div className="px-8 shrink-0">
                    <div
                        onClick={onArtClick}
                        className={`relative w-full aspect-square z-30 transition-all duration-500 mb-6 ${onArtClick ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-br from-white/10 to-transparent rounded-[32px] blur-sm" />
                        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-100' : 'bg-slate-900'} border-4 ${isDarkMode ? 'border-white' : 'border-slate-800'} rounded-[32px] overflow-hidden shadow-2xl relative flex items-center justify-center ${isExporting ? '' : 'transition-all'} ${onArtClick ? 'hover:border-primary/50' : ''}`}>
                            {currentImage && !imgError ? (
                                <>
                                    {imgLoading && !isExporting && (
                                        <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-slate-200' : 'bg-slate-800'} z-10`}>
                                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                    <img
                                        src={currentImage}
                                        alt="nft"
                                        className={`w-full h-full object-cover ${isExporting ? 'opacity-100' : `transition-opacity duration-500 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}`}
                                        crossOrigin={isExporting && currentImage?.startsWith('http') ? "anonymous" : undefined}
                                        onLoad={() => setImgLoading(false)}
                                        onError={() => {
                                            if (fallbackImage && currentImage !== fallbackImage) {
                                                setCurrentImage(fallbackImage);
                                                setImgLoading(true);
                                            } else {
                                                setImgError(true);
                                                setImgLoading(false);
                                            }
                                        }}
                                    />
                                </>
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-200' : 'bg-slate-800'} border-2 border-dashed ${isDarkMode ? 'border-slate-300' : 'border-slate-700'} rounded-[28px]`}>
                                    <XpIcon className={`w-12 h-12 text-primary ${onArtClick ? 'animate-bounce' : 'opacity-30 animate-pulse'}`} />
                                </div>
                            )}
                        </div>

                        {/* XP Badge */}
                        <div className={`absolute -bottom-3 -right-2 px-4 py-2 rounded-2xl shadow-xl z-40 flex items-center gap-2 border border-white/20 bg-gradient-to-br ${rarity.color}`}>
                            <div className="w-4 h-4 text-white"><Sparkles className="w-full h-full" /></div>
                            <span className="text-[11px] font-black text-white italic tracking-tighter">{xp} XP</span>
                        </div>
                    </div>
                </div>

                {/* Traits Section */}
                <div className="flex-grow px-8 flex flex-col overflow-hidden min-h-0">
                    <div className={`w-full py-2 flex justify-between items-center text-[10px] font-black tracking-widest ${textTertiary} uppercase mb-4 border-y ${isDarkMode ? 'border-slate-100' : 'border-white/5'} shrink-0`}>
                        <span className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${rarity.color}`} />
                            CARD INFO
                        </span>
                        <span>
                            {(() => {
                                const rankTrait = parsedTraits?.find((t: any) => t.trait_type?.toLowerCase() === 'rarity' || t.trait_type?.toLowerCase() === 'rank' || t.trait?.toLowerCase() === 'rarity');
                                return rankTrait ? `${rankTrait.value} RARITY` : `${rarity.name} TIER`;
                            })()}
                        </span>
                    </div>

                    <div className="flex-grow overflow-y-auto custom-scrollbar pr-1">
                        {parsedTraits && parsedTraits.length > 0 ? (
                            <div className="flex flex-wrap gap-2 pb-4">
                                {parsedTraits.map((trait: any, i: number) => {
                                    const type = trait.trait_type || trait.trait || "Attribute";
                                    const val = trait.value || "Unknown";
                                    return (
                                        <div
                                            key={i}
                                            className={`flex flex-col px-3 py-1.5 min-w-[100px] flex-1 ${isDarkMode ? 'bg-slate-50' : 'bg-white/5'} border ${borderColor} rounded-xl transition-colors hover:border-primary/30`}
                                        >
                                            <span className={`text-[7px] font-black uppercase ${textTertiary} leading-none mb-1 tracking-wider`}>
                                                {type}
                                            </span>
                                            <span className={`text-[10px] font-bold ${textPrimary} uppercase truncate`}>
                                                {val}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className={`h-10 w-24 ${isDarkMode ? 'bg-slate-100' : 'bg-white/5'} rounded-xl animate-pulse`} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-8 pb-8 pt-2 flex flex-col gap-4 shrink-0 mt-auto">
                    <div className={`h-1.5 w-full ${isDarkMode ? 'bg-slate-100' : 'bg-slate-900'} border ${borderColor} rounded-full overflow-hidden`}>
                        <div
                            className={`h-full bg-gradient-to-r ${rarity.color} shadow-[0_0_10px_-1px] shadow-primary/50 transition-all duration-1000`}
                            style={{ width: `${progressToNextLevel}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br ${rarity.color} shadow-lg shadow-primary/20`}>
                                <XpIcon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-[11px] font-black tracking-[0.2em] ${textPrimary} uppercase leading-none`}>OOX HUB</span>
                                <span className={`text-[7px] font-bold ${textTertiary} tracking-[0.1em] uppercase`}>Genesis Protocol</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`text-[8px] font-black ${textTertiary} uppercase tracking-[0.15em] flex items-center gap-1.5 justify-end mb-0.5`}>
                                <div className="w-3.5 h-3.5 text-primary"><ShieldCheck className="w-full h-full" /></div>
                                <span className={textSecondary}>
                                    {floorPrice && floorPrice > 0 ? `FLOOR: ${floorPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} EGLD` : 'SECURED'}
                                </span>
                            </div>
                            <div className={`text-[6px] font-bold ${textTertiary} opacity-40 uppercase tracking-[0.2em]`}>© 2026 MULTIVERSX NETWORK</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
