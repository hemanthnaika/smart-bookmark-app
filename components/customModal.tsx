"use client";

import React, { useEffect, useState } from "react";
import { LucideIcon, X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/browser-client";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface FolderType {
  id: string;
  name: string;
}

interface CustomModalProps {
  title: string;
  icon: LucideIcon;
  mode: "folder" | "bookmark";
  isEdit?: boolean;
  defaultTitle?: string;
  defaultURL?: string;
  defaultFolderId?: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; url?: string; folder_id?: string }) => void;
}

const CustomModal = ({
  icon: Icon,
  mode,
  isEdit = false,
  defaultTitle = "",
  defaultURL = "",
  defaultFolderId = "",
  open,
  onClose,
  onSubmit,
}: CustomModalProps) => {
  const supabase = getSupabaseBrowserClient();
  const currentUser = useCurrentUser();

  /* ---------- STATE (INITIALIZED FROM PROPS) ---------- */
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [folderName, setFolderName] = useState(defaultTitle);
  const [bookmarkTitle, setBookmarkTitle] = useState(defaultTitle);
  const [bookmarkURL, setBookmarkURL] = useState(defaultURL);
  const [selectedFolder, setSelectedFolder] = useState(defaultFolderId);

  /* ---------- FETCH USER FOLDERS (BOOKMARK ONLY) ---------- */
  useEffect(() => {
    if (!open || mode !== "bookmark" || !currentUser?.id) return;

    const fetchFolders = async () => {
      const { data, error } = await supabase
        .from("folders")
        .select("id, name")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (!error) setFolders(data || []);
    };

    fetchFolders();
  }, [open, mode, currentUser?.id, supabase]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = () => {
    if (mode === "folder") {
      if (!folderName.trim()) return;
      onSubmit({ title: folderName });
    } else {
      if (!bookmarkTitle.trim() || !bookmarkURL.trim()) return;

      onSubmit({
        title: bookmarkTitle,
        url: bookmarkURL,
        folder_id: selectedFolder || undefined,
      });
    }

    onClose();
  };

  if (!open) return null;

  /* ---------- UI ---------- */
  return (
    <div
      key={`${mode}-${isEdit}-${defaultTitle}-${defaultFolderId}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
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
          {mode === "folder" && (
            <input
              type="text"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full rounded-md border border-primary bg-secondary px-3 py-2 text-sm"
            />
          )}

          {mode === "bookmark" && (
            <>
              <input
                type="text"
                placeholder="Bookmark Title"
                value={bookmarkTitle}
                onChange={(e) => setBookmarkTitle(e.target.value)}
                className="w-full rounded-md border border-primary bg-secondary px-3 py-2 text-sm"
              />

              <input
                type="url"
                placeholder="Bookmark URL"
                value={bookmarkURL}
                onChange={(e) => setBookmarkURL(e.target.value)}
                className="w-full rounded-md border border-primary bg-secondary px-3 py-2 text-sm"
              />

              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full rounded-md border border-primary bg-secondary px-3 py-2 text-sm"
              >
                <option value="">No Folder</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <button
            onClick={handleSubmit}
            className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
