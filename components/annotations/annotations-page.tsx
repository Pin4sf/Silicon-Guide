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
import { Trash2, BookmarkIcon, ExternalLink } from "lucide-react"

// Mock annotations data
const mockAnnotations = [
  {
    id: "anno1",
    resourceId: "res5",
    resourceTitle: "Introduction to Semiconductor Physics",
    resourceUrl: "https://example.com/intro-semiconductor-physics",
    selectedText: "Semiconductors have conductivity between conductors and insulators",
    comment: "This is the fundamental property that makes semiconductors useful for electronics",
    createdAt: "2023-06-15T11:15:00Z",
  },
  {
    id: "anno2",
    resourceId: "res6",
    resourceTitle: "Semiconductor Materials: Silicon vs. Germanium",
    resourceUrl: "https://example.com/semiconductor-materials",
    selectedText: "Silicon has a bandgap of 1.12 eV at room temperature, while germanium has a bandgap of 0.67 eV",
    comment: "The wider bandgap of silicon makes it more stable at higher temperatures",
    createdAt: "2023-06-18T09:30:00Z",
  },
  {
    id: "anno3",
    resourceId: "res3",
    resourceTitle: "Global Semiconductor Market Analysis",
    resourceUrl: "https://example.com/semiconductor-market",
    selectedText: "The global semiconductor market is projected to reach $1 trillion by 2030",
    comment: "",
    createdAt: "2023-06-22T14:45:00Z",
  },
]

export function AnnotationsPage() {
  const [annotations, setAnnotations] = useState(mockAnnotations)
  const { toast } = useToast()

  const handleDeleteAnnotation = async (annotationId: string) => {
    // Simulate deleting annotation
    setAnnotations(annotations.filter((annotation) => annotation.id !== annotationId))
    toast({
      title: "Annotation deleted",
      description: "Your annotation has been successfully deleted",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Annotations</h1>
        <p className="text-gray-600">Access and manage your highlights and annotations from across the handbook</p>
      </div>

      {annotations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <BookmarkIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No annotations yet</h3>
            <p className="text-gray-500 text-center mt-2">
              Start highlighting and annotating text while exploring resources
            </p>
            <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
              <Link href="/handbook">Browse Handbook</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {annotations.map((annotation) => (
            <Card key={annotation.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{annotation.resourceTitle}</CardTitle>
                <CardDescription>{new Date(annotation.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-teal-200 pl-4 italic text-gray-700">
                  {annotation.selectedText}
                </blockquote>

                {annotation.comment && (
                  <div className="mt-2 text-gray-600">
                    <p>{annotation.comment}</p>
                  </div>
                )}

                <div className="mt-4 text-sm">
                  <a
                    href={annotation.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 flex items-center"
                  >
                    View Source
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Annotation</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this annotation? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteAnnotation(annotation.id)}
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
