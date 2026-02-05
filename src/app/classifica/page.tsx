"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { PROJECTS_DATA } from "@/data/projects";
import { Card, CardDecoration } from "@/components/modern-ui/card";
import { Button } from "@/components/modern-ui/button";
import { Trophy, Medal, Crown, Wallet, Calendar, ArrowRight, Zap } from "lucide-react";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/out/react/account/useGetIsLoggedIn";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/out/react/account/useGetAccountInfo";
import { UnlockPanelManager } from "@multiversx/sdk-dapp/out/managers/UnlockPanelManager/UnlockPanelManager";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { Search, Filter, CheckCircle2 } from "lucide-react";

export default function ClassificaByVotes() {
    const isLoggedIn = useGetIsLoggedIn();
    const { address, account } = useGetAccountInfo();
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [votedProjects, setVotedProjects] = useState<string[]>([]);
    const [isVoting, setIsVoting] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        // Load voted projects from local storage in a real app
        const saved = localStorage.getItem('voted_projects');
        if (saved) setVotedProjects(JSON.parse(saved));
    }, []);

    const handleLogin = () => {
        const unlockPanelManager = UnlockPanelManager.init({
            loginHandler: async () => {
                console.log("Login successful!");
            },
            onClose: async () => {
                console.log("Panel closed");
            }
        });

        unlockPanelManager.openUnlockPanel();
    };

    const handleVote = async (projectId: string) => {
        if (!isLoggedIn) {
            handleLogin();
            return;
        }

        if (votedProjects.includes(projectId)) return;

        setIsVoting(projectId);

        // Simulate blockchain transaction delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newVoted = [...votedProjects, projectId];
        setVotedProjects(newVoted);
        localStorage.setItem('voted_projects', JSON.stringify(newVoted));
        setIsVoting(null);
    };

    const filteredProjects = useMemo(() => {
        return PROJECTS_DATA.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery]);

    // Mock sorting logic
    const topProjects = [...PROJECTS_DATA]
        .filter(p => p.image) // Only those with images for the podium
        .slice(0, 3);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const getVotes = (index: number) => {
        const base = [1250, 1100, 950];
        return base[index] || 0;
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10 animate-pulse delay-1000" />

                <div className="max-w-6xl mx-auto space-y-20">

                    {/* Header */}
                    <div className="text-center space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tight text-text-primary"
                        >
                            Community <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                Leaderboard
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-text-secondary font-medium max-w-2xl mx-auto"
                        >
                            Celebrating the most supported projects in the ecosystem.
                        </motion.p>
                    </div>

                    {/* Top 3 Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end"
                    >
                        {/* 2nd Place */}
                        <motion.div variants={itemVariants} className="order-2 md:order-1 relative top-8">
                            <Card className="p-6 border-border/50 relative overflow-hidden bg-surface/40 hover:border-secondary/50 transition-all group">
                                <CardDecoration className="bg-secondary/10" />
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary flex items-center justify-center rounded-full text-white font-bold text-xl shadow-lg z-10 skew-x-[-10deg]">
                                    #2
                                </div>
                                <div className="space-y-4 pt-4 text-center">
                                    <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-xl ring-4 ring-secondary/20">
                                        <img src={topProjects[1].image} alt={topProjects[1].name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-text-primary truncate">{topProjects[1].name}</h3>
                                        <div className="flex items-center justify-center gap-2 mt-2 text-secondary font-bold">
                                            <Zap className="w-5 h-5 fill-current" />
                                            <span>{getVotes(1)} Votes</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant={votedProjects.includes(topProjects[1].id) ? "outline" : "secondary"}
                                        className="w-full rounded-xl"
                                        onClick={() => handleVote(topProjects[1].id)}
                                        loading={isVoting === topProjects[1].id}
                                        disabled={votedProjects.includes(topProjects[1].id)}
                                    >
                                        {votedProjects.includes(topProjects[1].id) ? (
                                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Voted</>
                                        ) : (
                                            "Vote"
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>

                        {/* 1st Place - Center & Larger */}
                        <motion.div variants={itemVariants} className="order-1 md:order-2 z-10">
                            <Card className="p-8 border-primary/50 relative overflow-hidden bg-surface/60 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all group transform hover:-translate-y-2">
                                <CardDecoration className="bg-primary/20" />
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center rounded-full text-white font-black text-3xl shadow-lg ring-4 ring-background z-20">
                                    <Crown className="w-8 h-8 fill-white/80" />
                                </div>
                                <div className="space-y-6 pt-8 text-center">
                                    <div className="w-32 h-32 mx-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-yellow-500/30">
                                        <img src={topProjects[0].image} alt={topProjects[0].name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-text-primary">{topProjects[0].name}</h3>
                                        <p className="text-text-secondary line-clamp-2 mt-2 text-sm">{topProjects[0].description}</p>
                                        <div className="flex items-center justify-center gap-2 mt-4 text-yellow-500 font-black text-xl bg-yellow-500/10 py-2 px-4 rounded-full w-fit mx-auto">
                                            <Trophy className="w-6 h-6 fill-current" />
                                            <span>{getVotes(0)} Votes</span>
                                        </div>
                                    </div>
                                    <Button
                                        size="lg"
                                        className="w-full rounded-2xl py-6 text-lg font-bold shadow-lg shadow-primary/20"
                                        onClick={() => handleVote(topProjects[0].id)}
                                        loading={isVoting === topProjects[0].id}
                                        disabled={votedProjects.includes(topProjects[0].id)}
                                    >
                                        {votedProjects.includes(topProjects[0].id) ? (
                                            <><CheckCircle2 className="w-6 h-6 mr-2" /> Vote Confirmed</>
                                        ) : (
                                            "Cast Your Vote"
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>

                        {/* 3rd Place */}
                        <motion.div variants={itemVariants} className="order-3 relative top-12">
                            <Card className="p-6 border-border/50 relative overflow-hidden bg-surface/40 hover:border-accent/50 transition-all group">
                                <CardDecoration className="bg-accent/10" />
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent flex items-center justify-center rounded-full text-white font-bold text-xl shadow-lg z-10 skew-x-[10deg]">
                                    #3
                                </div>
                                <div className="space-y-4 pt-4 text-center">
                                    <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-xl ring-4 ring-accent/20">
                                        <img src={topProjects[2].image} alt={topProjects[2].name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-text-primary truncate">{topProjects[2].name}</h3>
                                        <div className="flex items-center justify-center gap-2 mt-2 text-accent font-bold">
                                            <Medal className="w-5 h-5 fill-current" />
                                            <span>{getVotes(2)} Votes</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant={votedProjects.includes(topProjects[2].id) ? "outline" : "secondary"}
                                        className="w-full rounded-xl border-accent/20"
                                        onClick={() => handleVote(topProjects[2].id)}
                                        loading={isVoting === topProjects[2].id}
                                        disabled={votedProjects.includes(topProjects[2].id)}
                                    >
                                        {votedProjects.includes(topProjects[2].id) ? (
                                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Voted</>
                                        ) : (
                                            "Vote"
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Account Status Strip */}
                    {isLoggedIn && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-4xl mx-auto"
                        >
                            <Card className="flex flex-col md:flex-row items-center justify-between p-6 bg-primary/5 border-primary/20 backdrop-blur-sm gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {address?.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Connected Account</p>
                                        <p className="text-sm font-mono text-text-secondary">{address?.slice(0, 12)}...{address?.slice(-12)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-center md:text-right">
                                        <p className="text-xs font-bold text-text-secondary uppercase">Voting Power</p>
                                        <p className="text-xl font-black text-text-primary">100 VP</p>
                                    </div>
                                    <div className="text-center md:text-right">
                                        <p className="text-xs font-bold text-text-secondary uppercase">Votes Used</p>
                                        <p className="text-xl font-black text-text-primary">{votedProjects.length}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* All Projects / Search Section */}
                    <div className="space-y-10">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-2">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-text-primary">Discover & Support</h2>
                                <p className="text-text-secondary">Search for your favorite projects and artists to cast your vote.</p>
                            </div>
                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search projects, tags, artists..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-surface border border-border group-hover:border-primary/50 focus:border-primary rounded-2xl py-4 pl-12 pr-4 outline-hidden transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <Card key={project.id} className="p-5 hover:border-primary/30 transition-all flex flex-col gap-4 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-hover border border-border flex-shrink-0">
                                            {project.image ? (
                                                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                                    {project.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-text-primary truncate group-hover:text-primary transition-colors">{project.name}</h4>
                                            <p className="text-xs text-text-secondary line-clamp-1">{project.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-2">
                                        <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-tight text-text-secondary">
                                            {project.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-surface-hover rounded-md border border-border">{tag}</span>
                                            ))}
                                        </div>
                                        <Button
                                            size="sm"
                                            variant={votedProjects.includes(project.id) ? "outline" : "ghost"}
                                            className={votedProjects.includes(project.id) ? "text-success border-success/20 bg-success/5" : "text-primary hover:bg-primary/10"}
                                            onClick={() => handleVote(project.id)}
                                            loading={isVoting === project.id}
                                            disabled={votedProjects.includes(project.id)}
                                        >
                                            {votedProjects.includes(project.id) ? (
                                                <><CheckCircle2 className="w-4 h-4 mr-1" /> Voted</>
                                            ) : (
                                                "Vote"
                                            )}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="py-20 text-center space-y-4 bg-surface/20 rounded-3xl border border-dashed border-border px-4">
                                <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mx-auto">
                                    <Filter className="w-8 h-8 text-text-secondary" />
                                </div>
                                <h3 className="text-xl font-bold text-text-primary">No projects found for "{searchQuery}"</h3>
                                <p className="text-text-secondary">Try searching for different keywords or browse all categories.</p>
                                <Button variant="link" onClick={() => setSearchQuery("")}>Clear search</Button>
                            </div>
                        )}
                    </div>

                    {/* Events Section */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-primary" />
                                Upcoming Events
                            </h2>
                            <Button variant="ghost" asChild>
                                <Link href="#" className="flex items-center gap-2">
                                    View Calendar <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map((i) => (
                                <Card key={i} className="group p-6 hover:border-primary/50 transition-all cursor-pointer">
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-24 h-24 bg-surface-hover rounded-2xl flex flex-col items-center justify-center border border-border">
                                            <span className="text-primary font-black text-2xl">2{i}</span>
                                            <span className="text-text-secondary uppercase text-xs font-bold tracking-wider">FEB</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                Live Event
                                            </div>
                                            <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                                                OOXHub Community Call #{120 + i}
                                            </h3>
                                            <p className="text-text-secondary text-sm">
                                                Join us for updates, AMA sessions with featured artists, and exclusive giveaways.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
