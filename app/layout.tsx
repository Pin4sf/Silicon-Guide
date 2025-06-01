import type React from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// 1. Import StagewiseToolbar
import { StagewiseToolbar } from "@stagewise/toolbar-next";

const inter = Inter({ subsets: ["latin"] });

// 2. Define your toolbar configuration
const stagewiseConfig = {
    plugins: [], // Use default plugins
    settings: {
        debug: true, // Enable debug mode to help diagnose issues
    },
};

export const metadata = {
    title: "Silicon Guide",
    description: "Comprehensive Semiconductor Handbook and Learning Platform",
    generator: "v0.dev",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} dark-mode-transition`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                    {/* 3. Add StagewiseToolbar conditionally for development mode */}
                    {process.env.NODE_ENV === "development" && (
                        <StagewiseToolbar config={stagewiseConfig} />
                    )}
                </ThemeProvider>
            </body>
        </html>
    );
}
