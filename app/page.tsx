import React from "react";
import Hero from "./../components/hero";
import Features from "@/components/features";
import { redirect } from "next/navigation";

const Home = () => {
  const isAuth = true;
  if (isAuth) {
    redirect("/bookmark");
  }
  return (
    <section>
      <Hero />
      <Features />
    </section>
  );
};

export default Home;
