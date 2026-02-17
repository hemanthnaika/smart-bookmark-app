"use client";

import React, { useState, useMemo } from "react";
import { LucideIcon, X } from "lucide-react";

interface CustomModalProps {
  title: string;
  icon: LucideIcon;
  mode: "folder" | "bookmark";
  isEdit?: boolean;
  defaultTitle?: string;
  defaultURL?: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; url?: string }) => void;
}

const CustomModal = ({
  icon: Icon,
  mode,
  isEdit = false,
  defaultTitle = "",
  defaultURL = "",
  open,
  onClose,
  onSubmit,
}: CustomModalProps) => {
  const initialFolderName = useMemo(
    () => (mode === "folder" ? (isEdit ? defaultTitle : "") : ""),
    [isEdit, defaultTitle, mode],
  );
  const initialBookmarkTitle = useMemo(
    () => (mode === "bookmark" ? (isEdit ? defaultTitle : "") : ""),
    [isEdit, defaultTitle, mode],
  );
  const initialBookmarkURL = useMemo(
    () => (mode === "bookmark" ? (isEdit ? defaultURL : "") : ""),
    [isEdit, defaultURL, mode],
  );

  const [folderName, setFolderName] = useState(initialFolderName);
  const [bookmarkTitle, setBookmarkTitle] = useState(initialBookmarkTitle);
  const [bookmarkURL, setBookmarkURL] = useState(initialBookmarkURL);

  React.useEffect(() => {
    if (!open) return;

    setFolderName(initialFolderName);
    setBookmarkTitle(initialBookmarkTitle);
    setBookmarkURL(initialBookmarkURL);
  }, [open, initialFolderName, initialBookmarkTitle, initialBookmarkURL]);

  const handleSubmit = () => {
    if (mode === "folder") {
      if (!folderName.trim()) return;
      onSubmit({ title: folderName });
    } else {
      if (!bookmarkTitle.trim() || !bookmarkURL.trim()) return;
      onSubmit({ title: bookmarkTitle, url: bookmarkURL });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-text"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {isEdit
            ? mode === "folder"
              ? "Edit Folder"
              : "Edit Bookmark"
            : mode === "folder"
              ? "Create Folder"
              : "Add Bookmark"}
        </h2>

        <div className="flex flex-col gap-3">
          {mode === "folder" ? (
            <input
              type="text"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full rounded-md border border-primary bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          ) : (
            <>
              <input
                type="text"
                placeholder="Bookmark Title"
                value={bookmarkTitle}
                onChange={(e) => setBookmarkTitle(e.target.value)}
                className="w-full rounded-md border border-primary bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="url"
                placeholder="Bookmark URL"
                value={bookmarkURL}
                onChange={(e) => setBookmarkURL(e.target.value)}
                className="w-full rounded-md border border-primary bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </>
          )}

          <button
            onClick={handleSubmit}
            className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
          >
            {isEdit
              ? "Update"
              : mode === "folder"
                ? "Create Folder"
                : "Add Bookmark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
