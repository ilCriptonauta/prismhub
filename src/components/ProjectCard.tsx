"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Zap, ShieldCheck, Hammer } from "lucide-react";
import { Card, CardBadge, CardDecoration } from "./modern-ui/card";
import { Button } from "./modern-ui/button";
import { Project } from "@/data/projects";
import { ProjectDetailModal } from "./ProjectDetailModal";

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.486h2.039L6.482 2.395h-2.19l13.315 18.244z" />
    </svg>
);

export function ProjectCard({ project, onOpenDetail }: { project: Project, onOpenDetail: () => void }) {
    const isArtist = project.category === "Independent Artists";

    return (
        <Card
            variant="interactive"
            className="p-0 border-border/50 hover:border-primary/30 group"
            childClassname="p-0 h-full flex flex-col"
        >
            <CardDecoration className="bg-primary/5 shadow-inner" />

            {/* Prism Refraction Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-accent/5 mix-blend-overlay" />
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
            </div>

            {/* Top Banner */}
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
                    {/* Verified and Daily Builder badges shown for all as requested */}
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
                    {project.ooxCollections && project.ooxCollections.length > 0 && (
                        <div className="grid grid-cols-1 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onOpenDetail}
                                className="w-full text-[10px] font-black h-9 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all group/oox rounded-xl"
                            >
                                <span className="mx-auto text-primary">LEARN MORE</span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
