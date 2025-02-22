import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 bg-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-purple-100">
            Join thousands of satisfied learners worldwide
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote:
                "UnBoundEd transformed my teaching approach. The resources are invaluable!",
              author: "Sarah Johnson",
              role: "High School Teacher",
            },
            {
              quote:
                "The personalized learning path helped me achieve my goals faster.",
              author: "Michael Chen",
              role: "Student",
            },
            {
              quote:
                "Outstanding platform for professional development in education.",
              author: "Dr. Emily Williams",
              role: "Education Consultant",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-slate-600 mb-4">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-slate-800">
                  {testimonial.author}
                </p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
