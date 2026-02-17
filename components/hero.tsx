import { ChevronRight, MoveRight } from "lucide-react";
import LoginButton from "./loginButton";

const Hero = () => {
  return (
    <section className="bg-[url('https://assets.prebuiltui.com/images/components/hero-section/hero-purlecyan-gradientimg.png')] w-full bg-no-repeat bg-cover bg-center text-sm pb-44 pt-40 h-screen">
      <div className="flex items-center gap-2 border border-slate-300 hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 ">
        <span>Save and organize links effortlessly</span>
        <button className="flex items-center gap-1 font-medium">
          <span>See how it works</span>
          <MoveRight className="w-5 h-5" />
        </button>
      </div>

      <h5 className="text-4xl/relaxed md:text-7xl font-medium max-w-212.5 text-center mx-auto mt-8 font-poppins ">
        Smart way to save and manage bookmarks
      </h5>

      <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2">
        Keep all your important links in one place. Access them anytime,
        anywhere, with real-time sync across all your devices.
      </p>

      <div className="mx-auto w-full flex items-center justify-center gap-3 mt-4">
        <LoginButton title="Start Saving Links" />

        <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-200/30 rounded-full px-6 py-3">
          <span>Learn More</span>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Hero;
