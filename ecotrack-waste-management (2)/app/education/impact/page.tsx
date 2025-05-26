"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, AlertTriangle, Skull, Fish, TreePine, Droplets } from "lucide-react"
import Link from "next/link"

export default function EnvironmentalImpactPage() {
  const impactStats = [
    { title: "Ocean Pollution", value: 8, unit: "million tons", description: "of plastic enter oceans yearly" },
    { title: "Landfill Waste", value: 2.01, unit: "billion tons", description: "of waste generated globally per year" },
    { title: "Decomposition Time", value: 450, unit: "years", description: "for plastic bottles to decompose" },
    {
      title: "Wildlife Deaths",
      value: 100000,
      unit: "marine animals",
      description: "die from plastic pollution annually",
    },
  ]

  const pollutionEffects = [
    {
      icon: <Fish className="w-8 h-8 text-blue-500" />,
      title: "Marine Life Impact",
      description: "Plastic waste kills over 1 million seabirds and 100,000 marine mammals each year",
      severity: "critical",
    },
    {
      icon: <Droplets className="w-8 h-8 text-cyan-500" />,
      title: "Water Contamination",
      description: "Improper dumping contaminates groundwater and drinking water sources",
      severity: "high",
    },
    {
      icon: <TreePine className="w-8 h-8 text-green-500" />,
      title: "Soil Degradation",
      description: "Toxic chemicals from waste leach into soil, affecting plant growth and food safety",
      severity: "high",
    },
    {
      icon: <Skull className="w-8 h-8 text-red-500" />,
      title: "Human Health",
      description: "Air pollution from burning waste causes respiratory diseases and cancer",
      severity: "critical",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 border-red-300 text-red-800"
      case "high":
        return "bg-orange-100 border-orange-300 text-orange-800"
      default:
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Environmental Impact of Improper Dumping
          </h1>
          <p className="text-gray-600">Understanding the devastating effects of poor waste management</p>
        </div>

        {/* Alarming Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactStats.map((stat, index) => (
            <Card key={index} className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-red-600">{stat.value.toLocaleString()}</h3>
                  <p className="text-sm font-medium text-red-500">{stat.unit}</p>
                  <p className="text-xs text-gray-600 mt-2">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Warning Banner */}
        <Card className="mb-8 bg-gradient-to-r from-red-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-12 h-12 text-yellow-300" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Urgent Action Required</h2>
                <p className="text-red-100">
                  Without immediate action, plastic waste in oceans will outweigh fish by 2050. Every piece of waste
                  properly disposed of makes a difference.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {pollutionEffects.map((effect, index) => (
            <Card key={index} className={`border-2 ${getSeverityColor(effect.severity)}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">{effect.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{effect.title}</h3>
                    <p className="text-sm">{effect.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline of Decomposition */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Decomposition Timeline</CardTitle>
            <CardDescription>How long common waste items take to break down naturally</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { item: "Paper", time: "2-6 weeks", progress: 5 },
                { item: "Food Scraps", time: "1-6 months", progress: 10 },
                { item: "Cardboard", time: "2 months", progress: 15 },
                { item: "Aluminum Cans", time: "80-100 years", progress: 30 },
                { item: "Plastic Bottles", time: "450 years", progress: 60 },
                { item: "Glass Bottles", time: "1 million years", progress: 100 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.item}</span>
                    <span className="text-sm text-gray-600">{item.time}</span>
                  </div>
                  <Progress value={item.progress} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Solutions and Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">How You Can Make a Difference</CardTitle>
            <CardDescription>Simple actions that create massive positive impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-800 mb-3">Individual Actions</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Reduce single-use plastics</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Properly sort and recycle waste</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Compost organic waste</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Report illegal dumping</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800 mb-3">Community Impact</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">Organize neighborhood cleanups</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">Educate others about proper disposal</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">Support local recycling programs</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">Use the EcoTrack app to track progress</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
