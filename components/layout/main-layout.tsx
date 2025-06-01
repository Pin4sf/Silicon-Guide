"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { ChatButton } from "@/components/chat/chat-button";
import {
    Menu,
    LogOut,
    User,
    FileText,
    Bookmark,
    Search,
    Moon,
    Sun,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { SessionSummarizer } from "@/components/ai/session-summarizer";
import { ResearchAgent } from "@/components/ai/research-agent";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);

        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const handleSignOut = () => {
        window.location.href = "/";
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-950">
            {/* Desktop Sidebar */}
            <div
                className={`hidden md:block fixed top-0 left-0 h-screen z-20 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "w-64" : "w-0"
                } overflow-hidden`}
            >
                <div className="h-full w-full overflow-y-auto">
                    {isSidebarOpen && <Sidebar currentPath={pathname || ""} />}
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "md:ml-64" : "md:ml-0"
                }`}
            >
                {/* Desktop Header */}
                <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 h-14 flex items-center px-6">
                    <div className="flex items-center">
                        {/* Combined Mobile Menu Button / Desktop Sidebar Toggle Button */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    onClick={(e) => {
                                        if (!isMobile) {
                                            e.preventDefault();
                                            toggleSidebar();
                                        }
                                    }}
                                >
                                    {isMobile ? (
                                        <Menu className="h-5 w-5" />
                                    ) : isSidebarOpen ? (
                                        <ChevronLeft className="h-5 w-5" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5" />
                                    )}
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="p-0 w-64 backdrop-blur-md bg-white/90 dark:bg-gray-950/90"
                            >
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Mobile Menu</SheetTitle>
                                </SheetHeader>
                                <Sidebar currentPath={pathname || ""} />
                            </SheetContent>
                        </Sheet>

                        <Link
                            href="/handbook"
                            className="font-medium text-teal-600 dark:text-teal-400 mr-4"
                        >
                            Silicon Guide
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                        onClick={() =>
                                            setIsSearchOpen(!isSearchOpen)
                                        }
                                    >
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Search handbook</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {isSearchOpen && (
                            <div className="relative w-64">
                                <Input
                                    placeholder="Search handbook..."
                                    className="pl-8 h-8 text-sm rounded-md"
                                />
                                <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="hidden md:flex items-center space-x-2">
                            <ResearchAgent
                                buttonVariant="ghost"
                                buttonSize="sm"
                                className="text-sm h-8"
                            />
                            <SessionSummarizer
                                buttonVariant="ghost"
                                buttonSize="sm"
                                className="text-sm h-8"
                            />
                        </div>

                        {/* Theme toggle */}
                        {mounted && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setTheme(
                                                    theme === "dark"
                                                        ? "light"
                                                        : "dark"
                                                )
                                            }
                                            className="h-8 w-8 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                            aria-label={
                                                theme === "dark"
                                                    ? "Switch to light mode"
                                                    : "Switch to dark mode"
                                            }
                                        >
                                            {theme === "dark" ? (
                                                <Sun className="h-4 w-4 text-yellow-400 transition-transform hover:rotate-45" />
                                            ) : (
                                                <Moon className="h-4 w-4 transition-transform hover:rotate-12" />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>
                                            {theme === "dark"
                                                ? "Switch to light mode"
                                                : "Switch to dark mode"}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-2 h-8"
                                >
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-teal-100 text-teal-800 text-xs">
                                            JD
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm hidden md:inline">
                                        John Doe
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 backdrop-blur-md bg-white/90 dark:bg-gray-950/90"
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/profile"
                                        className="flex items-center"
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/notes"
                                        className="flex items-center"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        <span>Notes</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/annotations"
                                        className="flex items-center"
                                    >
                                        <Bookmark className="mr-2 h-4 w-4" />
                                        <span>Annotations</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="md:hidden">
                                    <ResearchAgent
                                        buttonVariant="ghost"
                                        className="w-full justify-start px-0 h-8"
                                    />
                                </DropdownMenuItem>
                                <DropdownMenuItem className="md:hidden">
                                    <SessionSummarizer
                                        buttonVariant="ghost"
                                        className="w-full justify-start px-0 h-8"
                                    />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="md:hidden" />
                                <DropdownMenuItem
                                    onClick={handleSignOut}
                                    className="text-red-600 dark:text-red-400"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 w-full">
                    {children}
                </main>

                {/* Chat Button */}
                <ChatButton />
            </div>
        </div>
    );
}
