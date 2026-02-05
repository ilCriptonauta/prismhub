"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Moon, Sun, Wallet, LogOut } from "lucide-react";
import { Button } from "./modern-ui/button";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/out/react/account/useGetIsLoggedIn";
import { UnlockPanelManager } from "@multiversx/sdk-dapp/out/managers/UnlockPanelManager/UnlockPanelManager";
import { getAccountProvider } from "@multiversx/sdk-dapp/out/providers/helpers/accountProvider";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isLoggedIn = useGetIsLoggedIn();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogin = () => {
        const unlockPanelManager = UnlockPanelManager.init({
            loginHandler: async () => {
                console.log("Logged in!");
            },
            onClose: async () => {
                console.log("Panel closed");
            }
        });
        unlockPanelManager.openUnlockPanel();
    };

    const handleLogout = async () => {
        try {
            const provider = getAccountProvider();
            if (provider) {
                await provider.logout();
                window.location.reload(); // Refresh to clear state
            }
        } catch (e) {
            console.error("Logout failed", e);
        }
    };

    if (!mounted) return null;

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <Logo className="w-8 h-8" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            OOXHub
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className="gradient-border p-0 h-10 w-10 flex items-center justify-center rounded-full transition-all shadow-sm hover:shadow-md"
                                title="Disconnect Wallet"
                            >
                                <LogOut className="w-5 h-5 text-primary" />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                onClick={handleLogin}
                                className="gradient-border p-0 h-10 w-10 flex items-center justify-center rounded-full transition-all shadow-sm hover:shadow-md"
                                title="Connect Wallet"
                            >
                                <Wallet className="w-5 h-5 text-primary" />
                            </Button>
                        )}

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
