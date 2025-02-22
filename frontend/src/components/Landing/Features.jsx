import React from "react";
import { BookOpen, Users, Target, GraduationCap, } from "lucide-react"


const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FFFBF5] to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Why Choose UnBoundEd?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Discover the features that make our platform unique
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: "Rich Content",
              description: "Access thousands of curated educational resources",
            },
            {
              icon: Users,
              title: "Expert Teachers",
              description:
                "Learn from experienced educators and industry experts",
            },
            {
              icon: Target,
              title: "Personalized",
              description: "Adaptive learning paths tailored to your needs",
            },
            {
              icon: GraduationCap,
              title: "Certification",
              description: "Earn recognized certificates upon completion",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className=" rounded-lg opacity-0 group-hover:shadow-lg transition-shadow duration-1000" />
              <div className="relative bg-white p-6 rounded-lg">
                <feature.icon className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
