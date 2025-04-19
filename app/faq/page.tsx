"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { ChevronLeft, HelpCircle } from "lucide-react"

export default function FAQPage() {
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

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/handbook" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Handbook
            </Link>
          </Button>
        </div>

        <div className="flex items-center mb-6">
          <HelpCircle className="h-6 w-6 mr-2 text-teal-600" />
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Silicon Guide?</AccordionTrigger>
                <AccordionContent>
                  Silicon Guide is a comprehensive learning platform for semiconductor technology. It provides a
                  structured handbook, interactive features, and AI-assisted learning tools to help users understand
                  semiconductor concepts from basic physics to advanced manufacturing techniques.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Who is Silicon Guide for?</AccordionTrigger>
                <AccordionContent>
                  Silicon Guide is designed for students, professionals, and enthusiasts who want to learn about
                  semiconductor technology. Whether you're a beginner looking to understand the basics or an experienced
                  professional seeking to refresh your knowledge, Silicon Guide offers content at various difficulty
                  levels to meet your needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is Silicon Guide free to use?</AccordionTrigger>
                <AccordionContent>
                  Silicon Guide offers both free and premium content. The basic handbook and many features are available
                  for free, while some advanced features and exclusive content may require a subscription. Check our
                  pricing page for more details on our subscription plans.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Content & Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-4">
                <AccordionTrigger>How is the handbook content organized?</AccordionTrigger>
                <AccordionContent>
                  The handbook is organized into sections and chapters, starting with fundamental concepts and
                  progressing to more advanced topics. Each chapter includes an overview, key topics, learning
                  objectives, and curated resources. You can navigate through the content sequentially or jump to
                  specific topics of interest.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I track my progress?</AccordionTrigger>
                <AccordionContent>
                  Silicon Guide automatically tracks your progress as you complete chapters. You can view your progress
                  on your profile page, which shows completed chapters, time spent learning, and achievement milestones.
                  You can also manually mark chapters as completed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Can I download content for offline reading?</AccordionTrigger>
                <AccordionContent>
                  Yes, premium subscribers can download chapters as PDF files for offline reading. This feature allows
                  you to continue learning even without an internet connection. Note that interactive features like the
                  AI tutor require an online connection.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Features & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-7">
                <AccordionTrigger>What is the AI Tutor?</AccordionTrigger>
                <AccordionContent>
                  The AI Tutor is an intelligent assistant that can answer your questions about semiconductor topics,
                  explain complex concepts, and provide personalized guidance. It's context-aware, meaning it
                  understands which chapter you're reading and can provide relevant explanations and examples.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>How do I create and organize notes?</AccordionTrigger>
                <AccordionContent>
                  You can create notes while reading any chapter by clicking the "Add Chapter Note" button. Notes are
                  automatically associated with the chapter you're reading, but you can also create standalone notes.
                  All your notes are accessible from the Notes page, where you can organize, edit, and search through
                  them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>What is the Discover tool?</AccordionTrigger>
                <AccordionContent>
                  The Discover tool helps you find relevant resources both within the handbook and from external
                  sources. It uses AI to understand your query and provide the most helpful results, including handbook
                  chapters, academic papers, articles, and videos related to your search topic.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account & Technical Support</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-10">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  You can create an account by clicking the "Sign Up" button on the homepage. You can sign up using your
                  email address and password or use Google authentication for a quicker setup. After creating your
                  account, you'll have access to personalized features like progress tracking and note-taking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger>I forgot my password. How do I reset it?</AccordionTrigger>
                <AccordionContent>
                  If you forgot your password, click on the "Forgot password?" link on the login page. Enter your email
                  address, and we'll send you a link to reset your password. Follow the instructions in the email to
                  create a new password and regain access to your account.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger>How do I get technical support?</AccordionTrigger>
                <AccordionContent>
                  For technical support, you can contact our support team at support@siliconguide.com. Please provide
                  detailed information about the issue you're experiencing, including any error messages and the steps
                  to reproduce the problem. Our team will respond as soon as possible to help resolve your issue.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center mb-10">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Didn't find what you're looking for? Contact us directly.
          </p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link href="mailto:support@siliconguide.com">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
