"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Hub } from "@/components/Hub";
import { Navbar } from "@/components/Navbar";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { PROJECTS_DATA } from "@/data/projects";

export default function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();

    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project) return <div>Artist not found</div>;

    return (
        <main>
            <Navbar />
            <Hub />
            <ProjectDetailModal
                project={project}
                isOpen={true}
                onClose={() => router.push("/")}
            />
        </main>
    );
}
