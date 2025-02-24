"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Medal, Trophy, Clock, ArrowUpDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [sortBy, setSortBy] = useState("score")
  const [searchTerm, setSearchTerm] = useState("")

  const getLeaderboard = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/leaderboard/67b88f2743bae65b585bfed6", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setLeaderboardData(data)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLeaderboard()
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMedalColor = (index) => {
    switch (index) {
      case 0:
        return "text-yellow-500"
      case 1:
        return "text-slate-400"
      case 2:
        return "text-amber-600"
      default:
        return ""
    }
  }

  const sortedData = [...leaderboardData]
    .filter((entry) => entry.userId.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "score") {
        return b.score - a.score || a.timeTaken - b.timeTaken
      }
      return a.timeTaken - b.timeTaken || b.score - a.score
    })

  return (
    <div className="min-h-screen bg-[#FFFBF5] py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Quiz Leaderboard</h1>
          <p className="text-slate-600">See how you stack up against other learners</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {index < 3 ? <Trophy className={`h-4 w-4 ${getMedalColor(index)}`} /> : null}#{index + 1}
                      </div>
                    </TableCell>
                    <TableCell>{entry.userId}</TableCell>
                    <TableCell className="text-right font-semibold">{entry.score}%</TableCell>
                    <TableCell className="text-right">{formatTime(entry.timeTaken)}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={entry.passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}>
                        {entry.passed ? "Passed" : "Failed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-slate-600">{formatDate(entry.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
