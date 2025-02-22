import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <header className="relative overflow-hidden h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-orange-500/10" />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="relative z-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl xl:text-6xl">
              Empowering Education for{" "}
              <span className="text-purple-600">Everyone</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 sm:text-xl">
              Transform your learning journey with our comprehensive educational
              resources, expert-led courses, and innovative teaching methods.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full bg-orange-500/10 absolute -top-4 -right-4 w-72 h-72 animate-pulse" />
            <img
              src="/assets/EducationIllustrations.avif"
              alt="Education illustration"
              className="relative z-10 mx-auto rounded-lg shadow-xl"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
