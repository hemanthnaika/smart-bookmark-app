"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import Features from "@/components/features";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/browser-client";

const Home = () => {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/bookmark");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase]);

  // Prevent UI flash
  if (loading) return null;

  return (
    <section>
      <Hero />
      <Features />
    </section>
  );
};

export default Home;
