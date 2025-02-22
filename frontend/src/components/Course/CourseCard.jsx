import React from "react";
import { BookOpen, Clock, Search, Star, PlayCircle } from "lucide-react";
import { Button } from "../ui/button";

const CourseCard = ({ id, img, title, instructor, rating, price }) => {
  return (
    <div>
      <div
        key={id}
        className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={
              img ||
              "https://res.cloudinary.com/drn8ou2tw/image/upload/v1739958471/Code_With_Harry_-_Sigma_Batch_ai0aem.jpg"
            }
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-1 font-semibold text-slate-800">{title}</h3>
          <p className="mb-3 text-sm text-slate-600">{instructor}</p>
          <div className="mb-4 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-orange-500">
              <Star className="h-4 w-4 fill-current" />
              {rating}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800">{price}</span>
            <div className="flex w-full justify-between">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Buy Now
                </Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
