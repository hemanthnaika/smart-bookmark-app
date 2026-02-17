import React from "react";
import Hero from "./../components/hero";
import Features from "@/components/features";
import Footer from "@/layout/footer";

const home = () => {
  return (
    <section>
      <Hero />
      <Features />
      <Footer/>
    </section>
  );
};

export default home;
