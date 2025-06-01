"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    FileText,
    ChevronRight,
    Compass,
    Grid3X3,
    List,
    ChevronDown,
} from "lucide-react";
import { getAllSectionTitles, getChaptersBySection } from "@/lib/handbook-data";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { ErrorMessage } from "@/components/ui/error-message";
import Image from "next/image";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock progress data - in a real app, this would come from a database
const userProgress = {
    // Section progress calculated based on completed chapters
    sectionProgress: {
        Introduction: 100,
        "I. Semiconductor Fundamentals": 50,
        "II. IC Design & EDA": 14,
        "III. Manufacturing Processes": 0,
        "IV. Advanced Topics & Technologies": 0,
        "V. Industry Trends & Careers": 0,
        "VI. Resources & Community": 0,
    },
};

// Helper function to get section progress
const getSectionProgress = (sectionTitle: string): number => {
    return userProgress.sectionProgress[sectionTitle] || 0;
};

export default function HandbookPage() {
    const [userName] = useState("John");
    const [sections, setSections] = useState<string[]>([]);
    const [chaptersBySection, setChaptersBySection] = useState<
        Record<string, any[]>
    >({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({});

    // Handbook sections with images
    const handbookSections = [
        {
            title: "Introduction",
            image: "/electric-flow.png",
            description:
                "Get started with the basics of semiconductor technology and the handbook structure.",
        },
        {
            title: "I. Semiconductor Fundamentals",
            image: "/emerald-circuitry.png",
            description:
                "Learn about the physics, materials, and core devices that form the foundation of semiconductors.",
        },
        {
            title: "II. IC Design & EDA",
            image: "/amethyst-flow.png",
            description:
                "Explore the design methodologies, languages, and tools used in integrated circuit development.",
        },
        {
            title: "III. Manufacturing Processes",
            image: "/abstract-orange-cleanroom.png",
            description:
                "Understand the complex manufacturing techniques used to create semiconductor devices.",
        },
        {
            title: "IV. Advanced Topics & Technologies",
            image: "/crimson-circuitry.png",
            description:
                "Dive into cutting-edge semiconductor technologies and emerging research areas.",
        },
        {
            title: "V. Industry Trends & Careers",
            image: "/abstract-yellow-trends.png",
            description:
                "Explore market dynamics, career paths, and the future of the semiconductor industry.",
        },
        {
            title: "VI. Resources & Community",
            image: "/interconnected-teal.png",
            description:
                "Find additional learning resources, tools, and communities to support your semiconductor journey.",
        },
    ];

    useEffect(() => {
        // Simulate loading data
        setLoading(true);
        setError(null);

        setTimeout(() => {
            try {
                const allSections = getAllSectionTitles();
                setSections(allSections);

                const chaptersMap: Record<string, any[]> = {};
                allSections.forEach((section) => {
                    chaptersMap[section] = getChaptersBySection(section);
                });
                setChaptersBySection(chaptersMap);

                // Initialize all sections as expanded
                const initialExpandedState: Record<string, boolean> = {};
                allSections.forEach((section) => {
                    initialExpandedState[section] = true;
                });
                setExpandedSections(initialExpandedState);

                setLoading(false);
            } catch (err) {
                setError(
                    "Failed to load handbook data. Please try again later."
                );
                setLoading(false);
            }
        }, 800);
    }, []);

    const handleRetry = () => {
        // Retry loading data
        setLoading(true);
        setError(null);

        setTimeout(() => {
            try {
                const allSections = getAllSectionTitles();
                setSections(allSections);

                const chaptersMap: Record<string, any[]> = {};
                allSections.forEach((section) => {
                    chaptersMap[section] = getChaptersBySection(section);
                });
                setChaptersBySection(chaptersMap);
                setLoading(false);
            } catch (err) {
                setError(
                    "Failed to load handbook data. Please try again later."
                );
                setLoading(false);
            }
        }, 800);
    };

    const toggleSectionExpand = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    if (loading) {
        return <LoadingIndicator message="Loading handbook content..." />;
    }

    if (error) {
        return (
            <ErrorMessage
                title="Failed to Load Handbook"
                message={error}
                retryAction={handleRetry}
            />
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome, {userName}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                    Explore the comprehensive semiconductor handbook, take
                    notes, and use our AI tutor to enhance your learning
                    experience.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-teal-600" />
                            Start Learning
                        </CardTitle>
                        <CardDescription>
                            Begin your semiconductor journey
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            The handbook is organized into sections covering
                            everything from basic physics to advanced
                            manufacturing techniques.
                        </p>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Suggested chapters:
                            </h3>
                            {sections.length > 0 &&
                                chaptersBySection[sections[0]] &&
                                chaptersBySection[sections[0]]
                                    .slice(0, 3)
                                    .map((chapter) => (
                                        <Button
                                            key={chapter.id}
                                            variant="outline"
                                            asChild
                                            className="w-full justify-between"
                                        >
                                            <Link
                                                href={`/handbook/${chapter.id}`}
                                            >
                                                {chapter.title}
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-teal-600 hover:bg-teal-700"
                            onClick={() =>
                                (window.location.href = "/handbook/ch1")
                            }
                        >
                            Start with Chapter 1
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-teal-600" />
                            Your Notes
                        </CardTitle>
                        <CardDescription>
                            Access your personal notes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Take and organize notes as you learn. Your notes are
                            saved and can be accessed anytime.
                        </p>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Recent notes:
                            </h3>
                            <Button
                                variant="outline"
                                asChild
                                className="w-full justify-between"
                            >
                                <Link href={`/notes/note1`}>
                                    Notes on Semiconductor Physics
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="w-full justify-between"
                            >
                                <Link href={`/notes/note2`}>
                                    IC Design Flow Summary
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/notes">View All Notes</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center">
                            <Compass className="h-5 w-5 mr-2 text-teal-600" />
                            Discover Resources
                        </CardTitle>
                        <CardDescription>
                            Find related learning materials
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Our Discover tool can help you find relevant
                            resources both within the handbook and from external
                            sources.
                        </p>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Try searching for:
                            </h3>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                                <li>Semiconductor physics basics</li>
                                <li>IC design process</li>
                                <li>Manufacturing techniques</li>
                                <li>Latest industry developments</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-teal-600 hover:bg-teal-700"
                            onClick={() => {
                                // This will be handled by the Discover button in the layout
                                const discoverButton = document.querySelector(
                                    '[aria-label="Open Discover"]'
                                ) as HTMLButtonElement;
                                if (discoverButton) discoverButton.click();
                            }}
                        >
                            <Compass className="h-4 w-4 mr-2" />
                            Open Discover Tool
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {handbookSections.map((section) => (
                        <div
                            key={section.title}
                            className="relative overflow-hidden rounded-lg shadow-md dark:shadow-gray-900/30 transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-900/50 group dark-mode-transition"
                            onMouseEnter={() =>
                                setHoveredSection(section.title)
                            }
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={section.image || "/placeholder.svg"}
                                    alt={section.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 dark:brightness-[0.85]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent dark:from-black/80"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-white text-lg font-semibold mb-1">
                                        {section.title}
                                    </h3>
                                    <p className="text-white/80 text-sm line-clamp-2">
                                        {section.description}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800 dark-mode-transition">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {chaptersBySection[section.title]
                                            ?.length || 0}{" "}
                                        chapters
                                    </span>
                                    <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                                        {getSectionProgress(section.title)}%
                                        complete
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                                    <div
                                        className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${getSectionProgress(
                                                section.title
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                                    >
                                        <Link
                                            href={`/handbook/${
                                                chaptersBySection[
                                                    section.title
                                                ]?.[0]?.id || "#"
                                            }`}
                                        >
                                            Explore
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 border border-gray-200 dark:border-gray-800 dark-mode-transition">
                    <div className="space-y-6">
                        {sections.map((section) => (
                            <Collapsible
                                key={section}
                                open={expandedSections[section]}
                                onOpenChange={() =>
                                    toggleSectionExpand(section)
                                }
                                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                            >
                                <div className="bg-white dark:bg-gray-800 p-4">
                                    <div className="flex justify-between items-center">
                                        <CollapsibleTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="p-0 hover:bg-transparent flex items-center w-full justify-between"
                                            >
                                                <h3 className="text-lg font-semibold">
                                                    {section}
                                                </h3>
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-teal-600 dark:text-teal-400 mr-2">
                                                        {getSectionProgress(
                                                            section
                                                        )}
                                                        % complete
                                                    </span>
                                                    <ChevronDown
                                                        className={`h-5 w-5 transition-transform ${
                                                            expandedSections[
                                                                section
                                                            ]
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </div>
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${getSectionProgress(
                                                    section
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <CollapsibleContent>
                                    <div className="p-4 pt-0 bg-white dark:bg-gray-800">
                                        {chaptersBySection[section] &&
                                            chaptersBySection[section].map(
                                                (chapter) => (
                                                    <div
                                                        key={chapter.id}
                                                        className="mt-4"
                                                    >
                                                        <div className="mb-2">
                                                            <Button
                                                                variant="outline"
                                                                asChild
                                                                className="justify-start h-auto py-2 w-full"
                                                            >
                                                                <Link
                                                                    href={`/handbook/${chapter.id}`}
                                                                    className="text-left"
                                                                >
                                                                    <span className="font-medium">
                                                                        {
                                                                            chapter.title
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </Button>
                                                        </div>

                                                        {chapter.keyTopics &&
                                                            chapter.keyTopics
                                                                .length > 0 && (
                                                                <div className="ml-4 mt-2">
                                                                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                                        Key
                                                                        Topics:
                                                                    </h4>
                                                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                                        {chapter.keyTopics.map(
                                                                            (
                                                                                topic,
                                                                                index
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        topic
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
