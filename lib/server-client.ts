import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
function getEnvironmentVariable() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPERBASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing environment variables for Supabase");
  }
  return { supabaseUrl, supabaseAnonKey };
}

export async function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariable();
  const cookiesStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookiesStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookiesStore.set(name, value, options),
          );
        } catch (error) {
          console.log("Error setting cookies:", error);
        }
      },
    },
  });
}
