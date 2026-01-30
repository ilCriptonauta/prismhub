"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Zap, Calendar } from "lucide-react";
import { Project } from "@/data/projects";
import { Button } from "./modern-ui/button";
import { CardBadge } from "./modern-ui/card";
import { ProjectDetailModal } from "./ProjectDetailModal";

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.486h2.039L6.482 2.395h-2.19l13.315 18.244z" />
    </svg>
);

export function FeaturedProject({ project, onOpenDetail }: { project: Project, onOpenDetail: () => void }) {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-[2px] rounded-[32px] transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.3)]"
            style={{
                background: project.colors
                    ? `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`
                    : 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))'
            }}
        >
            <div className="relative w-full rounded-[30px] overflow-hidden bg-surface group">
                {/* Background Banner Image with Overlay */}
                <div className="absolute inset-0 h-full w-full">
                    {project.bannerImage ? (
                        <img
                            src={project.bannerImage}
                            alt={project.name}
                            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-background" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
                </div>

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    {/* Project Thumbnail */}
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-background shadow-2xl flex-shrink-0 group-hover:rotate-2 transition-transform duration-500">
                        {project.image ? (
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-surface flex items-center justify-center">
                                <Zap className="w-16 h-16 text-primary animate-pulse" />
                            </div>
                        )}
                    </div>

                    {/* Project Info */}
                    <div className="flex-grow space-y-6 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <CardBadge variant="secondary" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                                Featured Highlight
                            </CardBadge>
                            <div className="flex items-center gap-1.5 text-text-secondary text-sm font-medium">
                                <Calendar className="w-4 h-4" />
                                <span>{project.featuredMonth || "Discovery of the Day"}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight">
                                {project.name}
                            </h2>
                            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-bold text-text-tertiary">
                                    #{tag.toUpperCase()}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                            <Button
                                size="lg"
                                className="rounded-xl px-10 shadow-lg shadow-primary/25"
                                onClick={onOpenDetail}
                            >
                                LEARN MORE <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>

                            {project.links.twitter && (
                                <Button variant="outline" size="lg" className="rounded-xl px-4" asChild>
                                    <a href={project.links.twitter} target="_blank" rel="noopener noreferrer">
                                        <XIcon className="w-6 h-6" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
