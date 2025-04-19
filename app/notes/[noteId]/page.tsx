import { EditNotePage } from "@/components/notes/edit-note-page"

export default function EditNote({ params }: { params: { noteId: string } }) {
  return <EditNotePage noteId={params.noteId} />
}
