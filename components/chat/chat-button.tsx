"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChatBubbleIcon } from "@/components/icons/chat-bubble-icon"
import { X, Sparkles } from "lucide-react"
import { ChatPanel } from "@/components/chat/chat-panel"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState<string | undefined>()
  const [currentResourceId, setCurrentResourceId] = useState<string | undefined>()
  const pathname = usePathname()

  // Extract context from URL
  useEffect(() => {
    if (!pathname) return

    // Extract chapter ID
    const chapterMatch = pathname.match(/\/handbook\/([^/]+)/)
    if (chapterMatch && chapterMatch[1]) {
      setCurrentChapterId(chapterMatch[1])
      setCurrentResourceId(undefined)
      return
    }

    // Extract resource ID if viewing a specific resource
    const resourceMatch = pathname.match(/\/resources\/([^/]+)/)
    if (resourceMatch && resourceMatch[1]) {
      setCurrentResourceId(resourceMatch[1])
      setCurrentChapterId(undefined)
      return
    }

    // Reset if not on a chapter or resource page
    setCurrentChapterId(undefined)
    setCurrentResourceId(undefined)
  }, [pathname])

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`fixed bottom-6 right-6 z-20 rounded-full w-12 h-12 p-0 shadow-md transition-all duration-300 ${
                isChatOpen
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
              aria-label={isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
            >
              {isChatOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <div className="relative">
                  <ChatBubbleIcon className="h-5 w-5" />
                  <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
                </div>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isChatOpen ? "Close assistant" : "Open AI assistant"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isChatOpen && (
        <ChatPanel
          onClose={() => setIsChatOpen(false)}
          currentChapterId={currentChapterId}
          currentResourceId={currentResourceId}
        />
      )}
    </>
  )
}
