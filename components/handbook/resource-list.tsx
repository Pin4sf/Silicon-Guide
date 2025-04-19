"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, FileText, BookmarkPlus, Sparkles, Video, BookOpen, Newspaper, GraduationCap } from "lucide-react"
import { CreateNoteDialog } from "@/components/notes/create-note-dialog"
import { CreateAnnotationDialog } from "@/components/annotations/create-annotation-dialog"
import { ResourceSummarizeDialog } from "@/components/ai/resource-summarize-dialog"
import type { Resource } from "@/lib/handbook-data"
import { Skeleton } from "@/components/ui/skeleton"

interface ResourceListProps {
  resources: Resource[]
}

export function ResourceList({ resources }: ResourceListProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const [isCreateAnnotationOpen, setIsCreateAnnotationOpen] = useState(false)
  const [isSummarizeOpen, setIsSummarizeOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Group resources by content type
  const groupedResources: Record<string, Resource[]> = {}
  resources.forEach((resource) => {
    if (!groupedResources[resource.contentType]) {
      groupedResources[resource.contentType] = []
    }
    groupedResources[resource.contentType].push(resource)
  })

  const contentTypes = Object.keys(groupedResources)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType.toLowerCase()) {
      case "article":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "paper abstract":
        return <BookOpen className="h-4 w-4" />
      case "course":
        return <GraduationCap className="h-4 w-4" />
      case "guide":
        return <FileText className="h-4 w-4" />
      case "blog":
        return <Newspaper className="h-4 w-4" />
      case "tutorial":
        return <GraduationCap className="h-4 w-4" />
      case "technical blog":
        return <Newspaper className="h-4 w-4" />
      case "book chapter":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleResourceAction = (resource: Resource, action: "note" | "annotate" | "summarize") => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      setSelectedResource(resource)
      setIsLoading(false)

      if (action === "note") {
        setIsCreateNoteOpen(true)
      } else if (action === "annotate") {
        setIsCreateAnnotationOpen(true)
      } else if (action === "summarize") {
        setIsSummarizeOpen(true)
      }
    }, 300)
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6">Curated Resources</h2>

      {contentTypes.length > 0 ? (
        <Tabs defaultValue={contentTypes[0]} className="w-full">
          <TabsList className="mb-6">
            {contentTypes.map((type) => (
              <TabsTrigger key={type} value={type} className="flex items-center gap-1">
                {getContentTypeIcon(type)}
                {type}
              </TabsTrigger>
            ))}
          </TabsList>

          {contentTypes.map((type) => (
            <TabsContent key={type} value={type} className="space-y-6 mt-0">
              {groupedResources[type].map((resource) => (
                <div key={resource.id} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium mb-1">{resource.title}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{resource.sourceName}</div>
                    </div>
                    <Badge className={getDifficultyColor(resource.difficulty)}>{resource.difficulty}</Badge>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed my-4">{resource.summary}</p>

                  {resource.keywords && resource.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.keywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {resource.accessNotes && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
                      <strong>Access Notes:</strong> {resource.accessNotes}
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <Button asChild variant="outline" size="sm" className="text-sm">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Resource
                      </a>
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResourceAction(resource, "summarize")}
                        disabled={isLoading}
                        className="flex items-center text-sm"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Summarize
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResourceAction(resource, "annotate")}
                        disabled={isLoading}
                        className="flex items-center text-sm"
                      >
                        <BookmarkPlus className="mr-2 h-4 w-4" />
                        Annotate
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResourceAction(resource, "note")}
                        disabled={isLoading}
                        className="flex items-center text-sm"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Take Notes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No resources available for this chapter yet.
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/5 dark:bg-black/20 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </Card>
        </div>
      )}

      {selectedResource && (
        <>
          <CreateNoteDialog
            isOpen={isCreateNoteOpen}
            onClose={() => setIsCreateNoteOpen(false)}
            resourceId={selectedResource.id}
            initialTitle={`Notes on ${selectedResource.title}`}
          />

          <CreateAnnotationDialog
            isOpen={isCreateAnnotationOpen}
            onClose={() => setIsCreateAnnotationOpen(false)}
            resource={selectedResource}
          />

          <ResourceSummarizeDialog
            isOpen={isSummarizeOpen}
            onClose={() => setIsSummarizeOpen(false)}
            resource={selectedResource}
          />
        </>
      )}
    </div>
  )
}
