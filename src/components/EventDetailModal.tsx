"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Vote, ArrowRight, Check, Sparkles, AlertCircle } from "lucide-react";
import { Event } from "@/data/events";
import { Button } from "./modern-ui/button";
import Link from "next/link";

interface EventDetailModalProps {
    event: Event | null;
    isOpen: boolean;
    onClose: () => void;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
    if (!event) return null;

    const isOnxVote = event.id === "1";
    const isBearHunt = event.id === "3";

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
                        className="relative w-full max-w-2xl bg-surface border border-border rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header Image/Pattern */}
                        <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 flex items-center justify-center overflow-hidden">
                            {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent scale-150" />
                                    </div>
                                    <div className="relative z-10 bg-white/5 backdrop-blur-sm p-6 rounded-[40px] border border-white/10 shadow-2xl">
                                        <Vote className="w-16 h-16 text-primary animate-pulse" />
                                    </div>
                                </>
                            )}

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-background/50 hover:bg-background/80 backdrop-blur-md rounded-full text-text-primary transition-colors z-50 group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="p-8 md:p-10 space-y-8 overflow-y-auto">
                            {/* Event Main Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                        {event.status}
                                    </div>
                                    <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {event.date}
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tight leading-none">
                                    {event.title}
                                </h2>
                                <p className="text-xl text-text-secondary font-medium leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            {/* Participation Instructions */}
                            <div className="space-y-6 pt-6 border-t border-border/50">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-accent" />
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">How to Participate</h3>
                                </div>

                                <div className="grid gap-4">
                                    {isOnxVote ? (
                                        <>
                                            <InstructionStep
                                                number="01"
                                                title="Connect Wallet"
                                                description="Ensure your MultiversX wallet is connected to OOX Hub."
                                            />
                                            <InstructionStep
                                                number="02"
                                                title="Browse Ranking"
                                                description="Explore the projects and artists currently competing in the leaderboard."
                                            />
                                            <InstructionStep
                                                number="03"
                                                title="Cast Your Vote"
                                                description="Submit your vote using 200 $ONX tokens. Each vote increases the project's score."
                                            />
                                            <InstructionStep
                                                number="04"
                                                title="Share & Support"
                                                description="Each month, top-ranked entities receive exclusive rewards to share with their communities."
                                            />
                                        </>
                                    ) : isBearHunt ? (
                                        <>
                                            <InstructionStep
                                                number="01"
                                                title="Visit OOX Marketplace"
                                                description="Head over to oox.art and connect your MultiversX wallet."
                                            />
                                            <InstructionStep
                                                number="02"
                                                title="List your NFT"
                                                description="List any NFT from your collection for sale on the marketplace."
                                            />
                                            <InstructionStep
                                                number="03"
                                                title="Select $RARE Token"
                                                description="Ensure the payment currency for your listing is set to $RARE token."
                                            />
                                            <InstructionStep
                                                number="04"
                                                title="Wait for the Raffle"
                                                description="Every listing with $RARE counts as an entry. One lucky winner will get a SuperRareBear!"
                                            />
                                        </>
                                    ) : (
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-secondary border border-border/50">
                                            <AlertCircle className="w-5 h-5 text-primary mt-1" />
                                            <div>
                                                <h4 className="font-bold text-text-primary">Coming Soon</h4>
                                                <p className="text-sm text-text-secondary mt-1">Specific instructions for this event will be available shortly. Stay tuned!</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4">
                                {event.link ? (
                                    <Button
                                        className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group/btn"
                                        asChild
                                        onClick={onClose}
                                    >
                                        <Link href={event.link}>
                                            {isOnxVote ? "GO TO RANKING" : "EXPLORE EVENT"}
                                            <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-border/20"
                                        onClick={onClose}
                                    >
                                        DISMISS
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function InstructionStep({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="flex gap-4 p-5 rounded-2xl bg-surface-secondary border border-border/30 hover:border-primary/20 transition-colors group">
            <div className="text-2xl font-black text-primary/20 group-hover:text-primary/40 transition-colors tabular-nums">
                {number}
            </div>
            <div className="space-y-1">
                <h4 className="text-base font-bold text-text-primary uppercase tracking-tight">
                    {title}
                </h4>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
