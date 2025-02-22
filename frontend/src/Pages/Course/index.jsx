import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourseDetails] = useState(null);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const getCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/courses/${id}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      setCourseDetails(data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/courses/${id}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Purchase successful:", data);
        navigate(`/learn/${course._id}`)
      } else {
        console.error("Purchase failed:", data.message);
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[70vh] bg-[#FFFBF5]">
      {/* Course Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-800">{course.title}</h1>
        </div>
      </div>

      {/* Course Details */}
      <div className="container mx-auto px-4 py-8">
        {/* 3-Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* First Column - Thumbnail Image */}
          <div className="col-span-1">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>

          {/* Second and Third Columns - Key-Value Pairs */}
          <div className="col-span-2">
            <div className="space-y-4">
              {/* Title */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Title</h2>
                <p className="text-lg text-slate-600">{course.title}</p>
              </div>

              {/* Description */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Description</h2>
                <p className="text-lg text-slate-600">{course.description}</p>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Price</h2>
                <p className="text-lg text-slate-600">₹{course.price.toLocaleString()}</p>
              </div>

              {/* Instructor */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Instructor</h2>
                <p className="text-lg text-slate-600">{course.instructor}</p>
              </div>

              {/* Bought By Count */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Bought By</h2>
                <p className="text-lg text-slate-600">{course.boughtBy.length} students</p>
              </div>

              {/* Reviews */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">Reviews</h2>
                  {course.reviews.length === 0 ? (
                    <p className="text-lg text-slate-600">No reviews yet.</p>
                  ) : null}
                </div>
                {course.reviews.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {course.reviews.map((review, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-slate-600">
                          {review.review} <br />
                          <span className="text-slate-500">by :{review.user.username}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buy Now Button at Bottom */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleBuyNow}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}