"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { LoadingScreen } from "@/components/ui/loading-screen"

interface AuthCheckProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!authenticated) {
    return fallback || null
  }

  return <>{children}</>
}
