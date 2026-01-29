"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Moon, Sun } from "lucide-react";
import { Button } from "./modern-ui/button";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <Logo className="w-8 h-8" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            PRISM
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="rounded-full"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-warning" />
                            ) : (
                                <Moon className="w-5 h-5 text-primary" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
