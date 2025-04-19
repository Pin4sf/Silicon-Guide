import { Loader2 } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600 mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
      </div>
    </div>
  )
}
