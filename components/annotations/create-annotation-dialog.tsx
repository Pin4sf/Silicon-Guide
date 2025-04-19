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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface CreateAnnotationDialogProps {
  isOpen: boolean
  onClose: () => void
  resource: any
}

export function CreateAnnotationDialog({ isOpen, onClose, resource }: CreateAnnotationDialogProps) {
  const [selectedText, setSelectedText] = useState("")
  const [comment, setComment] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    if (!selectedText.trim()) {
      toast({
        title: "Text selection required",
        description: "Please select some text to annotate",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate saving annotation
    setTimeout(() => {
      toast({
        title: "Annotation saved",
        description: "Your annotation has been saved successfully",
      })
      setIsSaving(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Annotation</DialogTitle>
          <DialogDescription>Highlight text and add optional comments</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Selected Text</label>
            <Textarea
              placeholder="Enter or paste the text you want to annotate"
              value={selectedText}
              onChange={(e) => setSelectedText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Comments (Optional)</label>
            <Textarea
              placeholder="Add your thoughts or notes about this text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700">
            {isSaving ? "Saving..." : "Save Annotation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
