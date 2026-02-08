"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trophy, Users, Award, Star, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Card, CardDecoration } from "@/components/modern-ui/card";
import { Footer } from "@/components/Footer";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { useEffect, useState, useMemo } from "react";
import { getAllVotes } from "@/lib/mx-votes";
import { STREAK_RANKING_DATA } from "@/data/streaks";

// Types for ranking
interface RankedProject extends Project {
    votes: number;
    rank: number;
}

export default function RankingPage() {
    const [votesData, setVotesData] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchVotes() {
            try {
                const votes = await getAllVotes();
                setVotesData(votes);
            } catch (error) {
                console.error("Error in ranking page:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchVotes();

        // Refresh every minute
        const interval = setInterval(fetchVotes, 60000);
        return () => clearInterval(interval);
    }, []);

    const topProjects = useMemo(() => {
        return PROJECTS_DATA
            .filter(p => p.category === "NFTS Project")
            .map(p => ({ ...p, votes: votesData[p.id] || 0 }))
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 3)
            .map((p, i) => ({ ...p, rank: i + 1 }));
    }, [votesData]);

    const topArtists = useMemo(() => {
        return PROJECTS_DATA
            .filter(p => p.category === "Artists")
            .map(p => ({ ...p, votes: votesData[p.id] || 0 }))
            .sort((a, b) => b.votes - a.votes)
            .slice(0, 3)
            .map((p, i) => ({ ...p, rank: i + 1 }));
    }, [votesData]);

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10 animate-pulse delay-1000" />

                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="space-y-6 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-text-tertiary hover:text-primary transition-colors font-bold uppercase tracking-[0.2em] text-xs mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Hub
                        </Link>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tight text-text-primary"
                        >
                            Community <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                Power
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto"
                        >
                            Your community, your strength. Discover the most voted projects and artists.
                        </motion.p>
                    </div>

                    {/* Ranking Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                        {/* Projects Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 px-2">
                                <Trophy className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">TOP 3 Project</h2>
                            </div>

                            <div className="space-y-6">
                                {topProjects.map((project, index) => (
                                    <RankingCard key={project.id} item={project} delay={index * 0.1} />
                                ))}
                            </div>
                        </div>

                        {/* Artists Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 px-2">
                                <Award className="w-6 h-6 text-secondary" />
                                <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">TOP 3 Artists</h2>
                            </div>

                            <div className="space-y-6">
                                {topArtists.map((artist, index) => (
                                    <RankingCard key={artist.id} item={artist} delay={index * 0.1 + 0.3} variant="secondary" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ONX Voting Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="max-w-6xl mx-auto pt-24"
                >
                    <Card className="p-8 md:p-16 border-border/50 bg-gradient-to-br from-surface/50 to-surface/30 backdrop-blur-xl relative overflow-hidden ring-1 ring-white/10 shadow-2xl">
                        <CardDecoration className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-30" />

                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 relative z-10">
                            {/* Logo Left */}
                            <div className="flex-shrink-0 relative">
                                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                                <motion.img
                                    src="/onx-token-logo.png"
                                    alt="ONX Token Logo"
                                    className="w-40 h-40 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                    animate={{ y: [0, -15, 0], rotate: [0, 2, 0, -2, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>

                            {/* Content Right */}
                            <div className="flex-grow space-y-8 text-center md:text-left">
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary uppercase tracking-tighter leading-none">
                                        Vote with <br />
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                            $ONX Token
                                        </span>
                                    </h2>
                                    <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto md:mx-0" />
                                </div>

                                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-medium">
                                    Every project and artist can be voted by everyone using <span className="text-primary font-bold">$ONX</span>.
                                    The top-ranked each month win exclusive rewards to share with their community of holders.
                                </p>

                                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                                    <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-3 backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                        <span className="text-sm font-black uppercase tracking-widest text-primary">Monthly Rewards</span>
                                    </div>
                                    <div className="px-6 py-3 rounded-2xl bg-secondary/5 border border-secondary/20 flex items-center gap-3 backdrop-blur-md">
                                        <Users className="w-5 h-5 text-secondary" />
                                        <span className="text-sm font-black uppercase tracking-widest text-secondary">Share with community</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* xPortal Streaks Ranking Section */}
                <div className="max-w-6xl mx-auto pt-32 space-y-16">
                    <div className="text-center space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tight"
                        >
                            xPortal <span className="text-primary">Social</span> Module
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-text-secondary font-medium"
                        >
                            Monthly top streak holders across the MultiversX ecosystem
                        </motion.p>
                    </div>

                    <div className="relative pt-12">
                        {/* Background glow for the top 3 */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] rounded-full -z-10" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
                            {/* Sort data to show 2, 1, 3 for the podio effect */}
                            {[
                                STREAK_RANKING_DATA.find(u => u.rank === 2),
                                STREAK_RANKING_DATA.find(u => u.rank === 1),
                                STREAK_RANKING_DATA.find(u => u.rank === 3)
                            ].map((user, index) => (
                                user && (
                                    <motion.div
                                        key={user.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * (index + 1) }}
                                        className={user.rank === 1 ? 'order-1 md:order-2' : user.rank === 2 ? 'order-2 md:order-1' : 'order-3'}
                                    >
                                        <StreakUserCard
                                            user={user}
                                            color={user.rank === 1 ? "yellow" : user.rank === 2 ? "slate" : "orange"}
                                            isMain={user.rank === 1}
                                        />
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

function StreakUserCard({ user, color, isMain = false }: { user: any, color: "yellow" | "slate" | "orange", isMain?: boolean }) {
    const colorClasses = {
        yellow: "from-yellow-400 to-amber-600 shadow-amber-500/20 ring-yellow-400/50",
        slate: "from-slate-300 to-slate-500 shadow-slate-500/20 ring-slate-400/50",
        orange: "from-orange-400 to-red-600 shadow-orange-500/20 ring-orange-400/50"
    };

    const gradientBorder = {
        yellow: "border-yellow-400/30",
        slate: "border-slate-400/30",
        orange: "border-orange-400/30"
    };

    return (
        <div className={`flex flex-col items-center gap-6 ${isMain ? 'mb-12' : 'mb-0'}`}>
            <div className="relative group">
                {/* Avatar Circle */}
                <div className={`
                    relative rounded-full p-1.5 transition-transform duration-500 group-hover:scale-105
                    bg-gradient-to-br ${colorClasses[color]} ring-4 ring-offset-4 ring-offset-background
                    ${isMain ? 'w-48 h-48 md:w-56 md:h-56' : 'w-36 h-36 md:w-40 md:h-40'}
                `}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-surface relative">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement?.classList.add('flex-center');
                                }}
                            />
                        ) : null}

                        {/* Fallback Rank Number (visible if no avatar or image fails) */}
                        {!user.avatar && (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-surface/50">
                                <span className={`font-black tracking-tighter text-text-tertiary/20 ${isMain ? 'text-8xl' : 'text-6xl'}`}>
                                    {user.rank}
                                </span>
                            </div>
                        )}

                        {/* Rank Circle Overlay */}
                        <div className={`
                            absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl text-white shadow-xl
                            bg-gradient-to-br ${colorClasses[color]}
                        `}>
                            {user.rank}
                        </div>
                    </div>
                </div>

                {/* Particle effects for rank 1 */}
                {isMain && (
                    <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full -z-10 animate-pulse" />
                )}
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
                    {user.username}
                </h3>
                <div className={`
                    inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-wider
                    bg-surface/50 border backdrop-blur-md ${gradientBorder[color]} text-text-secondary
                `}>
                    {user.streak.toLocaleString()} POINTS
                </div>
            </div>
        </div>
    );
}

function RankingCard({ item, delay, variant = "primary" }: { item: RankedProject, delay: number, variant?: "primary" | "secondary" }) {
    const isArtist = item.category === "Artists";
    const path = isArtist ? `/artist/${item.slug}` : `/project/${item.slug}`;

    return (
        <motion.div
            initial={{ opacity: 0, x: variant === "primary" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <Link href={path} className="block group">
                <Card className="p-6 border-border/50 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all relative overflow-hidden">
                    <CardDecoration className={variant === "primary" ? "bg-primary/5" : "bg-secondary/5"} />

                    <div className="flex items-center gap-6 relative z-10">
                        {/* Rank Badge */}
                        <div className={`
                            flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl
                            ${item.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-amber-500/20' :
                                item.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg shadow-slate-500/20' :
                                    'bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-lg shadow-amber-900/20'}
                        `}>
                            #{item.rank}
                        </div>

                        {/* Image & Info */}
                        <div className="flex-grow flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-border bg-surface flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-lg text-text-primary truncate group-hover:text-primary transition-colors">{item.name}</h3>
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{item.votes} Votes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
