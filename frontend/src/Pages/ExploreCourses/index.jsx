import React, { useState, useEffect, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const CourseCard = React.lazy(() => import("@/components/Course/CourseCard"));

export default function ExploreCourses() {
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const fetchRecommendedCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/courses");

      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();

      setRecommendedCourses(data);
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
    }
  };

  useEffect(() => {
    fetchRecommendedCourses();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#FFFBF5]">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Explore Courses</h1>
          <p className="mt-2 text-slate-600">
            Discover your next learning adventure
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row flex-wrap gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search courses..."
                    className="w-full pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {recommendedCourses.map((course) => (
                <Link to={`/course/${course._id}`} key={course._id}>
                  <Suspense fallback={<p>Loading...</p>}>
                    <CourseCard
                      id={course._id}
                      title={course.title}
                      description={course.description}
                      thumbnail={course.thumbnail}
                      rating={course.rating}
                      price={course.price}
                    />{" "}
                  </Suspense>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
