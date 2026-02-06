import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MXProvider } from "@/components/MXProvider";

export const metadata: Metadata = {
  title: "OOXHub | MultiversX Ecosystem",
  description: "The ultimate HUB for all active projects on the MultiversX network.",
  openGraph: {
    title: "OOXHub | MultiversX Ecosystem",
    description: "The ultimate HUB for all active projects on the MultiversX network.",
    url: "https://ooxhub.art",
    siteName: "OOXHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OOXHub Social Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OOXHub | MultiversX Ecosystem",
    description: "The ultimate HUB for all active projects on the MultiversX network.",
    site: "@onionxlabs",
    creator: "@onionxlabs",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MXProvider>
            {children}
            {modal}
          </MXProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
