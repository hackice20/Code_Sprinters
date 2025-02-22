"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  MoreVertical,
  GraduationCap,
  LayoutDashboard,
  Settings,
  BookOpenCheck,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "24,571",
      change: "+12%",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "192",
      change: "+4%",
      icon: BookOpen,
    },
    {
      title: "Revenue",
      value: "$82,294",
      change: "+18%",
      icon: DollarSign,
    },
    {
      title: "Course Completion",
      value: "87%",
      change: "+2%",
      icon: TrendingUp,
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "Advanced Web Development",
      instructor: "Sarah Johnson",
      students: 234,
      revenue: 4500,
      status: "Active",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Michael Chen",
      students: 189,
      revenue: 3200,
      status: "Draft",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Emily Williams",
      students: 312,
      revenue: 6100,
      status: "Active",
    },
    {
      id: 4,
      title: "Digital Marketing 101",
      instructor: "Alex Turner",
      students: 156,
      revenue: 2800,
      status: "Review",
    },
  ];

  const recentEnrollments = [
    {
      id: 1,
      student: "John Cooper",
      course: "Advanced Web Development",
      date: "2024-02-20",
      amount: 89.99,
      status: "Completed",
    },
    {
      id: 2,
      student: "Emma Watson",
      course: "UI/UX Design Fundamentals",
      date: "2024-02-19",
      amount: 69.99,
      status: "In Progress",
    },
    {
      id: 3,
      student: "Michael Scott",
      course: "Python for Data Science",
      date: "2024-02-19",
      amount: 94.99,
      status: "In Progress",
    },
    {
      id: 4,
      student: "Sarah Miller",
      course: "Digital Marketing 101",
      date: "2024-02-18",
      amount: 79.99,
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFFBF5]">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link to="/admin/createCourse">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </div>
                <p className="text-xs text-green-600">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Courses</CardTitle>
                  <CardDescription>
                    Latest course updates and status
                  </CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-slate-500">
                            {course.instructor}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>${course.revenue}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            course.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : course.status === "Draft"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-orange-100 text-orange-600"
                          }
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Enrollments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Enrollments</CardTitle>
                  <CardDescription>Latest student enrollments</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">
                        {enrollment.student}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {enrollment.course}
                      </TableCell>
                      <TableCell>${enrollment.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            enrollment.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }
                        >
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
