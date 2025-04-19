"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, ChevronDown, FileText, Bookmark, User, Home, Book, HelpCircle, Info } from "lucide-react"
import Image from "next/image"

// Mock progress data - in a real app, this would come from a database
const userProgress = {
  // Chapter completion status (true = completed)
  completedChapters: {
    ch1: true,
    ch2: true,
    ch3: true,
    ch4: true,
    ch5: false,
    ch6: false,
    ch7: true,
    ch8: false,
    ch9: false,
    ch10: false,
    ch11: false,
    ch12: false,
    ch13: false,
    ch14: false,
  },
  // Section progress calculated based on completed chapters
  sectionProgress: {
    Introduction: 100,
    "I. Semiconductor Fundamentals": 50,
    "II. IC Design & EDA": 14,
    "III. Manufacturing Processes": 0,
    "IV. Advanced Topics & Technologies": 0,
    "V. Industry Trends & Careers": 0,
    "VI. Resources & Community": 0,
  },
}

// Add a helper function to calculate chapter completion status
const isChapterCompleted = (chapterId: string): boolean => {
  return userProgress.completedChapters[chapterId] || false
}

// Add a helper function to get section progress
const getSectionProgress = (sectionTitle: string): number => {
  return userProgress.sectionProgress[sectionTitle] || 0
}

interface SidebarProps {
  currentPath: string
}

// Updated handbook structure based on the provided content
const handbookSections = [
  {
    title: "Introduction",
    image: "/electric-flow.png",
    chapters: [
      { id: "ch1", title: "The Modern Semiconductor Era", order: 1 },
      { id: "ch2", title: "The Global Landscape", order: 2 },
    ],
  },
  {
    title: "I. Semiconductor Fundamentals",
    image: "/emerald-circuitry.png",
    chapters: [
      { id: "ch3", title: "Semiconductor Physics & Materials Science", order: 1 },
      { id: "ch4", title: "Core Semiconductor Devices", order: 2 },
      { id: "ch5", title: "Introduction to Digital Logic & Circuits", order: 3 },
      { id: "ch6", title: "Introduction to Analog Circuits", order: 4 },
    ],
  },
  {
    title: "II. IC Design & EDA",
    image: "/amethyst-flow.png",
    chapters: [
      { id: "ch7", title: "Hardware Description Languages (HDLs)", order: 1 },
      { id: "ch8", title: "Digital Design Flow & Methodologies", order: 2 },
      { id: "ch9", title: "Design Verification", order: 3 },
      { id: "ch10", title: "Physical Design & Layout", order: 4 },
      { id: "ch11", title: "Analog & Mixed-Signal Design Flow", order: 5 },
      { id: "ch12", title: "Design for Manufacturing (DFM) & Design for Test (DFT)", order: 6 },
      { id: "ch13", title: "Electronic Design Automation (EDA) Tools", order: 7 },
    ],
  },
  {
    title: "III. Manufacturing Processes",
    image: "/abstract-orange-cleanroom.png",
    chapters: [
      { id: "ch14", title: "Wafer Fabrication Overview & Cleanrooms", order: 1 },
      { id: "ch15", title: "Photolithography", order: 2 },
      { id: "ch16", title: "Etch & Deposition", order: 3 },
      { id: "ch17", title: "Doping & Thermal Processes", order: 4 },
      { id: "ch18", title: "Planarization & Interconnects", order: 5 },
      { id: "ch19", title: "Metrology, Inspection & Yield", order: 6 },
      { id: "ch20", title: "Assembly, Packaging & Test (Overview)", order: 7 },
    ],
  },
  {
    title: "IV. Advanced Topics & Technologies",
    image: "/crimson-circuitry.png",
    chapters: [
      { id: "ch21", title: "Advanced Transistor Architectures", order: 1 },
      { id: "ch22", title: "Memory Technologies Deep Dive", order: 2 },
      { id: "ch23", title: "Advanced Packaging & Heterogeneous Integration", order: 3 },
      { id: "ch24", title: "Compound Semiconductors & Advanced Materials", order: 4 },
      { id: "ch25", title: "Quantum Computing & Semiconductors", order: 5 },
      { id: "ch26", title: "AI/ML in Semiconductor Design & Manufacturing", order: 6 },
    ],
  },
  {
    title: "V. Industry Trends & Careers",
    image: "/abstract-yellow-trends.png",
    chapters: [
      { id: "ch27", title: "Technology Roadmaps & Scaling Challenges", order: 1 },
      { id: "ch28", title: "Market Dynamics & Geopolitics", order: 2 },
      { id: "ch29", title: "Industry Standards & Consortia", order: 3 },
      { id: "ch30", title: "Essential Skills for Semiconductor Professionals", order: 4 },
      { id: "ch31", title: "Educational Pathways & Continuous Learning", order: 5 },
    ],
  },
  {
    title: "VI. Resources & Community",
    image: "/interconnected-teal.png",
    chapters: [
      { id: "ch32", title: "Key Reference Books & Handbooks", order: 1 },
      { id: "ch33", title: "Essential Blogs & Newsletters", order: 2 },
      { id: "ch34", title: "Online Courses & Educational Platforms", order: 3 },
      { id: "ch35", title: "Open Source Tools & Communities", order: 4 },
    ],
  },
]

