import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseCard from "@/components/Course/CourseCard";

export default function DashboardPage() {
  const [recommendedCourses, setRecommendedCourses] = useState([]); // All courses from the database
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Courses enrolled by the user
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // Fetch user details and enrolled courses
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnrolledCourses(data.user.enrolledCourses || []); // Set enrolled courses
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch all courses from the database
  const fetchRecommendedCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/courses");

      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      setRecommendedCourses(data); // Set all courses
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
    }
  };

  useEffect(() => {
    getUser(); // Fetch user details and enrolled courses
    fetchRecommendedCourses(); // Fetch all courses
  }, [token]);

  return (
    <div className="flex min-h-screen bg-[#FFFBF5]">
      {/* Main Content */}
      <main className="ml-4 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">My Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search courses..." className="w-64 pl-9" />
          </div>
        </div>

        {/* Enrolled Courses */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Enrolled Courses
          </h2>
          {enrolledCourses.length === 0 ? (
            <p className="text-slate-600">
              You are not enrolled in any courses yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Link to={`/learn/${course?._id}`} key={course?._id}>
                  <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={course?.thumbnail || "/placeholder.svg"}
                        alt={course?.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 font-semibold text-slate-800">
                        {course?.title}
                      </h3>
                      <p className="mb-3 text-sm text-slate-600">
                        {course?.instructor}
                      </p>
                      <div className="mb-3">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-600">
                            {course?.completedLessons || 0} of{" "}
                            {course?.totalLessons || 0} lessons
                          </span>
                          <span className="font-medium text-purple-600">
                            {course?.progress || 0}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Last accessed {course?.lastAccessed || "Never"}
                        </span>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => navigate(`/course/${course?._id}`)}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Recommended Courses (All Courses from DB) */}
        <section>
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Recommended Courses
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course) => (
              <Link to={`/course/${course?._id}`}>
                <CourseCard
                  key={course?._id}
                  id={course?._id}
                  title={course?.title}
                  description={course?.description}
                  thumbnail={course?.thumbnail}
                  rating={course?.rating}
                  price={course?.price}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
