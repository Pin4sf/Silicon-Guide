"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Bookmark, ChevronRight } from "lucide-react"

// Mock data for recent chapters
const recentChapters = [
  { id: "ch1", title: "The Modern Semiconductor Era" },
  { id: "ch2", title: "The Global Landscape" },
  { id: "ch3", title: "Semiconductor Physics & Materials" },
]

// Mock data for recent notes
const recentNotes = [
  { id: "note1", title: "Notes on Semiconductor Physics" },
  { id: "note2", title: "IC Design Flow Summary" },
]

export function HandbookWelcome() {
  const [userName] = useState("John")

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {userName}!</h1>
        <p className="text-gray-600 max-w-3xl">
          Explore the comprehensive semiconductor handbook, take notes, and use our AI tutor to enhance your learning
          experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-teal-600" />
              Start Learning
            </CardTitle>
            <CardDescription>Begin your semiconductor journey</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              The handbook is organized into sections covering everything from basic physics to advanced manufacturing
              techniques.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Suggested chapters:</h3>
              {recentChapters.map((chapter) => (
                <Button key={chapter.id} variant="outline" asChild className="w-full justify-between">
                  <Link href={`/handbook/${chapter.id}`}>
                    {chapter.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/handbook/ch1">Start with Chapter 1</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-teal-600" />
              Your Notes
            </CardTitle>
            <CardDescription>Access your personal notes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Take and organize notes as you learn. Your notes are saved and can be accessed anytime.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent notes:</h3>
              {recentNotes.map((note) => (
                <Button key={note.id} variant="outline" asChild className="w-full justify-between">
                  <Link href={`/notes/${note.id}`}>
                    {note.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/notes">View All Notes</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Bookmark className="h-5 w-5 mr-2 text-teal-600" />
              AI Tutor
            </CardTitle>
            <CardDescription>Get personalized assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Our AI tutor can answer your questions, explain concepts, and help you navigate the handbook.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Try asking about:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Semiconductor physics basics</li>
                <li>IC design process</li>
                <li>Manufacturing techniques</li>
                <li>Personalized learning paths</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                // This will be handled by the chat button in the layout
                const chatButton = document.querySelector('[aria-label="Open AI Tutor"]') as HTMLButtonElement
                if (chatButton) chatButton.click()
              }}
            >
              Chat with AI Tutor
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">About Silicon Guide</h2>
        <div className="prose max-w-none">
          <p>
            Silicon Guide is a comprehensive learning platform for semiconductor technology, covering everything from
            basic physics to advanced manufacturing techniques.
          </p>
          <p>
            This handbook is designed to be a complete resource for students, professionals, and anyone interested in
            understanding the fascinating world of semiconductors.
          </p>
          <p>
            Use the sidebar navigation to explore different chapters, take notes as you learn, and leverage our AI tutor
            to enhance your understanding.
          </p>
        </div>
      </div>
    </div>
  )
}
