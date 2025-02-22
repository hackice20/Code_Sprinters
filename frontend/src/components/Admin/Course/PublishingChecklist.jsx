import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PublishingChecklist = ({ title, description, thumbnail, price }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishing Checklist</CardTitle>
        <CardDescription>Ensure your course is ready for review</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-slate-600">
            <div className={`h-2 w-2 rounded-full ${title ? "bg-green-500" : "bg-slate-200"}`} />
            Course title
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600">
            <div className={`h-2 w-2 rounded-full ${description ? "bg-green-500" : "bg-slate-200"}`} />
            Course description
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600">
            <div className={`h-2 w-2 rounded-full ${thumbnail ? "bg-green-500" : "bg-slate-200"}`} />
            Course thumbnail
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600">
            <div className={`h-2 w-2 rounded-full ${price > 0 ? "bg-green-500" : "bg-slate-200"}`} />
            Course pricing
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default PublishingChecklist;