"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets";
import CustomLayout from "@/components/customLayout";
import LoginButton from "@/components/loginButton";
import { getSupabaseBrowserClient } from "@/lib/browser-client";
import { User } from "@supabase/supabase-js";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Supabase auth listener
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  // ✅ Logout + redirect
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    router.replace("/");
  };

  return (
    <header
      className={`left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "fixed top-0 bg-white/80 backdrop-blur-sm shadow-md"
          : "absolute top-0"
      }`}
    >
      <CustomLayout>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Smart Bookmark Logo"
              width={30}
              height={30}
              priority
            />
            <span className="font-poppins font-semibold text-sm text-primary">
              Smart Bookmark
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4 relative">
            {currentUser ? (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 hover:shadow-md transition"
                >
                  <Image
                    src={
                      currentUser.user_metadata?.avatar_url ||
                      "/default-avatar.png"
                    }
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-text truncate max-w-[120px]">
                    {currentUser.user_metadata?.full_name || currentUser.email}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-48 rounded-xl bg-white shadow-lg border border-gray-200 p-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition text-sm text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <LoginButton title="Get Started" />
            )}
          </div>
        </nav>
      </CustomLayout>
    </header>
  );
};

export default Navbar;
