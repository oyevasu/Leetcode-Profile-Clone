"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, ArrowLeft, Play, Send } from "lucide-react"

const problemsData: { [key: string]: any } = {
  "1": {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    status: "Solved",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
• 2 ≤ nums.length ≤ 10⁴
• -10⁹ ≤ nums[i] ≤ 10⁹
• -10⁹ ≤ target ≤ 10⁹
• Only one valid answer exists.`,
  },
  "2": {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    status: "Unsolved",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
• The number of nodes in each linked list is in the range [1, 100].
• 0 ≤ Node.val ≤ 9
• It is guaranteed that the list represents a number that does not have leading zeros.`,
  },
}

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    
}`)
  const [status, setStatus] = useState("Unsolved")

  const problem = problemsData[params.id] || problemsData["1"]

  const handleRun = () => {
    alert("Code executed successfully! 🎉\n\nOutput: [0, 1]\nExecution time: 52ms")
  }

  const handleSubmit = () => {
    setStatus("Solved")
    alert("Code submitted successfully! ✅\n\nAll test cases passed!\nRuntime: 52ms (beats 95% of submissions)")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <Link href="/problems" className="text-blue-600 font-medium">
                Problems
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-blue-600 transition-colors">
                Signup
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/problems">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Problems
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
              <div className="flex gap-2">
                <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                <Badge className={status === "Solved" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                  {status}
                </Badge>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">{problem.description}</pre>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Solution</h2>
              <p className="text-sm text-gray-600">Write your code below:</p>
            </div>

            <div className="mb-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write your solution here..."
                spellCheck={false}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRun} variant="outline" className="flex-1 bg-transparent">
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>

            {/* Test Cases */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Test Cases</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Input: nums = [2,7,11,15], target = 9</span>
                  <span className="text-green-600">✓ Passed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Input: nums = [3,2,4], target = 6</span>
                  <span className="text-green-600">✓ Passed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Input: nums = [3,3], target = 6</span>
                  <span className="text-green-600">✓ Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
