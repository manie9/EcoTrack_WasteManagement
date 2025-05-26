"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowLeft, CheckCircle, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState("")
  const [feedback, setFeedback] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleStarClick = (starRating: number) => {
    setRating(starRating)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully. We appreciate your input and will use it to improve our
              services.
            </p>
            <div className="space-y-2">
              <Link href="/">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Return to Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Submit More Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Service Feedback
          </h1>
          <p className="text-gray-600">Help us improve waste management services in your community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
              <CardDescription>Your feedback helps us provide better waste management services</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Overall Rating</Label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className={`p-1 transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        <Star className="w-8 h-8 fill-current" />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-gray-600">
                      {rating === 1 && "Poor - Needs significant improvement"}
                      {rating === 2 && "Fair - Some issues need addressing"}
                      {rating === 3 && "Good - Generally satisfactory"}
                      {rating === 4 && "Very Good - Mostly excellent service"}
                      {rating === 5 && "Excellent - Outstanding service"}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Feedback Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collection">Waste Collection</SelectItem>
                      <SelectItem value="bins">Bin Maintenance</SelectItem>
                      <SelectItem value="recycling">Recycling Services</SelectItem>
                      <SelectItem value="app">Mobile App</SelectItem>
                      <SelectItem value="staff">Staff Service</SelectItem>
                      <SelectItem value="response">Response Time</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Please share your experience, suggestions, or concerns..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                  <p className="text-sm text-gray-500">
                    Provide your email if you'd like us to follow up on your feedback
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  disabled={isSubmitting || !rating || !category || !feedback}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Community Feedback</CardTitle>
                <CardDescription>See what other community members are saying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-l-green-500 pl-4 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <Badge variant="secondary">Collection</Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    "The new IoT bins are fantastic! Collection is much more efficient now."
                  </p>
                  <p className="text-xs text-gray-500 mt-1">- Sarah M., 2 days ago</p>
                </div>

                <div className="border-l-4 border-l-blue-500 pl-4 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <Badge variant="secondary">App</Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Love the AI sorting feature! Makes recycling so much easier."
                  </p>
                  <p className="text-xs text-gray-500 mt-1">- John D., 1 week ago</p>
                </div>

                <div className="border-l-4 border-l-purple-500 pl-4 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <Badge variant="secondary">Staff</Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Quick response to my report about illegal dumping. Great service!"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">- Lisa K., 3 days ago</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Statistics</CardTitle>
                <CardDescription>Community satisfaction metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Satisfaction</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                    <span className="text-sm font-bold">87%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Response Time</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <span className="text-sm font-bold">92%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">App Usability</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                    </div>
                    <span className="text-sm font-bold">89%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <ThumbsUp className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-green-700">94%</p>
                    <p className="text-xs text-green-600">Positive Feedback</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <ThumbsDown className="w-6 h-6 text-red-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-red-700">6%</p>
                    <p className="text-xs text-red-600">Needs Improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Need immediate assistance?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-semibold">Customer Service</p>
                    <p className="text-sm text-gray-600">support@ecotrack.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Emergency Hotline</p>
                    <p className="text-sm text-gray-600">1-800-ECO-HELP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
