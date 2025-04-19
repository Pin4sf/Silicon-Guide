"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, FileText, ExternalLink } from "lucide-react"

// Mock notes data
const mockNotes = [
  {
    id: "note1",
    title: "Notes on Semiconductor Physics",
    content:
      "<p>Key points about semiconductor physics:</p><ul><li>Semiconductors have conductivity between conductors and insulators</li><li>Silicon is the most common semiconductor material</li><li>Doping changes the conductivity properties</li></ul>",
    chapterId: "ch3",
    resourceId: "res5",
    createdAt: "2023-06-15T10:30:00Z",
    chapterTitle: "Semiconductor Physics & Materials",
    resourceTitle: "Introduction to Semiconductor Physics",
  },
  {
    id: "note2",
    title: "IC Design Flow Summary",
    content:
      "<p>The IC design flow consists of several key stages:</p><ol><li>System-level specification</li><li>Architectural design</li><li>RTL design (Verilog/VHDL)</li><li>Logic Synthesis</li><li>Physical Design</li><li>Verification</li><li>Tapeout</li></ol>",
    chapterId: "ch8",
    resourceId: null,
    createdAt: "2023-06-20T14:45:00Z",
    chapterTitle: "The IC Design Flow: From Concept to GDSII",
    resourceTitle: null,
  },
  {
    id: "note3",
    title: "Global Semiconductor Market Trends",
    content:
      "<p>Important market trends to remember:</p><ul><li>Asia dominates manufacturing capacity</li><li>AI and automotive are driving growth</li><li>Supply chain resilience is becoming critical</li><li>New fabs require massive capital investment</li></ul>",
    chapterId: "ch2",
    resourceId: "res3",
    createdAt: "2023-06-25T09:15:00Z",
    chapterTitle: "The Global Semiconductor Landscape",
    resourceTitle: "Global Semiconductor Market Analysis",
  },
]

export function NotesPage() {
  const [notes, setNotes] = useState(mockNotes)
  const { toast } = useToast()

  const handleDeleteNote = async (noteId: string) => {
    // Simulate deleting note
    setNotes(notes.filter((note) => note.id !== noteId))
    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Notes</h1>
        <p className="text-gray-600">Access and manage your notes from across the handbook</p>
      </div>

      {notes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No notes yet</h3>
            <p className="text-gray-500 text-center mt-2">
              Start taking notes while reading chapters or exploring resources
            </p>
            <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
              <Link href="/handbook">Browse Handbook</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Card key={note.id} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <CardDescription>{new Date(note.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="prose prose-sm max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: note.content.substring(0, 150) + (note.content.length > 150 ? "..." : ""),
                    }}
                  />
                </div>

                {(note.chapterId || note.resourceId) && (
                  <div className="mt-4 text-sm text-gray-500">
                    {note.chapterId && note.chapterTitle && (
                      <div className="flex items-center gap-1">
                        <span>Chapter:</span>
                        <Link
                          href={`/handbook/${note.chapterId}`}
                          className="text-teal-600 hover:text-teal-700 flex items-center"
                        >
                          {note.chapterTitle}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                    )}
                    {note.resourceId && note.resourceTitle && (
                      <div className="flex items-center gap-1 mt-1">
                        <span>Resource:</span>
                        <span className="text-teal-600">{note.resourceTitle}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/notes/${note.id}`}>View & Edit</Link>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Note</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this note? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteNote(note.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
