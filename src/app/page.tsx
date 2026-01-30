"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { ProjectCard } from "@/components/ProjectCard";
import { FeaturedProject } from "@/components/FeaturedProject";
import { SubmissionModal } from "@/components/SubmissionModal";
import { PROJECTS_DATA } from "@/data/projects";
import { Button } from "@/components/modern-ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { Footer } from "@/components/Footer";
import { Project } from "@/data/projects";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetailProject, setSelectedDetailProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [shuffledProjects, setShuffledProjects] = useState<typeof PROJECTS_DATA>([]);
  const [randomFeatured, setRandomFeatured] = useState<typeof PROJECTS_DATA[0] | null>(null);

  // Shuffle projects and pick featured only on mount
  useEffect(() => {
    const shuffle = (array: typeof PROJECTS_DATA) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const shuffled = shuffle(PROJECTS_DATA);
    setShuffledProjects(shuffled);

    // Pick the first one from the shuffled array as the featured project of this session
    setRandomFeatured(shuffled[0]);
  }, []);

  const featured = useMemo(() => randomFeatured, [randomFeatured]);

  const filteredProjects = useMemo(() => {
    // We use shuffledProjects if available, otherwise fallback to PROJECTS_DATA for initial load
    const baseData = shuffledProjects.length > 0 ? shuffledProjects : PROJECTS_DATA;

    return baseData.filter((project) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = (
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );

      const matchesCategory = selectedCategory === null || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, shuffledProjects]);

  return (
    <main className="min-h-screen pt-16 bg-background selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Optimized Background Decorations */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-text-primary leading-[0.9]">
              MultiversX <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                Creative Hub
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
              The first art repository to discover NFTS projects and artists on Multiversx.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 pt-6"
          >
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                const element = document.getElementById("explore-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-2xl px-16 py-8 font-bold shadow-2xl shadow-primary/40 text-xl transition-all hover:scale-105 active:scale-95"
            >
              Discover
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-2xl px-16 py-8 font-bold border-border hover:bg-surface text-xl transition-all hover:scale-105 active:scale-95"
            >
              <Link href="/manifesto">
                Manifesto
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured & Hub Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-32">
        {/* Monthly Highlight */}
        {featured && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 px-2">
              <div className="h-px flex-grow bg-gradient-to-r from-transparent via-border to-transparent" />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-text-tertiary">Current Spotlight</h3>
              <div className="h-px flex-grow bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
            <FeaturedProject
              project={featured}
              onOpenDetail={() => setSelectedDetailProject(featured)}
            />
          </div>
        )}

        <div id="explore-section" className="space-y-16 scroll-mt-28">
          <div className="will-change-transform">
            <SearchAndFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[500px]">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenDetail={() => setSelectedDetailProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-32 space-y-6 bg-surface/20 rounded-3xl border border-dashed border-border"
              >
                <div className="w-20 h-20 bg-surface/50 rounded-full flex items-center justify-center mx-auto border border-border">
                  <Search className="w-10 h-10 text-text-tertiary" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-text-primary">No collections found</p>
                  <p className="text-text-secondary">Try searching with a different term or selecting a different category</p>
                </div>
                <Button size="lg" variant="outline" className="rounded-xl" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
                  Clear search
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Decorative Spacer */}
      <div className="h-20" />
      <Footer />

      {/* Modals */}
      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ProjectDetailModal
        project={selectedDetailProject}
        isOpen={!!selectedDetailProject}
        onClose={() => setSelectedDetailProject(null)}
      />
    </main>
  );
}
