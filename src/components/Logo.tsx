"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />

            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-10"
            >
                {/* Prism Shape */}
                <motion.path
                    d="M50 15L85 75L50 85L15 75L50 15Z"
                    fill="currentColor"
                    className="text-primary"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Prism Facet/Refraction line */}
                <motion.path
                    d="M50 15V85"
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />

                <motion.path
                    d="M15 75L50 85L85 75"
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                />

                {/* Star Sparkles */}
                <motion.path
                    d="M85 25L87.5 30L92.5 27.5L90 32.5L95 35L90 37.5L92.5 42.5L87.5 40L85 45L82.5 40L77.5 42.5L80 37.5L75 35L80 32.5L77.5 27.5L82.5 30L85 25Z"
                    fill="currentColor"
                    className="text-secondary"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
                />

                <motion.circle
                    cx="20"
                    cy="25"
                    r="3"
                    fill="currentColor"
                    className="text-accent"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </svg>
        </div>
    );
}
