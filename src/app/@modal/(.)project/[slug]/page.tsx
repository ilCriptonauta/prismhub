"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { PROJECTS_DATA } from "@/data/projects";

export default function ProjectModal({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();

    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project) return null;

    return (
        <ProjectDetailModal
            project={project}
            isOpen={true}
            onClose={() => router.back()}
        />
    );
}
