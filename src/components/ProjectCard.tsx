"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Zap, ShieldCheck, Hammer } from "lucide-react";
import { Card, CardBadge, CardDecoration } from "./modern-ui/card";
import { Button } from "./modern-ui/button";
import { Project } from "@/data/projects";

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.486h2.039L6.482 2.395h-2.19l13.315 18.244z" />
    </svg>
);

const MotionCard = motion(Card);

export function ProjectCard({ project, onOpenDetail }: { project: Project, onOpenDetail: () => void }) {
    const isArtist = project.category === "Independent Artists";

    // Mouse position relative to the card for a subtle tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth movement settings - Increased damping for stability
    const mouseX = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 30 });

    // Subtle rotation values - Reduced intensity for better compatibility
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

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
                <div className="pt-4 mt-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onOpenDetail}
                        className="w-full text-[10px] font-black h-9 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all group/oox rounded-xl"
                    >
                        <span className="mx-auto text-primary uppercase">LEARN MORE</span>
                    </Button>
                </div>
            </div>
        </MotionCard>
    );
}
