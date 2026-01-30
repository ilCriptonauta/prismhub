"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />

            <motion.img
                src="/oox-logo.png"
                alt="OOX Logo"
                className="w-full h-full relative z-10 object-contain"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
        </div>
    );
}
