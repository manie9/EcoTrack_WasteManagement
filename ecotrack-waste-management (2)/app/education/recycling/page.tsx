"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function RecyclingGuidePage() {
  const recyclableItems = [
    { name: "Plastic Bottles", icon: "🍶", instructions: "Remove caps and labels, rinse clean" },
    { name: "Aluminum Cans", icon: "🥤", instructions: "Empty completely, no need to remove labels" },
    { name: "Glass Containers", icon: "🍯", instructions: "Remove lids, rinse clean, separate by color" },
    { name: "Paper & Cardboard", icon: "📦", instructions: "Keep dry, remove tape and staples" },
    { name: "Steel Cans", icon: "🥫", instructions: "Remove labels, rinse thoroughly" },
  ]

  const nonRecyclableItems = [
    { name: "Pizza Boxes (greasy)", icon: "🍕", reason: "Grease contamination" },
    { name: "Plastic Bags", icon: "🛍️", reason: "Clogs sorting machines" },
    { name: "Broken Glass", icon: "💔", reason: "Safety hazard for workers" },
    { name: "Electronics", icon: "📱", reason: "Requires special handling" },
  ]

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
            Recycling Guide
          </h1>
          <p className="text-gray-600">Learn proper waste separation techniques for effective recycling</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What CAN be Recycled */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-6 h-6" />
                <span>What CAN be Recycled</span>
              </CardTitle>
              <CardDescription>Items that can go in your blue recycling bin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recyclableItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-green-800">{item.name}</h4>
                    <p className="text-sm text-green-700">{item.instructions}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* What CANNOT be Recycled */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700">
                <XCircle className="w-6 h-6" />
                <span>What CANNOT be Recycled</span>
              </CardTitle>
              <CardDescription>Items that should NOT go in recycling bins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nonRecyclableItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-red-800">{item.name}</h4>
                    <p className="text-sm text-red-700">{item.reason}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recycling Process */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>The Recycling Process</CardTitle>
            <CardDescription>Understanding how your recyclables are processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className="font-semibold mb-2">1. Collection</h4>
                <p className="text-sm text-gray-600">Items are collected from your blue bin</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏭</span>
                </div>
                <h4 className="font-semibold mb-2">2. Sorting</h4>
                <p className="text-sm text-gray-600">Materials are sorted by type and quality</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h4 className="font-semibold mb-2">3. Processing</h4>
                <p className="text-sm text-gray-600">Materials are cleaned and processed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📦</span>
                </div>
                <h4 className="font-semibold mb-2">4. New Products</h4>
                <p className="text-sm text-gray-600">Transformed into new products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips and Best Practices */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <span>Recycling Tips & Best Practices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Badge className="bg-green-500 mt-1">✓</Badge>
                  <p className="text-sm">Clean containers before recycling - rinse out food residue</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge className="bg-green-500 mt-1">✓</Badge>
                  <p className="text-sm">Separate materials by type when possible</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge className="bg-green-500 mt-1">✓</Badge>
                  <p className="text-sm">Remove caps and lids from bottles and jars</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge className="bg-green-500 mt-1">✓</Badge>
                  <p className="text-sm">Flatten cardboard boxes to save space</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Badge className="bg-red-500 mt-1">✗</Badge>
                  <p className="text-sm">Don't recycle items with food contamination</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge className="bg-red-500 mt-1">✗</Badge>
                  <p className="text-sm">Don't put plastic bags in recycling bins</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge className="bg-red-500 mt-1">✗</Badge>
                  <p className="text-sm">Don't recycle broken glass or mirrors</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge className="bg-red-500 mt-1">✗</Badge>
                  <p className="text-sm">Don't mix different types of materials</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
