import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const CoursePreview = ({ thumbnail, title, description, instructor, price }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Preview</CardTitle>
        <CardDescription>Preview your course listing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-white p-4">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Course preview"
              className="mb-4 aspect-video w-full rounded-lg object-cover"
            />
          ) : (
            <div className="mb-4 flex aspect-video w-full items-center justify-center rounded-lg bg-slate-100">
              <GraduationCap className="h-12 w-12 text-slate-300" />
            </div>
          )}
          <h3 className="mb-2 font-semibold text-slate-800">{title || "Course Title"}</h3>
          <p className="mb-4 text-sm text-slate-600 line-clamp-2">
            {description || "Course description will appear here"}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">By {instructor || "Instructor Name"}</span>
            <span className="font-semibold text-slate-800">${price || "0.00"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursePreview;