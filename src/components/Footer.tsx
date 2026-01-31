"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./modern-ui/button";

export function Footer() {
    return (
        <footer className="border-t border-border bg-surface/30 backdrop-blur-md py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Logo className="w-8 h-8" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            OOXHub
                        </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        The ultimate Creative Hub for MultiversX NFT projects and independent artists. Building authenticity day after day.
                    </p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Explore</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li className="hover:text-primary transition-colors cursor-pointer">All Projects</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">DeFi</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">NFTs</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Support</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li className="hover:text-primary transition-colors cursor-pointer">Submit Project</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">API Docs</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Guidelines</li>
                        </ul>
                    </div>
                </div>

                {/* Social */}
                <div className="space-y-4">
                    <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider text-left md:text-right">Join the Community</h4>
                    <div className="flex gap-2 justify-start md:justify-end">
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <Twitter className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <Github className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <Mail className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-border/50 text-center">
                <p className="text-xs text-text-tertiary">
                    © 2026 <a href="https://x.com/onionxlabs" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">OnionXLabs</a>. Built with ❤️ for the MultiversX Community.
                </p>
            </div>
        </footer>
    );
}
