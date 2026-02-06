"use client";

import { motion } from "framer-motion";
import { Twitter, Send, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./modern-ui/button";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-surface/30 backdrop-blur-md py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Logo className="w-8 h-8" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            OOXHub
                        </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        The ultimate Creative Hub for MultiversX NFT projects and artists. Building authenticity day after day.
                    </p>
                </div>

                {/* Community Power */}
                <div className="space-y-3">
                    <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Community Power</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                        <li>
                            <Link href="/ranking" className="hover:text-primary transition-colors">
                                Leaderboard
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Marketplace */}
                <div className="space-y-3">
                    <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Marketplace</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                        <li>
                            <a href="https://oox.art" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                Open OOX
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div className="space-y-4">
                    {/* Definition for icon gradient */}
                    <svg width="0" height="0" className="absolute">
                        <defs>
                            <linearGradient id="footer-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--primary)" />
                                <stop offset="50%" stopColor="var(--secondary)" />
                                <stop offset="100%" stopColor="var(--accent)" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <h4 className="font-black text-sm uppercase tracking-[0.2em] text-left md:text-right bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                        Join the Community
                    </h4>
                    <div className="flex gap-3 justify-start md:justify-end">
                        <Button variant="outline" size="icon" className="rounded-xl border-border hover:border-primary/50 hover:bg-primary/5 transition-all" asChild>
                            <a href="https://x.com/onionxlabs" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="url(#footer-icon-gradient)">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
                                </svg>
                            </a>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all" asChild>
                            <a href="https://t.me/OnionXLabs" target="_blank" rel="noopener noreferrer">
                                <Send className="w-4 h-4" stroke="url(#footer-icon-gradient)" />
                            </a>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-border hover:border-accent/50 hover:bg-accent/5 transition-all" asChild>
                            <a href="https://discord.gg/WVSMrNzqNb" target="_blank" rel="noopener noreferrer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#footer-icon-gradient)">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </a>
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
