"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hub } from "@/components/Hub";
import { SubmissionModal } from "@/components/SubmissionModal";

export default function Home() {
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  return (
    <main>
      <Navbar />
      <Hub />
      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </main>
  );
}
