"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, BarChart3, Users, Recycle, Bell, TrendingUp, Star, Calendar, Monitor, Smartphone } from "lucide-react"
import Link from "next/link"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function WebDashboard() {
  const [userPoints, setUserPoints] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(localStorage.getItem("ecotrack-points") || "0")
    }
    return 0
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([
    { id: 1, type: "success", message: "Weekly report generated successfully", time: "1 hour ago" },
    { id: 2, type: "warning", message: "Multiple bin overflows detected", time: "3 hours ago" },
    { id: 3, type: "info", message: "New community event scheduled", time: "1 day ago" },
  ])

  const quickActions = [
    { title: "Generate Report", icon: <BarChart3 className="w-6 h-6" />, href: "/analytics", color: "bg-blue-500" },
    { title: "View All Reports", icon: <MapPin className="w-6 h-6" />, href: "/report", color: "bg-green-500" },
    { title: "Manage Events", icon: <Calendar className="w-6 h-6" />, href: "/events", color: "bg-purple-500" },
    { title: "User Analytics", icon: <Users className="w-6 h-6" />, href: "/users", color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    EcoTrack Web
                  </h1>
                  <p className="text-sm text-gray-500">Admin Dashboard</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Web Version</span>
                <Link href="/">
                  <Button variant="outline" size="sm" className="ml-2">
                    <Smartphone className="w-4 h-4 mr-1" />
                    Mobile App
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search reports, events, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
              </div>

              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-green-700">{userPoints} pts</span>
              </div>

              <div className="relative">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                </Button>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${action.color} text-white`}>{action.icon}</div>
                      <h3 className="font-semibold">{action.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-900">2,847</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-green-600">+8% from last week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waste Processed</p>
                  <p className="text-3xl font-bold text-gray-900">892t</p>
                  <p className="text-sm text-green-600">+15% efficiency</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-3xl font-bold text-gray-900">2.4h</p>
                  <p className="text-sm text-green-600">-23% improvement</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Web Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>Latest reports and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 min ago", event: "New report submitted", location: "Main Street", status: "pending" },
                  {
                    time: "15 min ago",
                    event: "Bin collection completed",
                    location: "Park Avenue",
                    status: "completed",
                  },
                  { time: "1 hour ago", event: "IoT sensor alert", location: "School Road", status: "warning" },
                  {
                    time: "3 hours ago",
                    event: "Community event registered",
                    location: "Central Park",
                    status: "info",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.event}</p>
                      <p className="text-sm text-gray-600">
                        {activity.location} • {activity.time}
                      </p>
                    </div>
                    <Badge variant={activity.status === "completed" ? "default" : "secondary"}>{activity.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor system performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">IoT Sensors</span>
                  <span className="text-sm font-medium text-green-600">98% Online</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">API Response</span>
                  <span className="text-sm font-medium text-green-600">245ms avg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Database</span>
                  <span className="text-sm font-medium text-yellow-600">76% Capacity</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "76%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
