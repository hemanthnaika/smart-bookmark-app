"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/browser-client";

export const useCurrentUser = () => {
  const supabase = getSupabaseBrowserClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return currentUser;
};
