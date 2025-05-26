"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import {
  Users,
  BarChart3,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  // Mock admin data
  const [adminStats, setAdminStats] = useState({
    totalUsers: 1247,
    activeReports: 23,
    resolvedReports: 2824,
    systemHealth: 98,
    responseTime: "2.4h",
    wasteProcessed: "892t",
  })

  const [recentReports, setRecentReports] = useState([
    {
      id: "RPT-001",
      user: "Sarah Johnson",
      type: "Overflowing Bin",
      location: "Main Street",
      status: "pending",
      priority: "high",
      submitted: "2 hours ago",
    },
    {
      id: "RPT-002",
      user: "Mike Chen",
      type: "Illegal Dumping",
      location: "Park Avenue",
      status: "in-progress",
      priority: "critical",
      submitted: "4 hours ago",
    },
    {
      id: "RPT-003",
      user: "Emma Wilson",
      type: "Damaged Bin",
      location: "School Road",
      status: "resolved",
      priority: "medium",
      submitted: "1 day ago",
    },
  ])

  const [systemAlerts, setSystemAlerts] = useState([
    { id: 1, type: "warning", message: "IoT sensor offline at Market Square", time: "30 min ago" },
    { id: 2, type: "info", message: "Scheduled maintenance completed", time: "2 hours ago" },
    { id: 3, type: "error", message: "Database backup failed", time: "6 hours ago" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    EcoTrack Admin
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">System Administration</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <DarkModeToggle />

              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {adminStats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">+12% this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Reports</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{adminStats.activeReports}</p>
                  <p className="text-sm text-red-600">Needs attention</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Health</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{adminStats.systemHealth}%</p>
                  <p className="text-sm text-green-600">All systems operational</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{adminStats.responseTime}</p>
                  <p className="text-sm text-green-600">-15% improvement</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Latest waste management reports requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.slice(0, 3).map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{report.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {report.location} • {report.submitted}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(report.priority)}>{report.priority}</Badge>
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Important system notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            alert.type === "error"
                              ? "bg-red-500"
                              : alert.type === "warning"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Management Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Report Management</CardTitle>
                    <CardDescription>Manage and respond to community waste reports</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{report.id}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{report.user}</p>
                        </div>
                        <div>
                          <p className="font-medium">{report.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{report.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(report.priority)}>{report.priority}</Badge>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage community users and their activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">User management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Monitor system health and performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">API Response Time</span>
                      <span className="text-sm font-medium text-green-600">245ms</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Database Performance</span>
                      <span className="text-sm font-medium text-green-600">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">IoT Sensors Online</span>
                      <span className="text-sm font-medium text-yellow-600">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Administrative tools and utilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate System Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    System Configuration
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View Error Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system parameters and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">System settings panel coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
