import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BasicInformation from "@/components/Admin/Course/BasicInfo";
import CourseContent from "@/components/Admin/Course/ContentInfo";
import CourseDetails from "@/components/Admin/Course/CourseDetails";
import CoursePreview from "@/components/Admin/Course/PreviewCard";
import PublishingChecklist from "@/components/Admin/Course/PublishingChecklist";
import { Form } from "@/components/ui/form";
import { AuthContext } from "@/context/authContext";

export default function CreateCoursePage() {
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null); // State for video file
  const [error, setError] = useState(""); // State for error messages
  const token = sessionStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      youtubePlaylist: "",
      discordServerLink: "",
      price: 0,
      category: "",
    },
  });

  // Validate video file
  const validateFile = (file) => {
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
    const ALLOWED_TYPES = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload an MP4, MOV, AVI, or MKV file.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File is too large. Maximum size is 100MB.";
    }
    return null;
  };

  // Handle video file change
  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setError(fileError);
        event.target.value = ""; // Clear the file input
        return;
      }
      setVideoFile(file);
      setError("");
    }
  };

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      if (!videoFile) {
        setError("Please select a video file.");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("youtubePlaylist", values.youtubePlaylist);
      formData.append("discordServerLink", values.discordServerLink);
      formData.append("price", values.price);
      formData.append("thumbnail", values.thumbnail);
      formData.append("instructor", user.id);
      formData.append("category", values.category || "development");
      formData.append("video", videoFile); // Append the video file

      const response = await fetch(`http://localhost:3000/api/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send FormData instead of JSON
      });

      if (response.ok) {
        const data = await response.json();
        const id = data.course._id;
        navigate(`/admin/${id}/createQuiz`);
      } else {
        throw new Error("Failed to create course");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
            >
              <Button
                type="button"
                className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800">
                Create New Course
              </h1>
              <p className="text-slate-600">
                Add a new course to your platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <BasicInformation form={form} />
              <CourseContent form={form} />
              <CourseDetails
                form={form}
                thumbnail={thumbnail}
                handleThumbnailChange={handleThumbnailChange}
                setThumbnail={setThumbnail}
              />
              {/* Video Upload Section */}
              <div className="form-group">
                <label htmlFor="videoFile">
                  Upload Video (MP4, MOV, AVI, or MKV, max 100MB)
                </label>
                <input
                  type="file"
                  id="videoFile"
                  onChange={handleVideoChange}
                  accept="video/mp4,video/quicktime,video/x-msvideo,video/x-matroska"
                  required
                />
                {videoFile && !error && (
                  <p>Selected file: {videoFile.name}</p>
                )}
                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create Course
                </Button>
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
              </div>
            </form>
          </Form>

          {/* Preview Card */}
          <div className="space-y-6">
            <CoursePreview
              thumbnail={thumbnail}
              title={form.watch("title")}
              description={form.watch("description")}
              instructor={form.watch("instructor")}
              price={form.watch("price")}
            />
            <PublishingChecklist
              title={form.watch("title")}
              description={form.watch("description")}
              thumbnail={thumbnail}
              price={form.watch("price")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}