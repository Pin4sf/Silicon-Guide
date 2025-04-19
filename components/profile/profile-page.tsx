"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { X, Sparkles } from "lucide-react"
import { LearningPathGenerator } from "@/components/ai/learning-path-generator"

export function ProfilePage() {
  const [profile, setProfile] = useState({
    displayName: "John Doe",
    email: "john@example.com",
    learningGoals: ["Learn semiconductor physics", "Understand IC design flow"],
    currentKnowledgeAreas: ["Basic electronics", "Programming"],
  })
  const [newGoal, setNewGoal] = useState("")
  const [newKnowledgeArea, setNewKnowledgeArea] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleAddGoal = () => {
    if (!newGoal.trim()) return
    setProfile({
      ...profile,
      learningGoals: [...profile.learningGoals, newGoal.trim()],
    })
    setNewGoal("")
  }

  const handleRemoveGoal = (index: number) => {
    const updatedGoals = [...profile.learningGoals]
    updatedGoals.splice(index, 1)
    setProfile({
      ...profile,
      learningGoals: updatedGoals,
    })
  }

  const handleAddKnowledgeArea = () => {
    if (!newKnowledgeArea.trim()) return
    setProfile({
      ...profile,
      currentKnowledgeAreas: [...profile.currentKnowledgeAreas, newKnowledgeArea.trim()],
    })
    setNewKnowledgeArea("")
  }

  const handleRemoveKnowledgeArea = (index: number) => {
    const updatedAreas = [...profile.currentKnowledgeAreas]
    updatedAreas.splice(index, 1)
    setProfile({
      ...profile,
      currentKnowledgeAreas: updatedAreas,
    })
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)

    // Simulate saving profile
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Update your profile information and learning preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile.email} disabled />
              <p className="text-sm text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label>Learning Goals</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.learningGoals.map((goal, index) => (
                  <Badge
                    key={index}
                    className="bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-100"
                  >
                    {goal}
                    <button
                      onClick={() => handleRemoveGoal(index)}
                      className="ml-1 text-teal-800 hover:text-teal-900 dark:text-teal-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a learning goal..."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddGoal()}
                />
                <Button onClick={handleAddGoal} type="button">
                  Add
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Examples: "Learn semiconductor physics", "Understand IC design flow"
              </p>
            </div>

            <div className="space-y-2">
              <Label>Current Knowledge Areas</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.currentKnowledgeAreas.map((area, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100"
                  >
                    {area}
                    <button
                      onClick={() => handleRemoveKnowledgeArea(index)}
                      className="ml-1 text-blue-800 hover:text-blue-900 dark:text-blue-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a knowledge area..."
                  value={newKnowledgeArea}
                  onChange={(e) => setNewKnowledgeArea(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddKnowledgeArea()}
                />
                <Button onClick={handleAddKnowledgeArea} type="button">
                  Add
                </Button>
              </div>
              <p className="text-sm text-gray-500">Examples: "Digital design", "CMOS technology", "Photolithography"</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full bg-teal-600 hover:bg-teal-700">
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                Personalized Learning
              </CardTitle>
              <CardDescription>Get AI-generated recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our AI can analyze your learning goals and current knowledge to create a personalized learning path
                through the handbook.
              </p>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-100 dark:border-amber-900">
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Your Learning Profile</h4>
                <div className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
                  <p>
                    <strong>Goals:</strong> {profile.learningGoals.join(", ")}
                  </p>
                  <p>
                    <strong>Knowledge:</strong> {profile.currentKnowledgeAreas.join(", ")}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <LearningPathGenerator
                buttonVariant="default"
                className="w-full bg-teal-600 hover:bg-teal-700"
                learningGoals={profile.learningGoals}
                currentKnowledgeAreas={profile.currentKnowledgeAreas}
              />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Analytics</CardTitle>
              <CardDescription>Track your progress through the handbook</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Handbook Completion</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Resources Explored</span>
                    <span className="font-medium">12/45</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "27%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Notes Created</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Annotations Made</span>
                    <span className="font-medium">15</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Most Visited Topics</h4>
                  <div className="space-y-1">
                    <div className="text-xs flex justify-between">
                      <span>Semiconductor Physics</span>
                      <span>12 visits</span>
                    </div>
                    <div className="text-xs flex justify-between">
                      <span>IC Design Flow</span>
                      <span>8 visits</span>
                    </div>
                    <div className="text-xs flex justify-between">
                      <span>MOSFET Operation</span>
                      <span>6 visits</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
