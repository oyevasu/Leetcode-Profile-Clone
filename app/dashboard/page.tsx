"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Eye,
  MessageSquare,
  Star,
  MapPin,
  GraduationCap,
  Briefcase,
} from "lucide-react"

// Mock user data
const userData = {
  name: "Real Sameer",
  username: "realsameer",
  rank: 34671,
  avatar: "/placeholder.svg?height=80&width=80",
  location: "India",
  university: "Indian Institute of Technology",
  company: "Google",
  joinDate: "2023",
  stats: {
    totalSolved: 1600,
    globalRanking: "Top 5%",
    acceptanceRate: 43.42,
    easyProblems: 450,
    mediumProblems: 890,
    hardProblems: 260,
    contestRating: 1847,
    maxRating: 1923,
  },
  communityStats: {
    views: 12500,
    solutions: 89,
    discuss: 156,
    reputation: 2340,
  },
  achievements: [
    { id: 1, name: "100 Days Badge", icon: "🔥", color: "bg-orange-100 text-orange-800" },
    { id: 2, name: "Problem Solver", icon: "🧩", color: "bg-blue-100 text-blue-800" },
    { id: 3, name: "Contest Master", icon: "🏆", color: "bg-yellow-100 text-yellow-800" },
    { id: 4, name: "Code Ninja", icon: "⚡", color: "bg-purple-100 text-purple-800" },
    { id: 5, name: "Algorithm Expert", icon: "🎯", color: "bg-green-100 text-green-800" },
    { id: 6, name: "Daily Coder", icon: "📅", color: "bg-pink-100 text-pink-800" },
  ],
}

// Generate mock activity data for heatmap
const generateActivityData = () => {
  const data = []
  const today = new Date()
  const startDate = new Date(today.getFullYear(), 0, 1) // Start of year

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const activity = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0
    data.push({
      date: new Date(d).toISOString().split("T")[0],
      count: activity,
    })
  }
  return data
}

const activityData = generateActivityData()

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Year")

  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-gray-100"
    if (count === 1) return "bg-green-200"
    if (count === 2) return "bg-green-300"
    if (count === 3) return "bg-green-400"
    if (count >= 4) return "bg-green-500"
    return "bg-gray-100"
  }

  const getMonthName = (monthIndex: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[monthIndex]
  }

  // Group activity data by month for display
  const groupedActivity = activityData.reduce((acc: any, item) => {
    const date = new Date(item.date)
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`
    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(item)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">LeetCode</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/problems" className="text-gray-700 hover:text-blue-600 transition-colors">
                Problems
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-100"
                  />
                  <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-600">@{userData.username}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Rank {userData.rank.toLocaleString()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {userData.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    {userData.university}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {userData.company}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {userData.joinDate}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-600">Views</span>
                      </div>
                      <span className="font-medium">{userData.communityStats.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">Solutions</span>
                      </div>
                      <span className="font-medium">{userData.communityStats.solutions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="text-sm text-gray-600">Discuss</span>
                      </div>
                      <span className="font-medium">{userData.communityStats.discuss}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-sm text-gray-600">Reputation</span>
                      </div>
                      <span className="font-medium">{userData.communityStats.reputation}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Solved Problems</p>
                      <p className="text-3xl font-bold text-gray-900">{userData.stats.totalSolved}</p>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Global Ranking</span>
                      <span className="font-medium">{userData.stats.globalRanking}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Acceptance Rate</p>
                      <p className="text-3xl font-bold text-gray-900">{userData.stats.acceptanceRate}%</p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${userData.stats.acceptanceRate}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Contest Rating</p>
                      <p className="text-3xl font-bold text-gray-900">{userData.stats.contestRating}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Max Rating: {userData.stats.maxRating}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Charts and Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Circular Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Problem Solving Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="#10b981"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(userData.stats.easyProblems / 800) * 314} 314`}
                          strokeLinecap="round"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="40"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(userData.stats.mediumProblems / 1200) * 251} 251`}
                          strokeLinecap="round"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="30"
                          stroke="#ef4444"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(userData.stats.hardProblems / 400) * 188} 188`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{userData.stats.totalSolved}</div>
                          <div className="text-xs text-gray-500">Solved</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Easy</span>
                      </div>
                      <span className="font-medium">{userData.stats.easyProblems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">Medium</span>
                      </div>
                      <span className="font-medium">{userData.stats.mediumProblems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm">Hard</span>
                      </div>
                      <span className="font-medium">{userData.stats.hardProblems}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {userData.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="text-2xl mb-2">{achievement.icon}</div>
                        <div className="text-xs font-medium text-gray-700">{achievement.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Heatmap */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {activityData.filter((d) => d.count > 0).length} submissions in the past year
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Less</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="flex space-x-1 mb-2">
                    {Object.keys(groupedActivity).map((monthKey) => {
                      const [year, month] = monthKey.split("-")
                      return (
                        <div key={monthKey} className="text-xs text-gray-500 min-w-[60px]">
                          {getMonthName(Number.parseInt(month))}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex space-x-1">
                    {Object.values(groupedActivity).map((monthData: any, monthIndex) => (
                      <div key={monthIndex} className="flex flex-col space-y-1">
                        {monthData.map((day: any, dayIndex: number) => (
                          <div
                            key={dayIndex}
                            className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)} hover:ring-2 hover:ring-gray-300 cursor-pointer`}
                            title={`${day.date}: ${day.count} submissions`}
                          ></div>
                        ))}
                      </div>
                    ))}
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
