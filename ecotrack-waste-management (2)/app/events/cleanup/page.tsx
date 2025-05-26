"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CleanupEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergency: "",
    dietary: "",
  })
  const [isRegistered, setIsRegistered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate registration
    setTimeout(() => {
      setIsRegistered(true)
      // Add points for event registration
      const currentPoints = Number.parseInt(localStorage.getItem("ecotrack-points") || "0")
      localStorage.setItem("ecotrack-points", (currentPoints + 25).toString())
    }, 1000)
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              You're now registered for the Community Clean-up Day. We'll send you a reminder email.
            </p>
            <p className="text-green-600 font-semibold mb-6">+25 points earned!</p>
            <Link href="/">
              <Button className="w-full bg-green-500 hover:bg-green-600">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Community Clean-up Day
          </h1>
          <p className="text-gray-600">Join us in making our community cleaner and greener</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Everything you need to know about the cleanup event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="font-semibold">Date & Time</h4>
                  <p className="text-gray-600">Saturday, December 2nd, 2:00 PM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600">
                    Central Park Main Entrance
                    <br />
                    123 Park Avenue
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-purple-500" />
                <div>
                  <h4 className="font-semibold">Expected Attendance</h4>
                  <p className="text-gray-600">50-75 volunteers</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">What We Provide:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Gloves and trash bags</li>
                  <li>• Litter pickers and tools</li>
                  <li>• Refreshments and snacks</li>
                  <li>• First aid station</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">What to Bring:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Comfortable clothes you don't mind getting dirty</li>
                  <li>• Closed-toe shoes</li>
                  <li>• Water bottle</li>
                  <li>• Sun protection (hat, sunscreen)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>Sign up to join the cleanup event</CardDescription>
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={formData.emergency}
                    onChange={(e) => setFormData({ ...formData, emergency: e.target.value })}
                    placeholder="Name and phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietary">Dietary Restrictions</Label>
                  <Textarea
                    id="dietary"
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    placeholder="Any food allergies or dietary restrictions..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Register for Event (+25 points)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
