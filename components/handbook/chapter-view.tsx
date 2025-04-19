"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, BookOpen, FileText, CheckCircle } from "lucide-react"
import { CreateNoteDialog } from "@/components/notes/create-note-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Chapter } from "@/lib/handbook-data"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface ChapterViewProps {
  chapter: Chapter
}

export function ChapterView({ chapter }: ChapterViewProps) {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  // Add this function inside the component to access the toast
  const markChapterAsCompleted = (chapterId: string) => {
    // This would update the database in a real application
    console.log(`Marking chapter ${chapterId} as completed`)
    // Show a toast notification
    toast({
      title: "Progress Updated",
      description: "Chapter marked as completed",
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{chapter.sectionTitle}</div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 mb-6">{chapter.title}</h1>

        <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keyTopics">Key Topics</TabsTrigger>
            <TabsTrigger value="learningObjectives">Learning Objectives</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-0">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed">{chapter.introductoryText}</p>
            </div>
          </TabsContent>
          <TabsContent value="keyTopics" className="mt-0">
            {chapter.keyTopics && chapter.keyTopics.length > 0 ? (
              <div className="space-y-4">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {chapter.keyTopics.map((topic, index) => (
                    <li key={index} className="leading-relaxed">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">Key topics will be available soon.</div>
            )}
          </TabsContent>
          <TabsContent value="learningObjectives" className="mt-0">
            {chapter.learningObjectives && chapter.learningObjectives.length > 0 ? (
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  After completing this chapter, you will be able to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {chapter.learningObjectives.map((objective, index) => (
                    <li key={index} className="leading-relaxed">
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">Learning objectives will be available soon.</div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/glossary`} className="flex items-center text-sm">
                <BookOpen className="mr-2 h-4 w-4" />
                View Glossary
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/notes`} className="flex items-center text-sm">
                <FileText className="mr-2 h-4 w-4" />
                My Notes
              </Link>
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => markChapterAsCompleted(chapter.id)}
              className="flex items-center text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 border-teal-200 dark:border-teal-900/50 hover:bg-teal-50 dark:hover:bg-teal-900/20"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
            <Button variant="outline" onClick={() => setIsCreateNoteOpen(true)} className="flex items-center text-sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Chapter Note
            </Button>
          </div>
        </div>

        <CreateNoteDialog
          isOpen={isCreateNoteOpen}
          onClose={() => setIsCreateNoteOpen(false)}
          chapterId={chapter.id}
          initialTitle={`Notes on ${chapter.title}`}
        />
      </div>
    </div>
  )
}
