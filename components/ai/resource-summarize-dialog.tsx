"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface ResourceSummarizeDialogProps {
  isOpen: boolean
  onClose: () => void
  resource: any
}

export function ResourceSummarizeDialog({ isOpen, onClose, resource }: ResourceSummarizeDialogProps) {
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSummarize = async () => {
    setLoading(true)

    // Simulate AI summarization
    setTimeout(() => {
      // Generate a mock summary based on the resource
      const mockSummary = `This is an AI-generated summary of "${resource.title}".
      
Key points:
1. The resource covers essential concepts in ${resource.keywords?.join(", ") || "the topic"}.
2. It's suitable for ${resource.difficulty} level learners.
3. The content is structured to provide a comprehensive understanding of the subject matter.
4. The author presents multiple perspectives and practical applications.
5. The resource connects well with other materials in the handbook.

Recommended follow-up resources would be related to ${resource.keywords?.[0] || "this topic"} for deeper understanding.`

      setSummary(mockSummary)
      setLoading(false)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>AI Summary</DialogTitle>
          <DialogDescription>Generate an AI-powered summary of "{resource.title}"</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {!summary && !loading && (
            <div className="text-center p-6">
              <p className="mb-4 text-gray-600">
                Click the button below to generate a summary of this resource using AI.
              </p>
              <Button onClick={handleSummarize} className="bg-teal-600 hover:bg-teal-700">
                Generate Summary
              </Button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
              <p className="text-gray-600">Generating summary...</p>
            </div>
          )}

          {summary && !loading && (
            <Card className="p-4 bg-gray-50">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{summary}</p>
              </div>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
