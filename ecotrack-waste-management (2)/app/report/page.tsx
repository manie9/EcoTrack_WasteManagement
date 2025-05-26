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
import { MapPin, Camera, Upload, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Confetti } from "@/components/confetti"

export default function ReportPage() {
  const [location, setLocation] = useState("")
  const [reportType, setReportType] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setShowConfetti(true) // Trigger confetti celebration
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Report Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for helping keep our community clean. Your report has been forwarded to the waste management
              team.
            </p>
            <div className="space-y-2">
              <Link href="/">
                <Button className="w-full bg-green-500 hover:bg-green-600">Return to Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Submit Another Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Report Waste Issue
          </h1>
          <p className="text-gray-600">Help us maintain a clean community by reporting waste management issues</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>Provide information about the waste management issue you've encountered</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Issue Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overflowing">Overflowing Bin</SelectItem>
                      <SelectItem value="illegal-dumping">Illegal Dumping</SelectItem>
                      <SelectItem value="damaged-bin">Damaged Bin</SelectItem>
                      <SelectItem value="missed-collection">Missed Collection</SelectItem>
                      <SelectItem value="hazardous-waste">Hazardous Waste</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter address or coordinates"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={getCurrentLocation} className="px-3">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                  {currentLocation && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Location detected
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue in detail..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Photos (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {images.map((image, index) => (
                        <Badge key={index} variant="secondary">
                          {image.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  disabled={isSubmitting || !reportType || !location}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reporting Guidelines</CardTitle>
              <CardDescription>Follow these tips for effective reporting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Camera className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Take Clear Photos</h4>
                  <p className="text-sm text-gray-600">Include multiple angles and close-ups of the issue</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Precise Location</h4>
                  <p className="text-sm text-gray-600">Use GPS coordinates or detailed address information</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Detailed Description</h4>
                  <p className="text-sm text-gray-600">Include time, severity, and any safety concerns</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Emergency Situations</h4>
                <p className="text-sm text-yellow-700">
                  For hazardous waste or immediate health risks, contact emergency services directly at 911
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
    </div>
  )
}
