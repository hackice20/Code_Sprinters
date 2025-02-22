import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { AuthContext } from "@/context/authContext";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateCoursePage() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoError, setVideoError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const token = sessionStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      discordServerLink: "",
      price: 0,
    },
  });

  // Validate video file
  const validateVideo = (file) => {
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    const ALLOWED_TYPES = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Invalid video type (MP4, MOV, AVI, MKV only)";
    }
    if (file.size > MAX_SIZE) return "Video exceeds 100MB limit";
    return null;
  };

  // Validate thumbnail image
  const validateThumbnail = (file) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Invalid image type (JPEG, PNG, WEBP only)";
    }
    if (file.size > MAX_SIZE) return "Image exceeds 5MB limit";
    return null;
  };

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validateVideo(file);
    if (error) {
      setVideoError(error);
      event.target.value = "";
      return;
    }

    setVideoFile(file);
    setVideoError("");
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validateThumbnail(file);
    if (error) {
      setThumbnailError(error);
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
    setThumbnailFile(file);
    setThumbnailError("");
  };

  const onSubmit = async (values) => {
    try {
      // Validate files
      let hasError = false;
      if (!videoFile) {
        setVideoError("Video required");
        hasError = true;
      }
      if (!thumbnailFile) {
        setThumbnailError("Thumbnail required");
        hasError = true;
      }
      if (hasError) return;

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("discordServerLink", values.discordServerLink);
      formData.append("price", values.price);
      formData.append("instructor", user.id);
      formData.append("video", videoFile);
      formData.append("thumbnail", thumbnailFile);

      const response = await fetch(`http://localhost:3000/api/courses`, {
        method: "POST",
        headers: { 

          Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Course creation failed");

      const data = await response.json();
      navigate(`/admin/${data.course._id}/createQuiz`);
    } catch (error) {
      console.error(error);
      // setError(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  // Preview Card Component
  const CoursePreview = ({ title, description, price, thumbnail }) => (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Course Preview</h3>
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Course thumbnail"
            className="mt-4 w-full h-48 object-cover rounded-lg"
          />
        )}
        <div className="mt-4 space-y-2">
          <p className="font-medium">Title: {title || "No title"}</p>
          <p className="text-sm text-gray-600">
            Description: {description || "No description"}
          </p>
          <p className="font-medium">Price: ${price || 0}</p>
        </div>
      </CardContent>
    </Card>
  );

  // Publishing Checklist Component
  const PublishingChecklist = ({ title, description, price, video, thumbnail }) => (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Publishing Checklist</h3>
        <div className="mt-4 space-y-2">
          {[
            { condition: !!title, label: "Title added" },
            { condition: !!description, label: "Description added" },
            { condition: price > 0, label: "Price set" },
            { condition: !!video, label: "Video uploaded" },
            { condition: !!thumbnail, label: "Thumbnail uploaded" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`h-4 w-4 rounded-full ${
                  item.condition ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

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
              <p className="text-slate-600">Add a new course to your platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="bg-white p-6">
                <div className="space-y-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter course title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter course description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Discord Server Link */}
                  <FormField
                    control={form.control}
                    name="discordServerLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discord Server Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Discord server link"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Enter course price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <FormLabel>Course Thumbnail</FormLabel>
                    <Input
                      type="file"
                      onChange={handleThumbnailChange}
                      accept="image/*"
                    />
                    {thumbnailFile && (
                      <p className="text-sm text-gray-600">
                        Selected: {thumbnailFile.name}
                      </p>
                    )}
                    {thumbnailError && (
                      <p className="text-sm text-red-500">{thumbnailError}</p>
                    )}
                  </div>

                  {/* Video Upload */}
                  <div className="space-y-2">
                    <FormLabel>Course Video</FormLabel>
                    <Input
                      type="file"
                      onChange={handleVideoChange}
                      accept="video/*"
                    />
                    {videoFile && (
                      <p className="text-sm text-gray-600">
                        Selected: {videoFile.name}
                      </p>
                    )}
                    {videoError && (
                      <p className="text-sm text-red-500">{videoError}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Submit buttons */}
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

          {/* Preview Section */}
          <div className="space-y-6">
            <CoursePreview
              title={form.watch("title")}
              description={form.watch("description")}
              price={form.watch("price")}
              thumbnail={thumbnailPreview}
            />
            <PublishingChecklist
              title={form.watch("title")}
              description={form.watch("description")}
              price={form.watch("price")}
              video={videoFile}
              thumbnail={thumbnailFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}