export function Sidebar({ currentPath }: SidebarProps) {
  // Initialize with first section open
  const initialOpenSections: Record<string, boolean> = {}
  handbookSections.forEach((section, index) => {
    initialOpenSections[section.title] = index === 0
  })

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialOpenSections)
  const [showCategoryGrid, setShowCategoryGrid] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [sidebarWidth, setSidebarWidth] = useState(264) // Default width
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)

  // Load saved width from localStorage on mount
  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebarWidth")
    if (savedWidth) {
      setSidebarWidth(Number.parseInt(savedWidth))
    }
  }, [])

  // Handle resize events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      // Calculate new width based on mouse position
      const newWidth = e.clientX

      // Set min and max constraints
      if (newWidth >= 200 && newWidth <= 400) {
        setSidebarWidth(newWidth)
        localStorage.setItem("sidebarWidth", newWidth.toString())
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = "default"
      document.body.style.userSelect = "auto"
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "ew-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const startResizing = () => {
    setIsResizing(true)
  }

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  const isChapterActive = (chapterId: string) => {
    return currentPath === `/handbook/${chapterId}`
  }

  const handleCategoryClick = (sectionTitle: string) => {
    // Toggle the section in the regular sidebar view
    toggleSection(sectionTitle)
    // Close the category grid
    setShowCategoryGrid(false)
  }

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col h-full bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 relative dark-mode-transition"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 p-4 pb-2">
        <Link href="/handbook" className="flex items-center mb-2">
          <h1 className="text-lg font-medium text-teal-600 dark:text-teal-400">Silicon Guide</h1>
        </Link>
        <Button variant="ghost" asChild className="w-full justify-start font-normal mb-1 h-9">
          <Link href="/handbook" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
            Handbook
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-gray-500 hover:text-teal-600 dark:hover:text-teal-400"
            onClick={() => setShowCategoryGrid(!showCategoryGrid)}
          >
            {showCategoryGrid ? "List View" : "Grid View"}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 pt-0">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
                Handbook
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-gray-500 hover:text-teal-600 dark:hover:text-teal-400"
                onClick={() => setShowCategoryGrid(!showCategoryGrid)}
              >
                {showCategoryGrid ? "List View" : "Grid View"}
              </Button>
            </div>

            {showCategoryGrid ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {handbookSections.map((section) => (
                  <div
                    key={section.title}
                    className="relative overflow-hidden rounded-md cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md dark:shadow-gray-900/30"
                    onClick={() => handleCategoryClick(section.title)}
                    onMouseEnter={() => setHoveredSection(section.title)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="relative h-24 w-full">
                      <Image
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        fill
                        className="object-cover dark:brightness-[0.85]"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all duration-200 dark:bg-opacity-60 dark:hover:bg-opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-2">
                        <span className="text-white text-xs font-medium text-center truncate w-full block">{section.title}</span>
                      </div>
                    </div>

                    {hoveredSection === section.title && (
                      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-1 dark:bg-opacity-80">
                        <span className="text-white text-xs font-medium mb-1 truncate w-full block">{section.title}</span>
                        <div className="text-white text-[10px] overflow-hidden max-h-16">
                          {section.chapters.slice(0, 3).map((chapter, idx) => (
                            <div key={idx} className="truncate">
                              #{idx + 1}: {chapter.title}
                            </div>
                          ))}
                          {section.chapters.length > 3 && (
                            <div className="text-gray-300">+{section.chapters.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {handbookSections.map((section) => (
                  <Collapsible
                    key={section.title}
                    open={openSections[section.title]}
                    onOpenChange={() => toggleSection(section.title)}
                    className="border border-transparent rounded-md overflow-hidden hover:border-gray-100 dark:hover:border-gray-800 transition-colors"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between font-medium h-10 px-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md text-gray-800 dark:text-gray-200"
                      >
                        <div className="flex flex-col items-start w-full">
                          <div className="flex justify-between w-full">
                            <span className="text-left font-semibold truncate max-w-[130px]">{section.title}</span>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                                {getSectionProgress(section.title)}%
                              </span>
                              {openSections[section.title] ? (
                                <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="h-4 w-4 opacity-70 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                          <div className="w-full mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-teal-500 h-1.5 rounded-full"
                              style={{ width: `${getSectionProgress(section.title)}%` }}
                            ></div>
                          </div>
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-3 space-y-1 mt-1 mb-2 border-l-2 border-gray-100 dark:border-gray-800 ml-3 max-h-60 overflow-y-auto pr-2">
                        {section.chapters.map((chapter) => (
                          <Button
                            key={chapter.id}
                            variant="ghost"
                            asChild
                            className={`w-full justify-start h-9 px-3 font-normal text-left hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md ${
                              isChapterActive(chapter.id)
                                ? "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300 font-medium"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <Link
                              href={`/handbook/${chapter.id}`}
                              className="w-full text-left truncate flex items-center"
                              title={chapter.title}
                            >
                              <div
                                className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center border ${
                                  isChapterCompleted(chapter.id)
                                    ? "bg-teal-500 border-teal-500"
                                    : "bg-white dark:bg-transparent border-gray-300 dark:border-gray-600"
                                }`}
                              >
                                {isChapterCompleted(chapter.id) && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                  >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )}
                              </div>
                              <span className="inline-block w-6 text-xs text-gray-500 dark:text-gray-400">
                                {chapter.order}.
                              </span>
                              <span className="truncate max-w-[120px]">{chapter.title}</span>
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              Reference
            </h2>

            <div className="space-y-1">
              <Button
                variant="ghost"
                asChild
                className="w-full justify-start font-normal h-9 px-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md"
              >
                <Link href="/glossary" className="flex items-center">
                  <Book className="mr-2 h-4 w-4" />
                  Glossary
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              Your Content
            </h2>

            <Button
              variant="ghost"
              asChild
              className={`w-full justify-start font-normal h-9 px-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md ${currentPath === "/notes" ? "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300 font-medium" : "text-gray-700 dark:text-gray-300"}`}
            >
              <Link href="/notes" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Notes
              </Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className={`w-full justify-start font-normal h-9 px-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md ${currentPath === "/annotations" ? "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300 font-medium" : "text-gray-700 dark:text-gray-300"}`}
            >
              <Link href="/annotations" className="flex items-center">
                <Bookmark className="mr-2 h-4 w-4" />
                Annotations
              </Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className={`w-full justify-start font-normal h-9 px-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md ${currentPath === "/profile" ? "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300 font-medium" : "text-gray-700 dark:text-gray-300"}`}
            >
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-1">
              <Button
                variant="ghost"
                asChild
                className="w-full justify-start font-normal h-9 px-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md"
              >
                <Link href="/about" className="flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  About
                </Link>
              </Button>

              <Button
                variant="ghost"
                asChild
                className="w-full justify-start font-normal h-9 px-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors rounded-md"
              >
                <Link href="/faq" className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Resize handle */}
      <div
        ref={resizeHandleRef}
        className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-teal-500 group"
        onMouseDown={startResizing}
      >
        <div className="absolute top-1/2 right-0 w-4 h-8 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1 h-8 bg-teal-500 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
