"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, Save } from "lucide-react"
import { NoteEditor } from "@/components/notes/note-editor"

// Mock function to get note data
const getNoteData = (noteId: string) => {
  // This would be a database call in a real app
  const mockNotes = {
    note1: {
      title: "Notes on Semiconductor Physics",
      content:
        "<p>Key points about semiconductor physics:</p><ul><li>Semiconductors have conductivity between conductors and insulators</li><li>Silicon is the most common semiconductor material</li><li>Doping changes the conductivity properties</li></ul>",
      chapterId: "ch3",
      resourceId: "res5",
      createdAt: "2023-06-15T10:30:00Z",
      chapterTitle: "Semiconductor Physics & Materials",
      resourceTitle: "Introduction to Semiconductor Physics",
    },
    note2: {
      title: "IC Design Flow Summary",
      content:
        "<p>The IC design flow consists of several key stages:</p><ol><li>System-level specification</li><li>Architectural design</li><li>RTL design (Verilog/VHDL)</li><li>Logic Synthesis</li><li>Physical Design</li><li>Verification</li><li>Tapeout</li></ol>",
      chapterId: "ch8",
      resourceId: null,
      createdAt: "2023-06-20T14:45:00Z",
      chapterTitle: "The IC Design Flow: From Concept to GDSII",
      resourceTitle: null,
    },
    note3: {
      title: "Global Semiconductor Market Trends",
      content:
        "<p>Important market trends to remember:</p><ul><li>Asia dominates manufacturing capacity</li><li>AI and automotive are driving growth</li><li>Supply chain resilience is becoming critical</li><li>New fabs require massive capital investment</li></ul>",
      chapterId: "ch2",
      resourceId: "res3",
      createdAt: "2023-06-25T09:15:00Z",
      chapterTitle: "The Global Semiconductor Landscape",
      resourceTitle: "Global Semiconductor Market Analysis",
    },
  }

  return mockNotes[noteId as keyof typeof mockNotes]
}

interface EditNotePageProps {
  noteId: string
}

export function EditNotePage({ noteId }: EditNotePageProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [chapterInfo, setChapterInfo] = useState<any>(null)
  const [resourceInfo, setResourceInfo] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch note data
    const noteData = getNoteData(noteId)
    if (noteData) {
      setTitle(noteData.title)
      setContent(noteData.content)

      if (noteData.chapterId && noteData.chapterTitle) {
        setChapterInfo({
          id: noteData.chapterId,
          title: noteData.chapterTitle,
        })
      }

      if (noteData.resourceId && noteData.resourceTitle) {
        setResourceInfo({
          id: noteData.resourceId,
          title: noteData.resourceTitle,
        })
      }
    }
  }, [noteId])

  const handleSaveNote = async () => {
    setSaving(true)

    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Note saved",
        description: "Your note has been successfully saved",
      })
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" asChild className="mb-2">
          <Link href="/notes" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Notes
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="text-xl font-bold border-none px-0 focus-visible:ring-0"
          />

          {(chapterInfo || resourceInfo) && (
            <div className="text-sm text-gray-500 mt-2">
              {chapterInfo && (
                <div className="flex items-center gap-1">
                  <span>Chapter:</span>
                  <Link href={`/handbook/${chapterInfo.id}`} className="text-teal-600 hover:text-teal-700">
                    {chapterInfo.title}
                  </Link>
                </div>
              )}
              {resourceInfo && (
                <div className="flex items-center gap-1 mt-1">
                  <span>Resource:</span>
                  <span className="text-teal-600">{resourceInfo.title}</span>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <NoteEditor initialContent={content} onChange={setContent} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
          <Button onClick={handleSaveNote} disabled={saving} className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Note"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
