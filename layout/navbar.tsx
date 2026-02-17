"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets";
import CustomLayout from "@/components/customLayout";
import LoginButton from "@/components/loginButton";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
const isAuth = true;
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
  <header
    className={`left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "fixed top-0 bg-white/80 backdrop-blur-sm shadow-md"
            : "absolute top-0"
        }
      `}
  >
    <CustomLayout>
      <nav className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Smart Bookmark Logo"
            width={25}
            height={25}
            priority
          />
          <span className="font-poppins font-semibold text-sm text-primary">
            Smart Bookmark
          </span>
        </Link>
        {isAuth ? (
          <div className="flex items-center gap-4">
            <button className="bg-red-500  text-white px-5 py-1 rounded-md font-poppins font-bold">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <LoginButton title="Get Started" />
          </div>
        )}
      </nav>
    </CustomLayout>
  </header>
);
};

export default Navbar;
