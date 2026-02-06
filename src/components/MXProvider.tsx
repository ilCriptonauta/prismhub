"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { initApp } from "@multiversx/sdk-dapp/out/methods/initApp/initApp";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp/out/types/enums.types";



export function MXProvider({ children }: { children: React.ReactNode }) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            if (initialized) return;

            await initApp({
                dAppConfig: {
                    environment: EnvironmentsEnum.mainnet,
                    providers: {
                        walletConnect: {
                            walletConnectV2ProjectId: 'f233147e61bcb9a19191092579fc0b54 '
                        }
                    },
                    nativeAuth: true
                }
            });

            // Define web components if available
            try {
                const { defineCustomElements } = await import("@multiversx/sdk-dapp-ui") as any;
                if (defineCustomElements) {
                    defineCustomElements();
                }
            } catch (e) {
                console.error("Failed to define custom elements", e);
            }

            setInitialized(true);
        };

        if (typeof window !== "undefined") {
            initialize();
        }
    }, [initialized]);

    if (!initialized) {
        return <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>;
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
