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
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ClipboardCopy, Sparkles, ArrowRight, BookOpen } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface LearningPathGeneratorProps {
  buttonVariant?: "default" | "outline" | "ghost"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
  learningGoals?: string[]
  currentKnowledgeAreas?: string[]
}

interface PathItem {
  title: string
  description: string
  url: string
  type: "chapter" | "resource"
  difficulty: "beginner" | "intermediate" | "advanced"
}

export function LearningPathGenerator({
  buttonVariant = "outline",
  buttonSize = "default",
  className,
  learningGoals = [],
  currentKnowledgeAreas = [],
}: LearningPathGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [path, setPath] = useState<PathItem[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleGeneratePath = async () => {
    setLoading(true)

    // Simulate generating a learning path
    setTimeout(() => {
      // Mock learning path based on goals and knowledge
      const mockPath: PathItem[] = [
        {
          title: "Semiconductor Physics & Materials",
          description:
            "Build a solid foundation in semiconductor physics, focusing on band theory and carrier transport.",
          url: "/handbook/ch3",
          type: "chapter",
          difficulty: "beginner",
        },
        {
          title: "Introduction to Semiconductor Physics",
          description:
            "A comprehensive introduction to the basics of semiconductor physics, including atomic structure and material properties.",
          url: "/resources/res5",
          type: "resource",
          difficulty: "beginner",
        },
        {
          title: "Electronic Structure & Carrier Transport",
          description:
            "Understand how electrons behave in semiconductor materials and how they contribute to current flow.",
          url: "/handbook/ch4",
          type: "chapter",
          difficulty: "intermediate",
        },
        {
          title: "Fundamental Semiconductor Devices",
          description:
            "Learn about basic semiconductor devices like diodes, transistors, and their operating principles.",
          url: "/handbook/ch5",
          type: "chapter",
          difficulty: "intermediate",
        },
        {
          title: "Digital IC Design Fundamentals",
          description: "Introduction to digital integrated circuit design concepts and methodologies.",
          url: "/handbook/ch6",
          type: "chapter",
          difficulty: "intermediate",
        },
        {
          title: "The IC Design Flow: From Concept to GDSII",
          description: "A comprehensive overview of the entire integrated circuit design process.",
          url: "/handbook/ch8",
          type: "chapter",
          difficulty: "advanced",
        },
      ]

      setPath(mockPath)
      setLoading(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    const textPath = path
      .map(
        (item, index) =>
          `${index + 1}. ${item.title} (${item.difficulty})\n   ${item.description}\n   URL: ${window.location.origin}${item.url}\n`,
      )
      .join("\n")

    navigator.clipboard.writeText(`My Silicon Guide Learning Path:\n\n${textPath}`)
    toast({
      title: "Copied to clipboard",
      description: "The learning path has been copied to your clipboard",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
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
            if (path.length === 0) {
              handleGeneratePath()
            }
          }}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Learning Path
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Your Personalized Learning Path</DialogTitle>
          <DialogDescription>AI-generated learning path based on your goals and current knowledge</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading && (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
              <p className="text-gray-600">Creating your personalized learning path...</p>
            </div>
          )}

          {path.length > 0 && !loading && (
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {path.map((item, index) => (
                  <Card key={index} className="border-l-4 border-l-teal-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{item.title}</h3>
                              <Badge className={`ml-2 ${getDifficultyColor(item.difficulty)}`}>{item.difficulty}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button asChild variant="outline" size="sm">
                          <Link href={item.url} className="flex items-center">
                            {item.type === "chapter" ? (
                              <BookOpen className="h-3 w-3 mr-1" />
                            ) : (
                              <Sparkles className="h-3 w-3 mr-1" />
                            )}
                            {item.type === "chapter" ? "Go to Chapter" : "View Resource"}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs text-gray-500">
            Based on your learning goals and knowledge
          </Badge>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyToClipboard} disabled={path.length === 0 || loading}>
              <ClipboardCopy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="default"
              onClick={() => handleGeneratePath()}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
