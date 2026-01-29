"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, Hammer, Zap, Globe } from "lucide-react";
import { Project } from "@/data/projects";
import { Button } from "./modern-ui/button";
import { CardBadge } from "./modern-ui/card";

interface ProjectDetailModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.486h2.039L6.482 2.395h-2.19l13.315 18.244z" />
    </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 127.14 96.36" fill="currentColor" className={className}>
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.48,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.24-16.14h0C130,51.87,125.47,27.05,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12.023 12.023 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.303.48-.429-.012-1.253-.245-1.865-.444-.754-.245-1.35-.375-1.297-.791.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
);

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
    if (!project) return null;

    const isArtist = project.category === "Indipendent Artists";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
                    >
                        {/* Banner Image */}
                        <div className="relative h-48 md:h-64 overflow-hidden">
                            {project.bannerImage ? (
                                <img
                                    src={project.bannerImage}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background/80 backdrop-blur-md rounded-full text-text-primary transition-colors z-50"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="relative px-8 pb-12">
                            {/* Overlapping Avatar */}
                            <div className="relative flex justify-between items-end -mt-16 mb-8 px-2">
                                <div className="w-32 h-32 bg-background border-4 border-background rounded-3xl overflow-hidden shadow-2xl">
                                    {project.image ? (
                                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-surface">
                                            <Zap className="w-12 h-12 text-primary" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <div title="Verified Creative" className="p-2 bg-background shadow-md border border-border rounded-xl">
                                        <ShieldCheck className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div title="Daily Builder" className="p-2 bg-background shadow-md border border-border rounded-xl">
                                        <Hammer className="w-6 h-6 text-accent" />
                                    </div>
                                </div>
                            </div>

                            {/* Title & Type */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-4xl font-black text-text-primary">
                                        {project.name}
                                    </h2>
                                    <CardBadge variant={isArtist ? "secondary" : "default"}>
                                        {isArtist ? "Artist" : "Project"}
                                    </CardBadge>
                                </div>

                                {/* Social Links */}
                                <div className="flex flex-wrap gap-4 pt-2">
                                    {project.links.twitter && (
                                        <a href={project.links.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-border rounded-xl text-text-secondary hover:text-primary hover:border-primary/50 transition-all shadow-sm">
                                            <XIcon className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.links.discord && (
                                        <a href={project.links.discord} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-border rounded-xl text-text-secondary hover:text-[#5865F2] hover:border-[#5865F2]/50 transition-all shadow-sm">
                                            <DiscordIcon className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.links.telegram && (
                                        <a href={project.links.telegram} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-border rounded-xl text-text-secondary hover:text-[#26A5E4] hover:border-[#26A5E4]/50 transition-all shadow-sm">
                                            <TelegramIcon className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.links.website && (
                                        <a href={project.links.website} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-border rounded-xl text-text-secondary hover:text-primary hover:border-primary/50 transition-all shadow-sm">
                                            <Globe className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="pt-6 space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-tertiary">About</h4>
                                    <p className="text-lg text-text-secondary leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Collections */}
                                {project.ooxCollections && project.ooxCollections.length > 0 && (
                                    <div className="pt-8 space-y-4">
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-tertiary">Marketplace Collections</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {project.ooxCollections.map((ticker) => (
                                                <Button
                                                    key={ticker}
                                                    variant="outline"
                                                    className="justify-between h-14 px-5 rounded-2xl border-primary/20 hover:border-primary group/oox"
                                                    asChild
                                                >
                                                    <a href={`https://oox.art/marketplace/collections/${ticker}`} target="_blank" rel="noopener noreferrer">
                                                        <span className="font-bold text-text-primary">OOX: {ticker}</span>
                                                        <ExternalLink className="w-4 h-4 text-primary group-hover/oox:translate-x-1 group-hover/oox:-translate-y-1 transition-transform" />
                                                    </a>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
