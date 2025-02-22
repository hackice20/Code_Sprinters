import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CourseContent = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
        <CardDescription>Add your course content and resources</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="youtubePlaylist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube Playlist URL</FormLabel>
              <FormControl>
                <Input placeholder="https://youtube.com/playlist?list=..." {...field} />
              </FormControl>
              <FormDescription>Link to your course video playlist</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="discordServerLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord Server Link</FormLabel>
              <FormControl>
                <Input placeholder="https://discord.gg/..." {...field} />
              </FormControl>
              <FormDescription>Link to your course community</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CourseContent;