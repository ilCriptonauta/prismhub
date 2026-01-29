"use client";

import { Search, SlidersHorizontal, ShieldCheck, Hammer } from "lucide-react";
import { Button } from "./modern-ui/button";
import { CATEGORIES } from "@/data/projects";

interface SearchAndFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

export function SearchAndFilters({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
}: SearchAndFiltersProps) {
    return (
        <div className="w-full space-y-12">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl group-focus-within:opacity-100 opacity-50 transition-all rounded-full" />
                <div className="relative flex items-center">
                    <Search className="absolute left-6 w-6 h-6 text-text-tertiary group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search project or artists"
                        className="w-full pl-16 pr-6 py-5 bg-surface/50 border border-border backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-text-primary text-lg placeholder:text-text-tertiary shadow-lg"
                    />
                </div>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-tertiary">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filter by Vision</span>
                </div>

                <div className="flex flex-wrap justify-center gap-3 p-2 bg-surface/30 backdrop-blur-md border border-border rounded-2xl">
                    <Button
                        variant={selectedCategory === null ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className={`rounded-xl px-6 py-2 font-bold transition-all ${selectedCategory === null
                            ? "shadow-lg shadow-primary/25 text-white"
                            : "hover:bg-surface-hover text-text-secondary hover:text-text-primary"
                            }`}
                    >
                        All
                    </Button>
                    {CATEGORIES.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-xl px-6 py-2 font-bold transition-all ${selectedCategory === category
                                ? "shadow-lg shadow-primary/25 text-white"
                                : "hover:bg-surface-hover text-text-secondary hover:text-text-primary"
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Legend Section */}
                <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2 group">
                        <div className="p-1 bg-surface/50 rounded-lg border border-border group-hover:border-secondary/30 transition-colors">
                            <ShieldCheck className="w-4 h-4 text-secondary" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary group-hover:text-text-secondary transition-colors">Verified</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <div className="p-1 bg-surface/50 rounded-lg border border-border group-hover:border-accent/30 transition-colors">
                            <Hammer className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary group-hover:text-text-secondary transition-colors">Real Builders</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
