import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseCard({ id, title, description, thumbnail, rating, price }) {
  return (
    <div className="w-100 h-100 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <div className="mt-3 flex items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating ? "text-yellow-400" : "text-slate-300"
              }`}
              fill={index < rating ? "currentColor" : "none"}
            />
          ))}
          <span className="ml-2 text-sm text-slate-500">({rating})</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-800">${price}</span>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}