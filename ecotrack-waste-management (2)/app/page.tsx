"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trash2,
  MapPin,
  Award,
  Camera,
  BarChart3,
  Users,
  MessageSquare,
  Recycle,
  Leaf,
  Bell,
  TrendingUp,
  Star,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function HomePage() {
  const [userPoints, setUserPoints] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(localStorage.getItem("ecotrack-points") || "0")
    }
    return 0
  })
  const [userLevel, setUserLevel] = useState("Eco Warrior")
  const [notifications, setNotifications] = useState([
    { id: 1, type: "success", message: "Report submitted successfully", time: "2 hours ago" },
    { id: 2, type: "warning", message: "Bin overflow detected on Main St", time: "1 day ago" },
    { id: 3, type: "info", message: "New recycling event this weekend", time: "2 days ago" },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  // Simulated IoT data
  const [binData, setBinData] = useState([
    { id: 1, location: "Main Street", fillLevel: 85, status: "critical" },
    { id: 2, location: "Park Avenue", fillLevel: 45, status: "normal" },
    { id: 3, location: "School Road", fillLevel: 92, status: "critical" },
    { id: 4, location: "Market Square", fillLevel: 30, status: "normal" },
  ])

  useEffect(() => {
    // Simulate real-time IoT updates
    const interval = setInterval(() => {
      setBinData((prev) =>
        prev.map((bin) => ({
          ...bin,
          fillLevel: Math.min(100, bin.fillLevel + Math.random() * 2 - 1),
          status: bin.fillLevel > 80 ? "critical" : bin.fillLevel > 60 ? "warning" : "normal",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  EcoTrack
                </h1>
                <p className="text-sm text-gray-600">Smart Waste Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-green-700">{userPoints} pts</span>
              </div>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                {userLevel}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
              <DarkModeToggle />

              {showNotifications && (
                <div className="absolute top-16 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  {notifications.map((notif) => (
                    <div key={notif.id} className="mb-2 p-2 border-b border-gray-100 last:border-b-0">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Reports</p>
                  <p className="text-3xl font-bold">47</p>
                </div>
                <MapPin className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Waste Sorted</p>
                  <p className="text-3xl font-bold">1.2k</p>
                </div>
                <Camera className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Community Events</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">CO₂ Saved</p>
                  <p className="text-3xl font-bold">2.4t</p>
                </div>
                <Leaf className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Report</span>
            </TabsTrigger>
            <TabsTrigger value="sort" className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">AI Sort</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center space-x-2">
              <Leaf className="w-4 h-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
          </TabsList>

          {/* IoT Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trash2 className="w-5 h-5" />
                  <span>Smart Bin Monitoring</span>
                </CardTitle>
                <CardDescription>Real-time IoT sensor data from waste bins across the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {binData.map((bin) => (
                    <Card key={bin.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{bin.location}</h4>
                          <Badge variant="secondary" className={`${getStatusColor(bin.status)} text-white`}>
                            {bin.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Fill Level</span>
                            <span>{Math.round(bin.fillLevel)}%</span>
                          </div>
                          <Progress value={bin.fillLevel} className="h-2" />
                        </div>
                        {bin.fillLevel > 80 && <p className="text-sm text-red-600 mt-2">⚠️ Collection needed soon</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report System */}
          <TabsContent value="report" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Waste Issues</CardTitle>
                <CardDescription>
                  Help keep our community clean by reporting overflowing bins and illegal dumping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/report">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    Create New Report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Waste Sorting */}
          <TabsContent value="sort" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Waste Sorting Assistant</CardTitle>
                <CardDescription>Use AI to identify and properly sort your waste items</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ai-sort">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Start AI Sorting
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Educational Content */}
          <TabsContent value="education" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">Recycling Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 mb-4">Learn proper waste separation techniques</p>
                  <Link href="/education/recycling">
                    <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 mb-4">Understand the dangers of improper dumping</p>
                  <Link href="/education/impact">
                    <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gamification/Rewards */}
          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Eco Achievements</CardTitle>
                <CardDescription>Earn points and unlock badges for your environmental contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Award className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-yellow-700">Reporter Badge</h4>
                    <p className="text-sm text-yellow-600">10+ reports submitted</p>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <Recycle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-700">Sorting Master</h4>
                    <p className="text-sm text-green-600">100+ items sorted</p>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Users className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-700">Community Hero</h4>
                    <p className="text-sm text-blue-600">5+ events attended</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Engagement */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Join community recycling programs and workshops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Calendar className="w-8 h-8 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-green-700">Community Clean-up Day</h4>
                      <p className="text-sm text-green-600">Saturday, 2:00 PM - Central Park</p>
                    </div>
                    <Link href="/events/cleanup">
                      <Button size="sm" className="ml-auto bg-green-500 hover:bg-green-600">
                        Join
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Recycle className="w-8 h-8 text-blue-500" />
                    <div>
                      <h4 className="font-semibold text-blue-700">Upcycling Workshop</h4>
                      <p className="text-sm text-blue-600">Sunday, 10:00 AM - Community Center</p>
                    </div>
                    <Link href="/events/workshop">
                      <Button size="sm" className="ml-auto bg-blue-500 hover:bg-blue-600">
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Waste Management Analytics</CardTitle>
                <CardDescription>Data insights to improve community waste management</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/analytics">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Feedback</CardTitle>
                <CardDescription>Help us improve waste management services in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/feedback">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Provide Feedback
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
