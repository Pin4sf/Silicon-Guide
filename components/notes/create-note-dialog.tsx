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
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { NoteEditor } from "@/components/notes/note-editor"

interface CreateNoteDialogProps {
  isOpen: boolean
  onClose: () => void
  chapterId?: string
  resourceId?: string
  initialTitle?: string
}

export function CreateNoteDialog({ isOpen, onClose, chapterId, resourceId, initialTitle = "" }: CreateNoteDialogProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate saving note
    setTimeout(() => {
      toast({
        title: "Note created",
        description: "Your note has been saved successfully",
      })
      setIsSaving(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>Add a note to help with your learning</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />
          </div>

          <NoteEditor initialContent="" onChange={setContent} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700">
            {isSaving ? "Saving..." : "Save Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
