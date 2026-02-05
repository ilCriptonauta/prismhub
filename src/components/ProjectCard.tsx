"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Zap, ShieldCheck, Hammer, Vote } from "lucide-react";
import { Card, CardBadge, CardDecoration } from "./modern-ui/card";
import { Button } from "./modern-ui/button";
import { Project } from "@/data/projects";

import Link from "next/link";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/out/react/account/useGetIsLoggedIn";
import { TransactionManager } from "@multiversx/sdk-dapp/out/managers/TransactionManager/TransactionManager";
import { getAccountProvider } from "@multiversx/sdk-dapp/out/providers/helpers/accountProvider";
import { getAccount } from "@multiversx/sdk-dapp/out/methods/account/getAccount";
import { getAddress } from "@multiversx/sdk-dapp/out/methods/account/getAddress";
import { TokenTransfer, Address, Transaction } from "@multiversx/sdk-core";
import { refreshAccount } from "@multiversx/sdk-dapp/out/utils/account/refreshAccount";
import { Buffer } from "buffer";


const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.486h2.039L6.482 2.395h-2.19l13.315 18.244z" />
    </svg>
);

const MotionCard = motion(Card);

export function ProjectCard({ project }: { project: Project }) {
    const isArtist = project.category === "Artists";
    const path = isArtist ? `/artist/${project.slug}` : `/project/${project.slug}`;

    // Mouse position relative to the card for a subtle tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth movement settings - Increased damping for stability
    const mouseX = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 30 });

    // Subtle rotation values - Reduced intensity for better compatibility
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    const isLoggedIn = useGetIsLoggedIn();
    const [isVoting, setIsVoting] = useState(false);
    const [showThanks, setShowThanks] = useState(false);

    const handleVote = async () => {
        if (!isLoggedIn) {
            alert("Please connect your wallet to vote.");
            return;
        }

        setIsVoting(true);
        try {
            const provider = getAccountProvider();
            const address = getAddress();
            const account = getAccount();

            const ONX_TOKEN_ID = "ONX-3e51c8";
            const VOTE_AMOUNT = "200";
            const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqlcw9xqc29veuf65ynl3uftkc3dysmtca899q6zsrc5";

            // Manual construction for simplicity in v5
            // ESDTTransfer@<token_id_hex>@<amount_hex>@<function_hex>@<arg1_hex>
            const tokenHex = Buffer.from(ONX_TOKEN_ID).toString("hex");
            const amountHex = (BigInt(VOTE_AMOUNT) * (10n ** 18n)).toString(16).padStart(16, '0');
            const functionHex = Buffer.from("vote").toString("hex");
            const argHex = Buffer.from(project.id).toString("hex");

            const payloadData = `ESDTTransfer@${tokenHex}@${amountHex}@${functionHex}@${argHex}`;

            const tx = new Transaction({
                nonce: BigInt(account.nonce),
                value: 0n,
                sender: new Address(account.address),
                receiver: new Address(CONTRACT_ADDRESS),
                gasLimit: 10000000n,
                chainID: "1",
                data: new TextEncoder().encode(payloadData),
            });

            // Sign
            const signedTxs = await provider.signTransactions([tx]);

            // Send
            const sentTxs = await TransactionManager.getInstance().send(signedTxs);

            // Track
            const sessionId = await TransactionManager.getInstance().track(sentTxs, {
                transactionsDisplayInfo: {
                    processingMessage: "Processing vote...",
                    errorMessage: "An error occurred during vote",
                    successMessage: "Vote cast successfully!"
                }
            });

            if (sessionId) {
                setShowThanks(true);
                setTimeout(() => setShowThanks(false), 5000);
            }

            await refreshAccount();
        } catch (error) {
            console.error("Voting failed:", error);
        } finally {
            setIsVoting(false);
        }
    };

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseXRelative = (event.clientX - rect.left) / rect.width;
        const mouseYRelative = (event.clientY - rect.top) / rect.height;

        x.set(mouseXRelative - 0.5);
        y.set(mouseYRelative - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <MotionCard
            variant="interactive"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover="hover"
            initial="initial"
            whileTap={{ scale: 0.98 }}
            variants={{
                initial: { scale: 1, y: 0 },
                hover: { scale: 1.02, y: -5 }
            }}
            style={{
                rotateX,
                rotateY,
                perspective: "1000px",
            }}
            className="p-0 border-border/50 hover:border-primary/30 group will-change-transform transition-colors duration-500"
            childClassname="p-0 h-full flex flex-col"
        >
            <CardDecoration className="bg-primary/5 shadow-inner" />

            {/* Prism Refraction Effect - Optimized */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10" />
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

            {/* Top Banner Container */}
            <div className="relative h-32 w-full overflow-hidden">
                {project.bannerImage ? (
                    <img
                        src={project.bannerImage}
                        alt={`${project.name} banner`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Type Badge Over Banner */}
                <div className="absolute top-3 right-3 z-30">
                    <CardBadge
                        variant={isArtist ? 'secondary' : 'default'}
                        className="backdrop-blur-md bg-background/80 shadow-lg px-3 py-1 font-bold tracking-wider"
                    >
                        {isArtist ? 'Artist' : 'Project'}
                    </CardBadge>
                </div>
            </div>

            {/* Avatar Container (Overlapping Banner) */}
            <div className="relative px-6 -mt-10 mb-2 z-30 flex items-end justify-between">
                <div className="w-20 h-20 bg-background border-4 border-background rounded-2xl overflow-hidden shadow-xl group-hover:shadow-primary/20 transition-all duration-500">
                    {project.image ? (
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface">
                            <Zap className="w-8 h-8 text-primary" />
                        </div>
                    )}
                </div>

                {/* Activity Badges */}
                <div className="flex gap-1.5 mb-2">
                    <div title="Verified Creative" className="p-1.5 bg-background shadow-md border border-border rounded-lg group-hover:border-secondary/30 transition-colors">
                        <ShieldCheck className="w-4 h-4 text-secondary" />
                    </div>
                    <div title="Daily Builder" className="p-1.5 bg-background shadow-md border border-border rounded-lg group-hover:border-accent/30 transition-colors">
                        <Hammer className="w-4 h-4 text-accent" />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-6 pb-6 space-y-4 flex-grow flex flex-col">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                        {project.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                        {project.description}
                    </p>
                </div>

                {/* Footer: Learn More Button */}
                <div className="pt-4 mt-auto flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-grow text-[10px] font-black h-9 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all group/oox rounded-xl"
                    >
                        <Link href={path}>
                            <span className="mx-auto text-primary uppercase">LEARN MORE</span>
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className={`h-9 w-9 border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary rounded-xl shrink-0 transition-all ${showThanks ? "bg-primary/20 scale-110" : ""}`}
                        title="Vote with $ONX"
                        onClick={handleVote}
                        loading={isVoting}
                    >
                        {showThanks ? (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center justify-center"
                            >
                                <Zap className="w-4 h-4 fill-primary" />
                            </motion.div>
                        ) : (
                            <Vote className="w-4 h-4" />
                        )}
                    </Button>
                </div>
                {showThanks && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-primary font-bold text-center animate-pulse"
                    >
                        GRAZIE PER IL TUO VOTO! 🧅
                    </motion.p>
                )}
            </div>
        </MotionCard>
    );
}
