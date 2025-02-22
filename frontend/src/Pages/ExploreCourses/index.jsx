import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CourseCard from "@/components/Course/CourseCard";
import { Link } from "react-router-dom";

export default function ExploreCourses() {
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const fetchRecommendedCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/courses");

      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      console.log(data);
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
                <Link to={`/course/${course._id}`}>
                <CourseCard
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  instructor={course.instructor}
                  rating={course.rating}
                  price={course.price}
                />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
