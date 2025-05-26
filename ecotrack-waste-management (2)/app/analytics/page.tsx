"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, TrendingDown, ArrowLeft, Download, MapPin, Users, Recycle } from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function AnalyticsPage() {
  // Mock data for charts
  const wasteCollectionData = [
    { month: "Jan", collected: 120, recycled: 45 },
    { month: "Feb", collected: 135, recycled: 52 },
    { month: "Mar", collected: 148, recycled: 58 },
    { month: "Apr", collected: 142, recycled: 61 },
    { month: "May", collected: 156, recycled: 67 },
    { month: "Jun", collected: 163, recycled: 72 },
  ]

  const wasteTypeData = [
    { name: "Recyclable", value: 35, color: "#3B82F6" },
    { name: "Organic", value: 28, color: "#10B981" },
    { name: "General", value: 25, color: "#6B7280" },
    { name: "Hazardous", value: 12, color: "#EF4444" },
  ]

  const reportData = [
    { day: "Mon", reports: 12 },
    { day: "Tue", reports: 8 },
    { day: "Wed", reports: 15 },
    { day: "Thu", reports: 10 },
    { day: "Fri", reports: 18 },
    { day: "Sat", reports: 22 },
    { day: "Sun", reports: 14 },
  ]

  const binEfficiencyData = [
    { location: "Main St", efficiency: 85 },
    { location: "Park Ave", efficiency: 92 },
    { location: "School Rd", efficiency: 78 },
    { location: "Market Sq", efficiency: 88 },
    { location: "City Center", efficiency: 95 },
  ]

  const handleExportReport = () => {
    const reportDataExport = {
      generatedDate: new Date().toISOString(),
      summary: {
        totalWasteCollected: "163.2t",
        recyclingRate: "44.1%",
        activeReports: 23,
        communityEngagement: "89%",
      },
      wasteCollection: wasteCollectionData,
      wasteTypes: wasteTypeData,
      reports: reportData,
      binEfficiency: binEfficiencyData,
    }

    const dataStr = JSON.stringify(reportDataExport, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `ecotrack-report-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Waste Management Analytics
              </h1>
              <p className="text-gray-600">Data insights to improve community waste management</p>
            </div>
            <div className="flex items-center space-x-2">
              <DarkModeToggle />
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                onClick={handleExportReport}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Waste Collected</p>
                  <p className="text-3xl font-bold">163.2t</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12% from last month</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Recycling Rate</p>
                  <p className="text-3xl font-bold">44.1%</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+8% from last month</span>
                  </div>
                </div>
                <Recycle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Active Reports</p>
                  <p className="text-3xl font-bold">23</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm">-15% from last week</span>
                  </div>
                </div>
                <MapPin className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Community Engagement</p>
                  <p className="text-3xl font-bold">89%</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+5% from last month</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="collection">Collection Trends</TabsTrigger>
            <TabsTrigger value="waste-types">Waste Composition</TabsTrigger>
            <TabsTrigger value="reports">Community Reports</TabsTrigger>
            <TabsTrigger value="efficiency">Bin Efficiency</TabsTrigger>
          </TabsList>

          {/* Collection Trends */}
          <TabsContent value="collection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Waste Collection Trends</CardTitle>
                <CardDescription>Monthly waste collection and recycling data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={wasteCollectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="collected"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        name="Total Collected (tons)"
                      />
                      <Line
                        type="monotone"
                        dataKey="recycled"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="Recycled (tons)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Collection Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Peak Collection Day</span>
                    <Badge className="bg-blue-500">Friday</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Best Recycling Month</span>
                    <Badge className="bg-green-500">June</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Efficiency Improvement</span>
                    <Badge className="bg-purple-500">+23%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-700">2.4 tons</h3>
                    <p className="text-green-600">CO₂ emissions saved</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-700">1,847</h3>
                    <p className="text-blue-600">Trees equivalent saved</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Waste Types */}
          <TabsContent value="waste-types" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Waste Composition</CardTitle>
                  <CardDescription>Breakdown of waste types in the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={wasteTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {wasteTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waste Type Trends</CardTitle>
                  <CardDescription>Changes in waste composition over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wasteTypeData.map((type) => (
                    <div key={type.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{type.name}</span>
                        <span>{type.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${type.value}%`,
                            backgroundColor: type.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Report Activity</CardTitle>
                <CardDescription>Community engagement through issue reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="reports" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Overflowing Bins</span>
                    <Badge variant="secondary">45%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Illegal Dumping</span>
                    <Badge variant="secondary">28%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Damaged Bins</span>
                    <Badge variant="secondary">18%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Issues</span>
                    <Badge variant="secondary">9%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <h3 className="text-xl font-bold text-green-700">2.4 hrs</h3>
                    <p className="text-green-600">Average response time</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-700">94%</h3>
                    <p className="text-blue-600">Issues resolved</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <span>Sarah M. - 23 reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <span>John D. - 18 reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <span>Lisa K. - 15 reports</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bin Efficiency */}
          <TabsContent value="efficiency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Bin Efficiency</CardTitle>
                <CardDescription>Performance metrics for IoT-enabled waste bins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={binEfficiencyData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="location" type="category" />
                      <Tooltip />
                      <Bar dataKey="efficiency" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Average Efficiency</span>
                    <Badge className="bg-green-500">87.6%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Best Performing Bin</span>
                    <Badge className="bg-blue-500">City Center</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700">Needs Attention</span>
                    <Badge className="bg-orange-500">School Rd</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimization Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">School Road</h4>
                    <p className="text-sm text-yellow-700">Increase collection frequency during school hours</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Market Square</h4>
                    <p className="text-sm text-blue-700">Consider additional bin placement for weekend markets</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800">Overall</h4>
                    <p className="text-sm text-green-700">IoT sensors have improved efficiency by 23%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
