"use client"

import { useEffect, useRef } from "react"

interface NoteEditorProps {
  initialContent: string
  onChange: (content: string) => void
}

export function NoteEditor({ initialContent, onChange }: NoteEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a simplified rich text editor
    // In a real application, you would use a proper rich text editor like TipTap, Slate, or CKEditor
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent
      editorRef.current.focus()

      const handleInput = () => {
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML)
        }
      }

      editorRef.current.addEventListener("input", handleInput)

      return () => {
        editorRef.current?.removeEventListener("input", handleInput)
      }
    }
  }, [initialContent, onChange])

  return (
    <div className="border rounded-md p-3 min-h-[200px] focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
      <div
        ref={editorRef}
        contentEditable
        className="outline-none min-h-[200px] prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: initialContent }}
      />
    </div>
  )
}
