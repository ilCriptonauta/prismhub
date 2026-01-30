"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send } from "lucide-react";
import { Button } from "./modern-ui/button";
import { useState } from "react";

export function SubmissionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(2);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h3 className="text-xl font-bold text-text-primary">Join the OOXHub</h3>
                            <button onClick={onClose} className="p-2 hover:bg-surface-hover rounded-full transition-colors">
                                <X className="w-5 h-5 text-text-secondary" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {step === 1 ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4 text-center mb-8">
                                        <p className="text-text-secondary">
                                            Apply to have your NFT project featured on OOXHub. We select active, high-quality collections building on MultiversX.
                                        </p>
                                    </div>

                                    <div className="space-y-4 text-left">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-primary">Project Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. OOXArt Collective"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all placeholder:text-text-tertiary"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-primary">Collection Ticker (OOX ID)</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. OOX-888888"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all placeholder:text-text-tertiary"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-primary">Project Description</label>
                                            <textarea
                                                required
                                                rows={3}
                                                placeholder="Tell us about what you are building day after day..."
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all placeholder:text-text-tertiary resize-none"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full rounded-xl py-6 font-bold text-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            "Sending Application..."
                                        ) : (
                                            <>Send Submission <Send className="ml-2 w-5 h-5" /></>
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center space-y-6 py-8">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-10 h-10 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-bold text-text-primary">Application Received!</h4>
                                        <p className="text-text-secondary">
                                            Thank you for submitting your project. Our team will review it and get in touch if it's a fit for OOXHub.
                                        </p>
                                    </div>
                                    <Button variant="outline" className="rounded-xl w-full" onClick={onClose}>
                                        Close Modal
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
