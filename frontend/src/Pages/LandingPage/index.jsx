import React, { Suspense } from "react";

const Hero = React.lazy(() => import("@/components/Landing/Hero"));
const Testimonials = React.lazy(() =>
  import("@/components/Landing/Testimonials")
);
const Features = React.lazy(() => import("@/components/Landing/Features"));
const LandingPage = () => {
  return (
    <>
      <Suspense fallback={<p>This is Loading</p>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<p>This is Loading</p>}>
        <Features />
      </Suspense>
      <Suspense fallback={<p>This is Loading</p>}>
        <Testimonials />
      </Suspense>
    </>
  );
};

export default LandingPage;
