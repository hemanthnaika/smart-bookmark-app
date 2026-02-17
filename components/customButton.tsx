"use client";

import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import CustomModal from "./customModal";

interface CustomButtonProps {
  title: string;
  icon: LucideIcon;
  mode: "folder" | "bookmark";
}

const CustomButton = ({ title, icon: Icon, mode }: CustomButtonProps) => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [bookmarkTitle, setBookmarkTitle] = useState("");
  const [bookmarkURL, setBookmarkURL] = useState("");

  const handleSubmit = () => {
    if (mode === "folder") {
      console.log("Folder created:", folderName);
    } else {
      console.log("Bookmark created:", bookmarkTitle, bookmarkURL);
    }
    setOpen(false);
    setFolderName("");
    setBookmarkTitle("");
    setBookmarkURL("");
  };

  return (
    <>
      <button
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition w-full md:w-1/2"
        onClick={() => setOpen(true)}
      >
        <Icon className="h-4 w-4" />
        {title}
      </button>
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        icon={Icon}
        mode={mode}
        isEdit
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CustomButton;
