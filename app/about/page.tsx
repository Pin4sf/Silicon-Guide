"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, BookOpen, Users, Sparkles, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/s6cnifanbp7ijdbvjrlw-wdhAYmaZisbAaAJeiJFQncu6KVNVzK.png')",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/handbook" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Handbook
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-6">About Silicon Guide</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
          <p className="text-lg">
            Silicon Guide is a comprehensive learning platform dedicated to semiconductor technology, designed to make
            complex technical concepts accessible to students, professionals, and enthusiasts alike.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to democratize semiconductor knowledge by providing a structured, interactive learning
            experience that bridges the gap between theoretical concepts and practical applications. We believe that
            understanding semiconductor technology is crucial in today's digital world, and we're committed to making
            this knowledge accessible to everyone.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What Makes Silicon Guide Different</h2>
          <p>Silicon Guide combines traditional handbook content with modern learning tools:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-teal-600" />
                Comprehensive Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                From basic semiconductor physics to advanced manufacturing techniques, our handbook covers the entire
                spectrum of semiconductor technology with clear explanations and practical examples.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-teal-600" />
                AI-Powered Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI tutor provides personalized assistance, answers questions, generates custom learning paths, and
                helps you navigate complex topics at your own pace.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-teal-600" />
                Interactive Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Take notes, create annotations, track your progress, and engage with interactive elements that reinforce
                your understanding of semiconductor concepts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-teal-600" />
                Curated Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Access a carefully selected collection of external resources, including articles, videos, papers, and
                courses that complement the handbook content.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            Silicon Guide is developed by a team of semiconductor experts, educators, and software engineers passionate
            about making technical education more accessible and engaging. Our contributors include industry
            professionals with decades of experience in semiconductor design, manufacturing, and research.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>We welcome your feedback, questions, and suggestions. Please reach out to us at:</p>
          <p className="font-medium">contact@siliconguide.com</p>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Silicon Guide. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
