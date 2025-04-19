"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Send,
    X,
    Sparkles,
    BookOpen,
    ExternalLink,
    Copy,
    Info,
    ChevronDown,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    context?: {
        type: "handbook" | "web" | "learning_path" | "session_summary";
        sources?: Array<{
            title: string;
            url?: string;
        }>;
    };
}

interface ChatPanelProps {
    onClose: () => void;
    currentChapterId?: string;
    currentResourceId?: string;
}

export function ChatPanel({
    onClose,
    currentChapterId,
    currentResourceId,
}: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("chat");
    const [isSourcesOpen, setIsSourcesOpen] = useState<Record<string, boolean>>(
        {}
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    // Generate initial greeting based on context
    useEffect(() => {
        const initialMessage: Message = {
            id: "welcome",
            role: "assistant",
            content:
                "Hello! I'm your AI tutor for semiconductor technology. How can I help you today?",
            timestamp: new Date(),
        };

        if (currentChapterId) {
            // Get chapter title based on ID (mock implementation)
            const chapterTitle = getChapterTitle(currentChapterId);
            initialMessage.content = `Hello! I see you're reading about "${chapterTitle}". Feel free to ask me any questions about this topic or the semiconductor field in general.`;
        } else if (currentResourceId) {
            // Get resource title based on ID (mock implementation)
            const resourceTitle = getResourceTitle(currentResourceId);
            initialMessage.content = `Hello! I see you're looking at "${resourceTitle}". What would you like to understand better about this resource?`;
        }

        setMessages([initialMessage]);
    }, [currentChapterId, currentResourceId]);

    useEffect(() => {
        // Focus the input field when the chat panel opens
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        // Scroll to the bottom when messages change
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            // Generate different responses based on the user's message
            let responseText = "";
            let context: Message["context"] | undefined = undefined;
            const userMessageLower = userMessage.content.toLowerCase();

            if (
                userMessageLower.includes("summarize") &&
                userMessageLower.includes("session")
            ) {
                // Session summarizer agent
                responseText =
                    "Here's a summary of your learning session today:\n\n" +
                    "• You explored the fundamentals of semiconductor physics, focusing on band theory and carrier transport\n" +
                    "• You spent significant time on silicon material properties, particularly its crystal structure\n" +
                    "• You reviewed the p-n junction formation and its electrical characteristics\n" +
                    "• You briefly looked at MOSFET operation principles\n\n" +
                    "Would you like me to elaborate on any of these topics?";

                context = {
                    type: "session_summary",
                    sources: [
                        { title: "Semiconductor Physics & Materials" },
                        { title: "Electronic Structure & Carrier Transport" },
                        { title: "Fundamental Semiconductor Devices" },
                    ],
                };
            } else if (
                userMessageLower.includes("learning path") ||
                userMessageLower.includes("recommend") ||
                userMessageLower.includes("what should i study")
            ) {
                // Personalization bot agent
                responseText =
                    "Based on your profile and learning goals, here's a personalized learning path I recommend:\n\n" +
                    "1. Start with **Semiconductor Physics & Materials** to build your foundation\n" +
                    "2. Move to **Electronic Structure & Carrier Transport** to understand how electrons behave\n" +
                    "3. Then explore **Fundamental Semiconductor Devices** to see practical applications\n" +
                    "4. For your interest in IC design, focus on **Digital IC Design Fundamentals**\n" +
                    "5. Finally, study **The IC Design Flow: From Concept to GDSII** for the complete picture\n\n" +
                    "Would you like me to adjust this path based on any specific interests?";

                context = {
                    type: "learning_path",
                    sources: [
                        {
                            title: "Semiconductor Physics & Materials",
                            url: "/handbook/ch3",
                        },
                        {
                            title: "Electronic Structure & Carrier Transport",
                            url: "/handbook/ch4",
                        },
                        {
                            title: "Fundamental Semiconductor Devices",
                            url: "/handbook/ch5",
                        },
                        {
                            title: "Digital IC Design Fundamentals",
                            url: "/handbook/ch6",
                        },
                        {
                            title: "The IC Design Flow: From Concept to GDSII",
                            url: "/handbook/ch8",
                        },
                    ],
                };
            } else if (
                userMessageLower.includes("latest") ||
                userMessageLower.includes("news") ||
                userMessageLower.includes("recent developments") ||
                userMessageLower.includes("outside the handbook")
            ) {
                // Research agent
                responseText =
                    "I've searched for the latest information on semiconductor technology beyond what's in the handbook:\n\n" +
                    "According to recent reports, TSMC has announced plans for their 2nm process node with production expected to begin in 2025. This represents a significant advancement in semiconductor manufacturing technology.\n\n" +
                    "Additionally, research from MIT suggests new materials beyond silicon that might enable more efficient quantum computing applications.\n\n" +
                    "Would you like me to explore any of these developments in more detail?";

                context = {
                    type: "web",
                    sources: [
                        {
                            title: "TSMC 2nm Process Node Announcement",
                            url: "https://example.com/tsmc-2nm",
                        },
                        {
                            title: "MIT Research on Quantum Computing Materials",
                            url: "https://example.com/mit-quantum",
                        },
                    ],
                };
            } else if (
                userMessageLower.includes("semiconductor") &&
                userMessageLower.includes("physics")
            ) {
                responseText =
                    "Semiconductor physics is the foundation of modern electronics. It deals with how electrons behave in semiconductor materials like silicon and germanium.\n\n" +
                    "The key concept is the band gap, which is the energy difference between the valence band and conduction band. In semiconductors, this gap is small enough that electrons can be excited from the valence to the conduction band with a reasonable amount of energy.\n\n" +
                    "Silicon has a band gap of 1.12 eV at room temperature, which makes it ideal for many electronic applications. Would you like me to explain more about specific aspects like doping, carrier transport, or band theory?";

                context = {
                    type: "handbook",
                    sources: [
                        {
                            title: "Semiconductor Physics & Materials",
                            url: "/handbook/ch3",
                        },
                        {
                            title: "Electronic Structure & Carrier Transport",
                            url: "/handbook/ch4",
                        },
                    ],
                };
            } else if (
                userMessageLower.includes("ic design") ||
                userMessageLower.includes("integrated circuit")
            ) {
                responseText =
                    "Integrated Circuit (IC) design is the process of creating electronic circuits on semiconductor materials. The design flow typically includes:\n\n" +
                    "1. Specification: Defining what the circuit should do\n" +
                    "2. Architecture design: High-level structure of the circuit\n" +
                    "3. RTL coding: Writing the design in a hardware description language (Verilog/VHDL)\n" +
                    "4. Synthesis: Converting RTL to a gate-level netlist\n" +
                    "5. Physical design: Placing and routing the gates on the chip\n" +
                    "6. Verification: Ensuring the design works as expected\n" +
                    "7. Tapeout: Finalizing the design for manufacturing\n\n" +
                    "Are you interested in digital design, analog design, or a specific part of the design flow?";

                context = {
                    type: "handbook",
                    sources: [
                        {
                            title: "Digital IC Design Fundamentals",
                            url: "/handbook/ch6",
                        },
                        {
                            title: "Analog IC Design Fundamentals",
                            url: "/handbook/ch7",
                        },
                        {
                            title: "The IC Design Flow: From Concept to GDSII",
                            url: "/handbook/ch8",
                        },
                    ],
                };
            } else {
                responseText =
                    "That's an interesting question about semiconductor technology. To give you the most helpful answer, could you provide a bit more context or specify which aspect you're most interested in learning about? I can cover topics ranging from basic physics to design, manufacturing, or industry trends.";
            }

            const assistantMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: responseText,
                timestamp: new Date(),
                context,
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleSources = (messageId: string) => {
        setIsSourcesOpen((prev) => ({
            ...prev,
            [messageId]: !prev[messageId],
        }));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
            description: "The message has been copied to your clipboard",
        });
    };

    // Mock functions to get titles based on IDs
    const getChapterTitle = (chapterId: string) => {
        const chapters: Record<string, string> = {
            ch1: "Welcome & The Semiconductor Revolution",
            ch2: "The Global Semiconductor Landscape",
            ch3: "Semiconductor Physics & Materials",
            ch4: "Electronic Structure & Carrier Transport",
            ch5: "Fundamental Semiconductor Devices",
            ch6: "Digital IC Design Fundamentals",
            ch7: "Analog IC Design Fundamentals",
            ch8: "The IC Design Flow: From Concept to GDSII",
        };
        return chapters[chapterId] || "Unknown Chapter";
    };

    const getResourceTitle = (resourceId: string) => {
        const resources: Record<string, string> = {
            res1: "Introduction to Semiconductor Physics",
            res2: "Semiconductor Materials: Silicon vs. Germanium",
            res3: "Global Semiconductor Market Analysis",
            res4: "Semiconductor Supply Chain Explained",
            res5: "Introduction to Semiconductor Physics",
            res6: "Semiconductor Materials: Silicon vs. Germanium",
            res7: "Band Theory of Solids",
        };
        return resources[resourceId] || "Unknown Resource";
    };

    // Format message content with markdown-like syntax
    const formatMessageContent = (content: string) => {
        // Replace **bold** with <strong>bold</strong>
        const boldFormatted = content.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );

        // Replace newlines with <br />
        const withLineBreaks = boldFormatted
            .replace(/\n\n/g, "<br /><br />")
            .replace(/\n/g, "<br />");

        // Replace numbered lists
        const withLists = withLineBreaks.replace(
            /(\d+\.\s.*?)(<br \/>|$)/g,
            "<li>$1</li>"
        );

        // Replace bullet points
        const withBullets = withLists.replace(
            /•\s(.*?)(<br \/>|$)/g,
            "<li>$1</li>"
        );

        return withBullets;
    };

    return (
        <Card className="fixed bottom-20 right-4 w-[350px] md:w-[450px] h-[500px] shadow-xl z-10 flex flex-col bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-teal-200 dark:border-teal-900/50 dark-mode-transition">
            <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
                <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="bg-teal-100 text-teal-800">
                            AI
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">
                        Silicon Guide Assistant
                    </CardTitle>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Close assistant</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardHeader>

            <Tabs
                defaultValue="chat"
                className="flex-1 flex flex-col"
                onValueChange={setActiveTab}
            >
                <TabsList className="mx-4 mt-2 grid w-auto grid-cols-2">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="info">About</TabsTrigger>
                </TabsList>

                <TabsContent
                    value="chat"
                    className="flex-1 flex flex-col data-[state=inactive]:hidden"
                >
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`flex max-w-[90%] ${
                                            message.role === "user"
                                                ? "flex-row-reverse"
                                                : "flex-row"
                                        }`}
                                    >
                                        {message.role === "assistant" && (
                                            <Avatar className="h-8 w-8 mr-2 mt-1">
                                                <AvatarFallback className="bg-teal-100 text-teal-800">
                                                    AI
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div className="flex flex-col">
                                            <div
                                                className={`rounded-lg px-3 py-2 text-sm ${
                                                    message.role === "user"
                                                        ? "bg-teal-600 text-white dark:bg-teal-700"
                                                        : "bg-gray-100 text-gray-800 dark:bg-gray-800/80 dark:text-gray-200"
                                                } dark-mode-transition`}
                                            >
                                                <div
                                                    className="prose prose-sm dark:prose-invert max-w-none"
                                                    dangerouslySetInnerHTML={{
                                                        __html: formatMessageContent(
                                                            message.content
                                                        ),
                                                    }}
                                                />

                                                {message.role ===
                                                    "assistant" && (
                                                    <div className="flex items-center justify-end mt-1 space-x-1">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-5 w-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                                                        onClick={() =>
                                                                            copyToClipboard(
                                                                                message.content
                                                                            )
                                                                        }
                                                                    >
                                                                        <Copy className="h-3 w-3 text-gray-500" />
                                                                        <span className="sr-only">
                                                                            Copy
                                                                        </span>
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
                                                                        Copy to
                                                                        clipboard
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                )}
                                            </div>

                                            {message.context &&
                                                message.context.sources &&
                                                message.context.sources.length >
                                                    0 && (
                                                    <div className="ml-2 mt-1">
                                                        <Collapsible
                                                            open={
                                                                isSourcesOpen[
                                                                    message.id
                                                                ]
                                                            }
                                                            onOpenChange={() =>
                                                                toggleSources(
                                                                    message.id
                                                                )
                                                            }
                                                            className="w-full"
                                                        >
                                                            <CollapsibleTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 text-xs flex items-center px-2 text-gray-500"
                                                                >
                                                                    <Info className="h-3 w-3 mr-1" />
                                                                    {message
                                                                        .context
                                                                        .type ===
                                                                    "handbook"
                                                                        ? "Handbook Sources"
                                                                        : message
                                                                              .context
                                                                              .type ===
                                                                          "web"
                                                                        ? "Web Sources"
                                                                        : message
                                                                              .context
                                                                              .type ===
                                                                          "learning_path"
                                                                        ? "Learning Path"
                                                                        : "Session Summary"}
                                                                    <ChevronDown
                                                                        className={`h-3 w-3 ml-1 transition-transform ${
                                                                            isSourcesOpen[
                                                                                message
                                                                                    .id
                                                                            ]
                                                                                ? "rotate-180"
                                                                                : ""
                                                                        }`}
                                                                    />
                                                                </Button>
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent className="mt-1">
                                                                <div className="text-xs bg-gray-50 dark:bg-gray-900 rounded p-2 border border-gray-200 dark:border-gray-800">
                                                                    {message.context.sources.map(
                                                                        (
                                                                            source,
                                                                            index
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="flex items-center mb-1 last:mb-0"
                                                                            >
                                                                                {message
                                                                                    .context
                                                                                    ?.type ===
                                                                                "handbook" ? (
                                                                                    <BookOpen className="h-3 w-3 mr-1 text-teal-600" />
                                                                                ) : message
                                                                                      .context
                                                                                      ?.type ===
                                                                                  "web" ? (
                                                                                    <ExternalLink className="h-3 w-3 mr-1 text-blue-600" />
                                                                                ) : message
                                                                                      .context
                                                                                      ?.type ===
                                                                                  "learning_path" ? (
                                                                                    <Sparkles className="h-3 w-3 mr-1 text-amber-600" />
                                                                                ) : (
                                                                                    <Info className="h-3 w-3 mr-1 text-purple-600" />
                                                                                )}

                                                                                {source.url ? (
                                                                                    <a
                                                                                        href={
                                                                                            source.url
                                                                                        }
                                                                                        className="text-teal-600 dark:text-teal-400 hover:underline"
                                                                                        target={
                                                                                            source.url.startsWith(
                                                                                                "http"
                                                                                            )
                                                                                                ? "_blank"
                                                                                                : "_self"
                                                                                        }
                                                                                        rel={
                                                                                            source.url.startsWith(
                                                                                                "http"
                                                                                            )
                                                                                                ? "noopener noreferrer"
                                                                                                : ""
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            source.title
                                                                                        }
                                                                                    </a>
                                                                                ) : (
                                                                                    <span>
                                                                                        {
                                                                                            source.title
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </CollapsibleContent>
                                                        </Collapsible>
                                                    </div>
                                                )}
                                        </div>

                                        {message.role === "user" && (
                                            <Avatar className="h-8 w-8 ml-2 mt-1">
                                                <AvatarFallback className="bg-gray-200">
                                                    JD
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarFallback className="bg-teal-100 text-teal-800">
                                                AI
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 flex items-center">
                                            <div className="flex space-x-1">
                                                <div
                                                    className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"
                                                    style={{
                                                        animationDelay: "0ms",
                                                    }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"
                                                    style={{
                                                        animationDelay: "150ms",
                                                    }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"
                                                    style={{
                                                        animationDelay: "300ms",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    <CardFooter className="p-4 pt-2 border-t">
                        <div className="flex w-full items-center space-x-2">
                            <Input
                                ref={inputRef}
                                placeholder="Ask about semiconductors, request a learning path, or summarize your session..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size="icon"
                                            onClick={handleSendMessage}
                                            disabled={
                                                !input.trim() || isLoading
                                            }
                                            className="bg-teal-600 hover:bg-teal-700 text-white"
                                        >
                                            <Send className="h-4 w-4" />
                                            <span className="sr-only">
                                                Send
                                            </span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Send message</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </CardFooter>
                </TabsContent>

                <TabsContent
                    value="info"
                    className="flex-1 overflow-auto data-[state=inactive]:hidden"
                >
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-4">
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    About the Silicon Guide Assistant
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    I'm your AI-powered learning companion for
                                    the Silicon Guide handbook. I can help you
                                    understand semiconductor concepts, suggest
                                    personalized learning paths, and more.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-md font-medium mb-1">
                                    What I can do:
                                </h4>
                                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                    <li className="flex items-start">
                                        <BookOpen className="h-4 w-4 mr-2 text-teal-600 mt-0.5" />
                                        <span>
                                            Answer questions about semiconductor
                                            topics in the handbook
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <ExternalLink className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                                        <span>
                                            Research recent developments and
                                            external information
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Sparkles className="h-4 w-4 mr-2 text-amber-600 mt-0.5" />
                                        <span>
                                            Create personalized learning paths
                                            based on your goals
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <Info className="h-4 w-4 mr-2 text-purple-600 mt-0.5" />
                                        <span>
                                            Summarize your learning sessions
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-md font-medium mb-1">
                                    Example questions:
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        "Explain band theory in semiconductors",
                                        "What are the latest developments in EUV lithography?",
                                        "Create a learning path for IC design",
                                        "Summarize my session today",
                                    ].map((question, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="text-sm w-full justify-start h-auto py-2 px-3"
                                            onClick={() => {
                                                setInput(question);
                                                setActiveTab("chat");
                                                setTimeout(
                                                    () =>
                                                        inputRef.current?.focus(),
                                                    100
                                                );
                                            }}
                                        >
                                            {question}
                                        </Button>
                                    ))}
                                </div>

                                <div className="pt-2">
                                    <Badge
                                        variant="outline"
                                        className="text-xs text-gray-500 border-gray-300"
                                    >
                                        Powered by Silicon Guide AI
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </Card>
    );
}
