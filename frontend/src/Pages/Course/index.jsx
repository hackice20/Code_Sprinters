import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Clock,
  Award,
  Globe,
  BookOpen,
  Users,
  PlayCircle,
  CheckCircle,
  BarChart,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CoursePage() {
  const [selectedTab, setSelectedTab] = useState("curriculum");
  const { id } = useParams();
  const [course, setCourseDetails] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const getcourse = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/courses/${id}`);
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      console.log(data);
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
        navigate(`/dashboard`)
      } else {
        console.error("Purchase failed:", data.message);
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };
  

  useEffect(() => {
    getcourse();
  }, []);

  return (
    <div className="min-h-[70vh] bg-[#FFFBF5] ">
      {/* Course Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-800">{course.title}</h1>
          <p className="text-lg text-slate-600">{course.subtitle}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold text-orange-500">{course.rating}</span>
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-orange-400 text-orange-400"
                    />
                  ))}
              </div>
              {/* <span className="text-slate-600">({course.reviews.toLocaleString()} reviews)</span> */}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Users className="h-4 w-4" />
              {/* {course.students.toLocaleString()} students */}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Clock className="h-4 w-4" />
              Last updated {course.lastUpdated}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Globe className="h-4 w-4" />
              {course.language}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-10 flex flex-col gap-5">
        <div className="flex gap-10">
          <img
            src="https://res.cloudinary.com/drn8ou2tw/image/upload/v1739958471/Code_With_Harry_-_Sigma_Batch_ai0aem.jpg"
            alt=""
            className="rounded-md"
          />
          <div>
            <p className="text-3xl font-bold ">Author name</p>
            <p className="text-lg">Author description</p>
            <p className="text-lg">Course description</p>            
          </div>
        </div>
        <div className="  p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-800">${course.price || "99"}</span>
            <span className="ml-2 text-slate-500 line-through">${course.originalPrice || "109"}</span>
          </div>
          <Button onClick={handleBuyNow} className="bg-purple-600 hover:bg-purple-700">Buy now</Button>
        </div>
      </div>
      </div>

      {/* Purchase Section */}
    </div>
  );
}
