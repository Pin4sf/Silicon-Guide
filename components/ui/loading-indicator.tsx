import { Loader2 } from "lucide-react"

interface LoadingIndicatorProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingIndicator({ message = "Loading content...", size = "md" }: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-teal-600 mb-4`} />
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  )
}
