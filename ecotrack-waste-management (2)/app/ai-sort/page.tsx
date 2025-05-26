"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, Recycle, Trash2, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SortingResult {
  category: string
  confidence: number
  instructions: string
  color: string
  icon: React.ReactNode
  tips?: string
}

export default function AISortPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<SortingResult | null>(null)
  const [points, setPoints] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const wasteCategories = {
    recyclable: {
      color: "bg-blue-500",
      icon: <Recycle className="w-5 h-5" />,
      instructions: "Place in blue recycling bin. Clean containers before disposal.",
    },
    organic: {
      color: "bg-green-500",
      icon: <Recycle className="w-5 h-5" />,
      instructions: "Compost bin or organic waste collection. Remove any packaging.",
    },
    general: {
      color: "bg-gray-500",
      icon: <Trash2 className="w-5 h-5" />,
      instructions: "General waste bin. Cannot be recycled with current facilities.",
    },
    hazardous: {
      color: "bg-red-500",
      icon: <AlertTriangle className="w-5 h-5" />,
      instructions: "Special disposal required. Take to hazardous waste facility.",
    },
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    // Simulate realistic AI analysis with image recognition
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // More realistic AI results based on common waste items
    const detectedItems = [
      {
        category: "recyclable",
        confidence: 94,
        instructions:
          "This appears to be a plastic bottle. Remove the cap and label, rinse clean, and place in the blue recycling bin.",
        color: wasteCategories.recyclable.color,
        icon: wasteCategories.recyclable.icon,
        tips: "Tip: Crushing the bottle saves space in your recycling bin!",
      },
      {
        category: "organic",
        confidence: 89,
        instructions:
          "This looks like food waste. Remove any packaging and place in your compost bin or organic waste collection.",
        color: wasteCategories.organic.color,
        icon: wasteCategories.organic.icon,
        tips: "Tip: Composting this item will create nutrient-rich soil!",
      },
      {
        category: "general",
        confidence: 76,
        instructions: "This item cannot be recycled with current facilities. Place in your general waste bin.",
        color: wasteCategories.general.color,
        icon: wasteCategories.general.icon,
        tips: "Tip: Consider if this item can be reused before disposal.",
      },
    ]

    const randomResult = detectedItems[Math.floor(Math.random() * detectedItems.length)]
    setResult(randomResult)

    // Update points in localStorage
    const newPoints = points + 10
    setPoints(newPoints)
    if (typeof window !== "undefined") {
      localStorage.setItem("ecotrack-points", newPoints.toString())
    }

    setIsAnalyzing(false)
  }

  const handleMarkAsSorted = () => {
    if (result) {
      const newPoints = points + 5
      setPoints(newPoints)
      if (typeof window !== "undefined") {
        localStorage.setItem("ecotrack-points", newPoints.toString())
        // Add to user's sorting history
        const history = JSON.parse(localStorage.getItem("sorting-history") || "[]")
        history.push({
          id: Date.now(),
          category: result.category,
          timestamp: new Date().toISOString(),
          points: 5,
        })
        localStorage.setItem("sorting-history", JSON.stringify(history))
      }
      alert("Great job! Item marked as sorted. +5 points earned!")
    }
  }

  const handleGetMoreInfo = () => {
    if (result) {
      // Navigate to detailed info page
      window.open(`/education/waste-types/${result.category}`, "_blank")
    }
  }

  const takePhoto = () => {
    // In a real app, this would open the camera
    fileInputRef.current?.click()
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
            AI Waste Sorting Assistant
          </h1>
          <p className="text-gray-600">Use AI to identify and properly sort your waste items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload or Capture Image</CardTitle>
              <CardDescription>Take a photo or upload an image of the waste item you want to sort</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={selectedImage || "/placeholder.svg"}
                        alt="Uploaded waste item"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze with AI"
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedImage(null)}>
                        Clear
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">Upload an image of your waste item</p>
                      <p className="text-sm text-gray-500">Supported formats: JPG, PNG, WebP</p>
                    </div>
                    <div className="flex space-x-4 justify-center">
                      <Button
                        onClick={takePhoto}
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

              {points > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-700">+{points} points earned from AI sorting!</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sorting Results</CardTitle>
              <CardDescription>AI analysis and disposal instructions</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${result.color} text-white mb-4`}
                    >
                      {result.icon}
                      <span className="font-semibold capitalize">{result.category} Waste</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Confidence Level</p>
                      <Progress value={result.confidence} className="h-3" />
                      <p className="text-lg font-bold text-gray-800">{result.confidence}%</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Disposal Instructions:</h4>
                    <p className="text-gray-700">{result.instructions}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                      onClick={handleMarkAsSorted}
                    >
                      Mark as Sorted
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={handleGetMoreInfo}
                    >
                      Get More Info
                    </Button>
                  </div>

                  {result.tips && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                      <p className="text-sm text-yellow-800">{result.tips}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Recycle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Upload an image to get AI-powered sorting recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sorting Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Waste Sorting Guide</CardTitle>
            <CardDescription>Quick reference for different waste categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h4 className="font-semibold text-blue-700">Recyclable</h4>
                </div>
                <p className="text-sm text-blue-600">Plastic bottles, cans, paper, cardboard, glass containers</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <h4 className="font-semibold text-green-700">Organic</h4>
                </div>
                <p className="text-sm text-green-600">Food scraps, yard waste, biodegradable materials</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-700">General</h4>
                </div>
                <p className="text-sm text-gray-600">Non-recyclable plastics, mixed materials, contaminated items</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <h4 className="font-semibold text-red-700">Hazardous</h4>
                </div>
                <p className="text-sm text-red-600">Batteries, electronics, chemicals, medical waste</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
