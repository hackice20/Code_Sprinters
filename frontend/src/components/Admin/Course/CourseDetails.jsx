import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

const CourseDetails = ({ form, thumbnail, handleThumbnailChange, setThumbnail }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
        <CardDescription>Set your course pricing and instructor details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (INR)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="299"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>Set your course price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label htmlFor="thumbnail">Course Thumbnail</Label>
          <div className="mt-2">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById("thumbnail")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Thumbnail
                </Button>
              </div>
              {thumbnail && (
                <Button type="button" variant="outline" size="icon" onClick={() => setThumbnail(null)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {thumbnail && (
              <div className="mt-4">
                <img
                  src={thumbnail || "/placeholder.svg"}
                  alt="Course thumbnail preview"
                  className="rounded-lg border object-cover"
                  width={200}
                  height={112}
                />
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">Recommended size: 1280x720px (16:9)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseDetails;