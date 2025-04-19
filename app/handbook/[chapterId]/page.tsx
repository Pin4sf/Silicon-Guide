"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChapterView } from "@/components/handbook/chapter-view";
import { ResourceList } from "@/components/handbook/resource-list";
import { getChapterData } from "@/lib/handbook-data";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { ErrorMessage } from "@/components/ui/error-message";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Add progress tracking to the chapter page
// First, import the necessary hooks at the top of the file
import { useToast } from "@/hooks/use-toast";

// Add this mock function after the imports
// In a real app, this would be connected to a database or state management
const isChapterCompleted = (chapterId: string): boolean => {
    // Mock data - in a real app, this would come from a database
    const completedChapters = {
        ch1: true,
        ch2: true,
        ch3: true,
        ch4: true,
        ch5: false,
        ch6: false,
        ch7: true,
        ch8: false,
    };
    return completedChapters[chapterId] || false;
};

// Add the useToast hook to the component
export default function ChapterPage({
    params,
}: {
    params: { chapterId: string };
}) {
    // Unwrap the params object using React.use()
    const unwrappedParams = use(params);
    const chapterId = unwrappedParams.chapterId;

    const [chapter, setChapter] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast(); // Add this line

    useEffect(() => {
        // Reset state when chapter ID changes
        setLoading(true);
        setError(null);
        setChapter(null);

        // Simulate network delay for loading state demonstration
        const timer = setTimeout(() => {
            try {
                const chapterData = getChapterData(chapterId);

                if (chapterData) {
                    setChapter(chapterData);
                    setLoading(false);
                } else {
                    setError(`Chapter "${chapterId}" not found`);
                    setLoading(false);
                }
            } catch (err) {
                setError(
                    "Failed to load chapter content. Please try again later."
                );
                setLoading(false);
            }
        }, 800); // Simulate network delay

        return () => clearTimeout(timer);
    }, [chapterId]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);

        // Retry loading the chapter data
        setTimeout(() => {
            try {
                const chapterData = getChapterData(chapterId);

                if (chapterData) {
                    setChapter(chapterData);
                    setLoading(false);
                } else {
                    setError(`Chapter "${chapterId}" not found`);
                    setLoading(false);
                }
            } catch (err) {
                setError(
                    "Failed to load chapter content. Please try again later."
                );
                setLoading(false);
            }
        }, 800);
    };

    const navigateToPreviousChapter = () => {
        // Extract chapter number from ID
        const currentChapterNum = Number.parseInt(chapterId.replace("ch", ""));
        if (currentChapterNum > 1) {
            const prevChapterId = `ch${currentChapterNum - 1}`;
            router.push(`/handbook/${prevChapterId}`);
        }
    };

    const navigateToNextChapter = () => {
        // Extract chapter number from ID
        const currentChapterNum = Number.parseInt(chapterId.replace("ch", ""));
        const nextChapterId = `ch${currentChapterNum + 1}`;

        // Check if next chapter exists
        if (getChapterData(nextChapterId)) {
            router.push(`/handbook/${nextChapterId}`);
        }
    };

    if (loading) {
        return <LoadingIndicator message="Loading chapter content..." />;
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/handbook" className="flex items-center">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back to Handbook
                        </Link>
                    </Button>
                </div>
                <ErrorMessage
                    title="Failed to Load Chapter"
                    message={error}
                    retryAction={handleRetry}
                />
            </div>
        );
    }

    if (!chapter) {
        // Fallback for chapters not yet in the database
        return (
            <div className="max-w-3xl mx-auto py-12">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/handbook" className="flex items-center">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back to Handbook
                        </Link>
                    </Button>
                </div>
                <h1 className="text-3xl font-semibold mb-6">
                    Chapter Content Coming Soon
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    We're currently developing content for this chapter. Please
                    check back later or explore other chapters in the handbook.
                </p>
                <div className="flex space-x-4">
                    <Button
                        onClick={navigateToPreviousChapter}
                        variant="outline"
                        disabled={
                            Number.parseInt(chapterId.replace("ch", "")) <= 1
                        }
                    >
                        Previous Chapter
                    </Button>
                    <Button onClick={navigateToNextChapter} variant="outline">
                        Next Chapter
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/handbook" className="flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Handbook
                    </Link>
                </Button>
            </div>
            <ChapterView chapter={chapter} />
            <ResourceList resources={chapter.resources} />

            <div className="flex justify-between mt-12 mb-8">
                <Button
                    onClick={navigateToPreviousChapter}
                    variant="outline"
                    disabled={Number.parseInt(chapterId.replace("ch", "")) <= 1}
                >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Chapter
                </Button>

                <div className="flex items-center">
                    {isChapterCompleted(chapterId) && (
                        <span className="text-sm text-teal-600 dark:text-teal-400 mr-3 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            Completed
                        </span>
                    )}

                    <Button onClick={navigateToNextChapter} variant="outline">
                        Next Chapter
                        <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
