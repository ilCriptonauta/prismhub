"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { initApp } from "@multiversx/sdk-dapp/out/methods/initApp/initApp";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp/out/types/enums.types";


export function MXProvider({ children }: { children: React.ReactNode }) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            await initApp({
                dAppConfig: {
                    environment: EnvironmentsEnum.mainnet,
                    providers: {
                        walletConnect: {
                            walletConnectV2ProjectId: '9b642279af76274472f883656d7348e6'
                        }
                    }
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
    }, []);

    if (!initialized) return <>{children}</>;

    return (
        <React.Fragment>
            {/* The managers in sdk-dapp will use these if they are in the DOM */}
            {React.createElement('mvx-toast-list')}
            {React.createElement('mvx-sign-transactions-panel')}
            {React.createElement('mvx-unlock-panel')}
            {children}
        </React.Fragment>
    );
}
