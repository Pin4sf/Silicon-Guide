"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ClipboardCopy, ExternalLink, Search, ArrowRight, BookOpen, Compass } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getChapterData } from "@/lib/handbook-data"

interface ResearchAgentProps {
  buttonVariant?: "default" | "outline" | "ghost"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
}

interface ResearchResult {
  title: string
  description: string
  url: string
  source: string
  type: "handbook" | "web" | "paper" | "news"
  date?: string
  relevance: number // 0-100
}

export function ResearchAgent({ buttonVariant = "outline", buttonSize = "default", className }: ResearchAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ResearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()
  const pathname = usePathname()

  // Extract current chapter ID from pathname if available
  const currentChapterId = pathname?.match(/\/handbook\/([^/]+)/)?.[1]
  const currentChapter = currentChapterId ? getChapterData(currentChapterId) : undefined

  // Pre-populate search query based on current chapter if available
  const getInitialQuery = () => {
    if (currentChapter) {
      // Extract a relevant keyword from the chapter title
      const titleWords = currentChapter.title.split(" ")
      // Filter out common words and get a relevant keyword
      const relevantWords = titleWords.filter(
        (word) => word.length > 3 && !["and", "the", "for", "with", "introduction", "to"].includes(word.toLowerCase()),
      )
      return relevantWords.length > 0 ? relevantWords[0] : ""
    }
    return ""
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setResults([])

    // Simulate API call to research agent
    setTimeout(() => {
      // Generate mock research results based on the query
      const mockResults: ResearchResult[] = generateMockResults(query)
      setResults(mockResults)
      setLoading(false)
    }, 1500)
  }

  const generateMockResults = (searchQuery: string): ResearchResult[] => {
    // This function generates contextually relevant mock results based on the search query
    const query = searchQuery.toLowerCase()

    // Base results that might be relevant for many semiconductor-related queries
    const baseResults: ResearchResult[] = [
      {
        title: "Recent Advances in Semiconductor Technology",
        description:
          "An overview of the latest developments in semiconductor manufacturing, design, and applications, with a focus on emerging technologies and industry trends.",
        url: "https://example.com/semiconductor-advances",
        source: "IEEE Spectrum",
        type: "web",
        date: "2023-11-15",
        relevance: 85,
      },
    ]

    // Query-specific results
    let queryResults: ResearchResult[] = []

    // Add results based on query keywords
    if (query.includes("physics") || query.includes("material") || query.includes("silicon")) {
      queryResults.push({
        title: "Semiconductor Physics & Materials Science",
        description:
          "Comprehensive chapter covering semiconductor physics fundamentals, including band theory, carrier transport, and material properties.",
        url: "/handbook/ch3",
        source: "Silicon Guide Handbook",
        type: "handbook",
        relevance: 95,
      })

      queryResults.push({
        title: "Advanced Silicon Materials for Next-Generation Devices",
        description:
          "This research paper explores novel silicon-based materials and structures for improving semiconductor device performance beyond traditional scaling approaches.",
        url: "https://example.com/advanced-silicon-materials",
        source: "Nature Electronics",
        type: "paper",
        date: "2023-09-22",
        relevance: 90,
      })
    }

    if (query.includes("transistor") || query.includes("device") || query.includes("mosfet")) {
      queryResults.push({
        title: "Core Semiconductor Devices",
        description:
          "Detailed explanation of fundamental semiconductor devices including diodes, BJTs, and MOSFETs, with analysis of their operating principles.",
        url: "/handbook/ch4",
        source: "Silicon Guide Handbook",
        type: "handbook",
        relevance: 95,
      })

      queryResults.push({
        title: "Evolution of Transistor Architectures: From Planar to 3D",
        description:
          "A historical and technical overview of how transistor designs have evolved from simple planar structures to complex 3D architectures like FinFETs and Gate-All-Around devices.",
        url: "https://example.com/transistor-evolution",
        source: "Semiconductor Engineering",
        type: "web",
        date: "2023-08-10",
        relevance: 88,
      })
    }

    if (query.includes("design") || query.includes("circuit") || query.includes("logic")) {
      queryResults.push({
        title: "Introduction to Digital Logic & Circuits",
        description:
          "Foundational concepts in digital logic design, including Boolean algebra, logic gates, and basic combinatorial circuits.",
        url: "/handbook/ch5",
        source: "Silicon Guide Handbook",
        type: "handbook",
        relevance: 92,
      })

      queryResults.push({
        title: "Modern Digital Circuit Design Techniques",
        description:
          "This article covers advanced techniques in digital circuit design, focusing on power efficiency, high performance, and design for manufacturability.",
        url: "https://example.com/digital-design-techniques",
        source: "ACM Digital Library",
        type: "paper",
        date: "2023-07-15",
        relevance: 85,
      })
    }

    if (query.includes("manufacturing") || query.includes("fabrication") || query.includes("process")) {
      queryResults.push({
        title: "Wafer Fabrication Overview & Cleanrooms",
        description:
          "Comprehensive introduction to semiconductor manufacturing processes, cleanroom technology, and wafer fabrication techniques.",
        url: "/handbook/ch14",
        source: "Silicon Guide Handbook",
        type: "handbook",
        relevance: 94,
      })

      queryResults.push({
        title: "TSMC Announces 2nm Process Technology Roadmap",
        description:
          "TSMC has revealed its roadmap for 2nm semiconductor manufacturing technology, with risk production scheduled to begin in late 2025.",
        url: "https://example.com/tsmc-2nm-announcement",
        source: "Semiconductor Industry News",
        type: "news",
        date: "2023-10-28",
        relevance: 88,
      })
    }

    if (query.includes("analog") || query.includes("amplifier") || query.includes("signal")) {
      queryResults.push({
        title: "Introduction to Analog Circuits",
        description:
          "Fundamentals of analog circuit design, including basic concepts, semiconductor devices in analog applications, and key circuit topologies.",
        url: "/handbook/ch6",
        source: "Silicon Guide Handbook",
        type: "handbook",
        relevance: 93,
      })

      queryResults.push({
        title: "Noise Reduction Techniques in Analog Circuit Design",
        description:
          "A detailed analysis of various noise sources in analog circuits and practical techniques for minimizing their impact on circuit performance.",
        url: "https://example.com/analog-noise-reduction",
        source: "IEEE Journal of Solid-State Circuits",
        type: "paper",
        date: "2023-06-12",
        relevance: 87,
      })
    }

    // If no specific matches, provide general semiconductor resources
    if (queryResults.length === 0) {
      queryResults = [
        {
          title: "Welcome & The Modern Semiconductor Era",
          description:
            "Introductory chapter providing an overview of semiconductors, their importance, and the structure of the Silicon Guide handbook.",
          url: "/handbook/ch1",
          source: "Silicon Guide Handbook",
          type: "handbook",
          relevance: 80,
        },
        {
          title: "Semiconductor Industry Outlook 2024",
          description:
            "Analysis of current trends, challenges, and opportunities in the global semiconductor industry, with forecasts for key market segments.",
          url: "https://example.com/semiconductor-outlook-2024",
          source: "McKinsey Insights",
          type: "web",
          date: "2023-12-05",
          relevance: 75,
        },
        {
          title: "The Impact of AI on Semiconductor Design and Manufacturing",
          description:
            "This report examines how artificial intelligence is transforming semiconductor design processes, manufacturing techniques, and testing methodologies.",
          url: "https://example.com/ai-semiconductor-impact",
          source: "Deloitte Technology Review",
          type: "web",
          date: "2023-11-30",
          relevance: 70,
        },
      ]
    }

    // Combine and sort results by relevance
    return [...queryResults, ...baseResults].sort((a, b) => b.relevance - a.relevance).slice(0, 7) // Limit to top 7 results
  }

  const copyToClipboard = () => {
    const textResults = results
      .map(
        (result) =>
          `${result.title}\n${result.description}\nSource: ${result.source}${result.date ? ` (${result.date})` : ""}\nURL: ${result.url.startsWith("http") ? result.url : window.location.origin + result.url}\n`,
      )
      .join("\n\n")

    navigator.clipboard.writeText(`Research Results for "${query}":\n\n${textResults}`)
    toast({
      title: "Copied to clipboard",
      description: "The research results have been copied to your clipboard",
    })
  }

  const filteredResults = results.filter((result) => {
    if (activeTab === "all") return true
    return result.type === activeTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "handbook":
        return <BookOpen className="h-4 w-4 text-teal-600" />
      case "web":
        return <ExternalLink className="h-4 w-4 text-blue-600" />
      case "paper":
        return <BookOpen className="h-4 w-4 text-purple-600" />
      case "news":
        return <ExternalLink className="h-4 w-4 text-amber-600" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "handbook":
        return <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">Handbook</Badge>
      case "web":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Web</Badge>
      case "paper":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Paper</Badge>
      case "news":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">News</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={className}
          onClick={() => {
            setIsOpen(true)
            setQuery(getInitialQuery())
          }}
        >
          <Compass className="h-4 w-4 mr-2" />
          Discover
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Discover Resources</DialogTitle>
          <DialogDescription>Search for information across the handbook and external sources</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter a research query about semiconductors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={!query.trim() || loading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
              <p className="text-gray-600">Searching across handbook and external sources...</p>
            </div>
          )}

          {results.length > 0 && !loading && (
            <>
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Results ({results.length})</TabsTrigger>
                  <TabsTrigger value="handbook">
                    Handbook ({results.filter((r) => r.type === "handbook").length})
                  </TabsTrigger>
                  <TabsTrigger value="paper">Papers ({results.filter((r) => r.type === "paper").length})</TabsTrigger>
                  <TabsTrigger value="news">News ({results.filter((r) => r.type === "news").length})</TabsTrigger>
                  <TabsTrigger value="web">Web ({results.filter((r) => r.type === "web").length})</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {filteredResults.map((result, index) => (
                        <Card key={index} className="p-4 border-l-4 border-l-teal-500">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(result.type)}
                                <h3 className="font-medium">{result.title}</h3>
                                {getTypeBadge(result.type)}
                                {result.relevance > 90 && (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Highly Relevant
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.description}</p>
                              <div className="flex items-center text-xs text-gray-500 gap-2">
                                <span>Source: {result.source}</span>
                                {result.date && <span>• {result.date}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button asChild variant="outline" size="sm">
                              <Link
                                href={result.url}
                                className="flex items-center"
                                target={result.url.startsWith("http") ? "_blank" : "_self"}
                                rel={result.url.startsWith("http") ? "noopener noreferrer" : ""}
                              >
                                {result.type === "handbook" ? "View in Handbook" : "View Source"}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="handbook" className="mt-4">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {filteredResults.map((result, index) => (
                        <Card key={index} className="p-4 border-l-4 border-l-teal-500">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(result.type)}
                                <h3 className="font-medium">{result.title}</h3>
                                {getTypeBadge(result.type)}
                                {result.relevance > 90 && (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Highly Relevant
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.description}</p>
                              <div className="flex items-center text-xs text-gray-500 gap-2">
                                <span>Source: {result.source}</span>
                                {result.date && <span>• {result.date}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button asChild variant="outline" size="sm">
                              <Link
                                href={result.url}
                                className="flex items-center"
                                target={result.url.startsWith("http") ? "_blank" : "_self"}
                                rel={result.url.startsWith("http") ? "noopener noreferrer" : ""}
                              >
                                {result.type === "handbook" ? "View in Handbook" : "View Source"}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="paper" className="mt-4">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {filteredResults.map((result, index) => (
                        <Card key={index} className="p-4 border-l-4 border-l-teal-500">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(result.type)}
                                <h3 className="font-medium">{result.title}</h3>
                                {getTypeBadge(result.type)}
                                {result.relevance > 90 && (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Highly Relevant
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.description}</p>
                              <div className="flex items-center text-xs text-gray-500 gap-2">
                                <span>Source: {result.source}</span>
                                {result.date && <span>• {result.date}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button asChild variant="outline" size="sm">
                              <Link
                                href={result.url}
                                className="flex items-center"
                                target={result.url.startsWith("http") ? "_blank" : "_self"}
                                rel={result.url.startsWith("http") ? "noopener noreferrer" : ""}
                              >
                                {result.type === "handbook" ? "View in Handbook" : "View Source"}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="news" className="mt-4">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {filteredResults.map((result, index) => (
                        <Card key={index} className="p-4 border-l-4 border-l-teal-500">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(result.type)}
                                <h3 className="font-medium">{result.title}</h3>
                                {getTypeBadge(result.type)}
                                {result.relevance > 90 && (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Highly Relevant
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.description}</p>
                              <div className="flex items-center text-xs text-gray-500 gap-2">
                                <span>Source: {result.source}</span>
                                {result.date && <span>• {result.date}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button asChild variant="outline" size="sm">
                              <Link
                                href={result.url}
                                className="flex items-center"
                                target={result.url.startsWith("http") ? "_blank" : "_self"}
                                rel={result.url.startsWith("http") ? "noopener noreferrer" : ""}
                              >
                                {result.type === "handbook" ? "View in Handbook" : "View Source"}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="web" className="mt-4">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {filteredResults.map((result, index) => (
                        <Card key={index} className="p-4 border-l-4 border-l-teal-500">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(result.type)}
                                <h3 className="font-medium">{result.title}</h3>
                                {getTypeBadge(result.type)}
                                {result.relevance > 90 && (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Highly Relevant
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.description}</p>
                              <div className="flex items-center text-xs text-gray-500 gap-2">
                                <span>Source: {result.source}</span>
                                {result.date && <span>• {result.date}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button asChild variant="outline" size="sm">
                              <Link
                                href={result.url}
                                className="flex items-center"
                                target={result.url.startsWith("http") ? "_blank" : "_self"}
                                rel={result.url.startsWith("http") ? "noopener noreferrer" : ""}
                              >
                                {result.type === "handbook" ? "View in Handbook" : "View Source"}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs text-gray-500">
            Powered by Silicon Guide Research Agent
          </Badge>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyToClipboard} disabled={results.length === 0 || loading}>
              <ClipboardCopy className="h-4 w-4 mr-2" />
              Copy Results
            </Button>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
