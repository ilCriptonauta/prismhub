"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, Hammer, Heart, Globe, Eye, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/modern-ui/button";
import { Card, CardDecoration } from "@/components/modern-ui/card";

export default function Manifesto() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10 animate-pulse delay-1000" />

                <div className="max-w-4xl mx-auto space-y-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 text-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-text-tertiary hover:text-primary transition-colors font-bold uppercase tracking-[0.2em] text-xs mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Hub
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-text-primary">
                            OOXHub <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                Manifesto
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
                            Shining a light on the builders, the artists, and the visionary projects of the MultiversX ecosystem.
                        </p>
                    </motion.div>

                    {/* Core Values / Concept */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <motion.div variants={itemVariants}>
                            <Card variant="default" className="p-8 h-full space-y-6 border-border/50 group hover:border-primary/30 transition-all">
                                <CardDecoration className="bg-primary/5" />
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <Eye className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary">Discovery</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    OOXHub is the first art repository dedicated to the MultiversX ecosystem. We provide a single, premium destination to discover the most innovative NFTS projects and artists.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card variant="default" className="p-8 h-full space-y-6 border-border/50 group hover:border-secondary/30 transition-all">
                                <CardDecoration className="bg-secondary/5" />
                                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-secondary" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary">Authenticity</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    In an ever-expanding digital world, visibility is key. We curate and verify projects to ensure that real value and genuine creativity get the attention they deserve.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card variant="default" className="p-8 h-full space-y-6 border-border/50 group hover:border-accent/30 transition-all">
                                <CardDecoration className="bg-accent/5" />
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                                    <Hammer className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary">The Hub for Builders</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    We celebrate the "Real Builders" — those who build day after day. OOXHub is more than a list; it's a testament to the continuous effort and innovation of our community.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card variant="default" className="p-8 h-full space-y-6 border-border/50 group hover:border-primary/30 transition-all">
                                <CardDecoration className="bg-primary/5" />
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary">MultiversX Vision</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Our mission is to strengthen the MultiversX vision by creating a bridge between artists and collectors, simplifying discovery through a refined and high-performance user interface.
                                </p>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Letter Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-8 md:p-16 bg-surface/30 backdrop-blur-md border border-border rounded-[40px] space-y-8"
                    >
                        <CardDecoration className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

                        <div className="space-y-6 max-w-2xl mx-auto text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black text-text-primary">
                                The OOXHub Philosophy
                            </h2>
                            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-medium">
                                <p>
                                    OOXHub is not just a tool; it's a lens through which we view the entire MultiversX creative spectrum. Just as a physical prism breaks light into its constituent colors, OOXHub takes the vast and complex world of NFTs and displays it in all its vibrant, organized glory.
                                </p>
                                <p>
                                    We believe that every pixel tells a story and every smart contract is a piece of architecture. Our goal is to ensure these stories are told and this architecture is seen.
                                </p>
                                <p>
                                    To ensure absolute fairness and maximum exposure for every creator, our repository algorithm is purely randomized. With every visit or page refresh, all projects and artists are reshuffled, giving everyone a fresh perspective and an equal opportunity to be showcased in our premium featured placements.
                                </p>
                                <p className="text-text-primary font-bold">
                                    Welcome to the Hub. Welcome to the future of digital discovery.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button
                                variant="default"
                                size="lg"
                                asChild
                                className="rounded-2xl px-12 py-6 font-bold shadow-2xl shadow-primary/40 text-lg transition-all hover:scale-105"
                            >
                                <Link href="/">
                                    Start Exploring
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* OOX Marketplace Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden bg-surface/20 rounded-[40px] border border-border p-8 md:p-12 hover:border-primary/20 transition-colors"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Image Left */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <img
                                    src="/oox-promo.png"
                                    alt="OOX Marketplace"
                                    className="relative w-full h-auto max-w-[400px] mx-auto drop-shadow-[0_0_30px_rgba(var(--primary),0.2)] group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Text Right */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Native Marketplace</h3>
                                    <h2 className="text-4xl md:text-5xl font-black text-text-primary leading-tight">
                                        OOX Marketplace
                                    </h2>
                                </div>
                                <p className="text-xl text-text-secondary leading-relaxed font-medium">
                                    The simplest and fastest marketplace on MultiversX.
                                    Discover, collect and trade your favorite NFTs with an
                                    unmatched user experience.
                                </p>
                                <div className="pt-4">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="lg"
                                        className="gradient-border rounded-2xl px-12 py-7 font-black shadow-lg shadow-primary/5 group/btn"
                                    >
                                        <a href="https://oox.art" target="_blank" rel="noopener noreferrer">
                                            Open OOX
                                            <ExternalLink className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
