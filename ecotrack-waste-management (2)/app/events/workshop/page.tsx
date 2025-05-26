"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle, Recycle } from "lucide-react"
import Link from "next/link"

export default function WorkshopEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    project: "",
  })
  const [isRegistered, setIsRegistered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setIsRegistered(true)
      const currentPoints = Number.parseInt(localStorage.getItem("ecotrack-points") || "0")
      localStorage.setItem("ecotrack-points", (currentPoints + 30).toString())
    }, 1000)
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              You're registered for the Upcycling Workshop. Check your email for materials list.
            </p>
            <p className="text-blue-600 font-semibold mb-6">+30 points earned!</p>
            <Link href="/">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Upcycling Workshop
          </h1>
          <p className="text-gray-600">Learn to transform waste into wonderful creations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Recycle className="w-6 h-6 text-blue-500" />
                <span>Workshop Details</span>
              </CardTitle>
              <CardDescription>Transform everyday waste into useful items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="font-semibold">Date & Time</h4>
                  <p className="text-gray-600">Sunday, December 3rd, 10:00 AM - 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600">
                    Community Center
                    <br />
                    456 Community Drive
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-purple-500" />
                <div>
                  <h4 className="font-semibold">Class Size</h4>
                  <p className="text-gray-600">Limited to 20 participants</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">What You'll Learn:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Turn plastic bottles into planters</li>
                  <li>• Create storage from cardboard boxes</li>
                  <li>• Make art from bottle caps</li>
                  <li>• Design organizers from containers</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Materials Provided:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• All tools and supplies</li>
                  <li>• Clean recyclable materials</li>
                  <li>• Light lunch and refreshments</li>
                  <li>• Take-home project kit</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workshop Registration</CardTitle>
              <CardDescription>Secure your spot in this hands-on learning experience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Crafting Experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - New to crafting</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                      <SelectItem value="advanced">Advanced - Very experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Project Interest</Label>
                  <Select
                    value={formData.project}
                    onValueChange={(value) => setFormData({ ...formData, project: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What interests you most?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planters">Garden planters</SelectItem>
                      <SelectItem value="storage">Storage solutions</SelectItem>
                      <SelectItem value="art">Decorative art</SelectItem>
                      <SelectItem value="organizers">Home organizers</SelectItem>
                      <SelectItem value="all">Everything!</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Age Requirement:</strong> Participants must be 12+ years old. Children under 16 must be
                    accompanied by an adult.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                >
                  Register for Workshop (+30 points)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
