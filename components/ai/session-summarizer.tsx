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
import { Loader2, ClipboardCopy, FileText } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface SessionSummarizerProps {
  buttonVariant?: "default" | "outline" | "ghost"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function SessionSummarizer({
  buttonVariant = "outline",
  buttonSize = "default",
  className,
}: SessionSummarizerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleGenerateSummary = async () => {
    setLoading(true)

    // Simulate generating a summary
    setTimeout(() => {
      const mockSummary = `# Session Summary

## Topics Covered
- **Semiconductor Physics Fundamentals**
  - Band theory and energy gaps
  - Carrier transport mechanisms
  - Doping effects on conductivity

- **Silicon Material Properties**
  - Crystal structure and lattice formation
  - Thermal characteristics
  - Electrical properties at different temperatures

- **P-N Junction Principles**
  - Junction formation and depletion region
  - Forward and reverse bias behavior
  - Current-voltage characteristics

- **MOSFET Basics**
  - Device structure and operation
  - Threshold voltage concepts
  - I-V characteristics in different regions

## Time Distribution
- 45% on semiconductor physics
- 30% on silicon properties
- 20% on p-n junctions
- 5% on MOSFET operation

## Recommended Next Steps
Based on your learning patterns, consider exploring:
1. CMOS technology fundamentals
2. Digital logic implementation
3. Basic circuit design principles`

      setSummary(mockSummary)
      setLoading(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary)
    toast({
      title: "Copied to clipboard",
      description: "The session summary has been copied to your clipboard",
    })
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
            if (!summary) {
              handleGenerateSummary()
            }
          }}
        >
          <FileText className="h-4 w-4 mr-2" />
          Summarize Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Session Summary</DialogTitle>
          <DialogDescription>AI-generated summary of your learning session</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading && (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
              <p className="text-gray-600">Analyzing your session and generating summary...</p>
            </div>
          )}

          {summary && !loading && (
            <Card className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <ScrollArea className="h-[350px] pr-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {summary.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-xl font-bold mt-2 mb-4">
                          {line.substring(2)}
                        </h1>
                      )
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-lg font-semibold mt-4 mb-2">
                          {line.substring(3)}
                        </h2>
                      )
                    } else if (line.startsWith("- **")) {
                      const parts = line.split("**")
                      return (
                        <div key={index} className="flex items-start mb-1">
                          <span className="mr-2">•</span>
                          <div>
                            <strong>{parts[1]}</strong>
                            {parts[2]}
                          </div>
                        </div>
                      )
                    } else if (line.startsWith("- ")) {
                      return (
                        <div key={index} className="flex items-start mb-1">
                          <span className="mr-2">•</span>
                          <div>{line.substring(2)}</div>
                        </div>
                      )
                    } else if (line.match(/^\d+\. /)) {
                      const number = line.match(/^\d+/)?.[0]
                      return (
                        <div key={index} className="flex items-start mb-1">
                          <span className="mr-2">{number}.</span>
                          <div>{line.substring(number!.length + 2)}</div>
                        </div>
                      )
                    } else if (line.trim() === "") {
                      return <div key={index} className="h-4"></div>
                    } else {
                      return (
                        <p key={index} className="mb-2">
                          {line}
                        </p>
                      )
                    }
                  })}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs text-gray-500">
            Based on your recent activity
          </Badge>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={copyToClipboard} disabled={!summary || loading}>
              <ClipboardCopy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
