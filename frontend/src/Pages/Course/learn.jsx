import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  MenuIcon,
  X,
  CheckCircle,
  PlayCircle,
  MessageCircle,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function CourseLearningPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState("dQw4w9WgXcQ");
  const [course, setCourse] = useState([]);
  const { id } = useParams();

  const getCourse = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCourse(data);
      }
    } catch (error) {
      console.log("Error in fetching the course ", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLessonClick = (videoId) => {
    setCurrentVideoId(videoId);
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className="flex h-screen bg-[#FFFBF5]">
      {/* Sidebar */}
      <div
        className={`flex flex-col ${
          sidebarOpen ? "w-64" : "w-0"
        } transition-width duration-300`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/courses" className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-semibold text-slate-800">
              Back to Courses
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex h-[calc(100vh-4rem)] flex-col">
          <div className="border-b p-4">
            <h2 className="mb-2 font-semibold text-slate-800">
              {course.title}
            </h2>
          </div>

          <div className="border-t p-4">
            <div className="space-y-2">
              <p>Once completed take the quiz</p>
              <Link to={`/takeQuiz/${course.quiz}`}>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  // asChild
                >
                  {/* <Link to={course.resources.quizLink} target="_blank"> */}
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Take Quiz
                  {/* </Link> */}
                </Button>
              </Link>
              <Separator className="my-5" />
              <p>If any doubt join the discord</p>
              <Button
                variant="outline"
                className="w-full justify-start"
                // asChild
              >
                {/* <Link to={course.resources.discordLink} target="_blank"> */}
                <MessageCircle className="mr-2 h-4 w-4" />
                Join Discord
                {/* </Link> */}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-[80vh]">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between border-b bg-white px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden md:inline-flex">
              Currently watching
            </Badge>
            <span className="text-sm font-medium text-slate-800">
              Understanding HTML Basics
            </span>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex w-full items-center justify-center">
          <div className="aspect-video w-[60vw] bg-black">
            <iframe
              // src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0`}
              src={`${course.youtubePlaylist}`}
              title="Course Video"
              className="object-cover w-[60vw] h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <Separator className="my-3" />
        {/* Video Information */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold text-slate-800">
              {course.title}
            </h1>
            <p className="text-slate-600">{course.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
