"use client";

import React, { useState } from "react";
import { Book, Folder } from "lucide-react";
import CustomModal from "./customModal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getSupabaseBrowserClient } from "@/lib/browser-client";

interface CustomButtonProps {
  title: string;
  mode: "folder" | "bookmark";
}

/* ---------- SUBMIT DATA TYPES ---------- */
type SubmitData =
  | { title: string } // folder
  | { title: string; url: string; folder_id?: string }; // bookmark

const CustomButton = ({ title, mode }: CustomButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = getSupabaseBrowserClient();
  const currentUser = useCurrentUser();

  /* ---------- HANDLE SUBMIT ---------- */
  const handleSubmit = async (data: SubmitData) => {
    if (!currentUser?.id) {
      console.log("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      /* ---------- CREATE FOLDER ---------- */
      if (mode === "folder") {
        const { error } = await supabase.from("folders").insert({
          name: data.title,
          user_id: currentUser.id,
        });

        if (error) throw error;
      }

      /* ---------- CREATE BOOKMARK ---------- */
      if (mode === "bookmark") {
        if (!("url" in data)) {
          throw new Error("URL is required for bookmarks");
        }

        const { error } = await supabase.from("bookmarks").insert({
          title: data.title,
          url: data.url,
          user_id: currentUser.id,
          folder_id: data.folder_id ?? null,
        });

        if (error) throw error;
      }

      setOpen(false);
    } catch (error) {
      console.error("Error creating item:", error);
    } finally {
      setLoading(false);
    }
  };

  const Icon = mode === "folder" ? Folder : Book;

  return (
    <>
      <button
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition w-full md:w-1/2"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        <Icon className="h-4 w-4" />
        {title}
      </button>

      {/* ---------- MODAL ---------- */}
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        icon={Icon}
        mode={mode}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CustomButton;
