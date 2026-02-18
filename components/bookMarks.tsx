"use client";

import { Book, Link2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomModal from "./customModal";
import DeleteConfirmationModal from "./deleteConfirmationModal";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { supabase } from "@/lib/supabase";

/* ---------------- TYPES ---------------- */

type BookmarkType = {
  id: string;
  title: string;
  url: string;
  folder_id?: string | null;
};

const BookMarks = ({
  folder = false,
  folderId,
}: {
  folder?: boolean;
  folderId?: string;
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState<BookmarkType | null>(
    null,
  );

  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const currentUser = useCurrentUser();

  /* ---------------- FETCH BOOKMARKS ---------------- */

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchBookmarks = async () => {
      let query = supabase
        .from("bookmarks")
        .select("id, title, url, folder_id")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      // ✅ FOLDER MODE
      if (folder && folderId) {
        query = query.eq("folder_id", folderId);
      }

      // ✅ NON-FOLDER MODE (only bookmarks without folder)
      if (!folder) {
        query = query.is("folder_id", null);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Fetch error:", error.message);
        return;
      }

      setBookmarks(data || []);
    };

    fetchBookmarks();

    /* ---------------- REALTIME ---------------- */

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${currentUser.id}`,
        },
        (payload) => {
          const newRow = payload.new as BookmarkType | null;
          const oldRow = payload.old as BookmarkType | null;

          // -------- FILTER REALTIME EVENTS --------

          const isValidForView = (row: BookmarkType | null) => {
            if (!row) return false;

            if (folder && folderId) {
              return row.folder_id === folderId;
            }

            if (!folder) {
              return row.folder_id === null;
            }

            return true;
          };

          if (payload.eventType === "INSERT") {
            if (isValidForView(newRow)) {
              setBookmarks((prev) => [newRow!, ...prev]);
            }
          }

          if (payload.eventType === "UPDATE") {
            setBookmarks((prev) => {
              const exists = prev.find((b) => b.id === newRow?.id);

              // If updated row no longer belongs here → remove it
              if (exists && !isValidForView(newRow)) {
                return prev.filter((b) => b.id !== newRow?.id);
              }

              // If it now belongs here → add/update it
              if (isValidForView(newRow)) {
                if (exists) {
                  return prev.map((b) => (b.id === newRow!.id ? newRow! : b));
                }
                return [newRow!, ...prev];
              }

              return prev;
            });
          }

          if (payload.eventType === "DELETE") {
            if (oldRow) {
              setBookmarks((prev) => prev.filter((b) => b.id !== oldRow.id));
            }
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser?.id, folder, folderId]);

  /* ---------------- ACTIONS ---------------- */

  const handleEdit = (bookmark: BookmarkType) => {
    setCurrentBookmark(bookmark);
    setEditOpen(true);
  };

  const handleDelete = (bookmark: BookmarkType) => {
    setCurrentBookmark(bookmark);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentBookmark) return;

    // ✅ Optimistic UI update (instant remove)
    setBookmarks((prev) => prev.filter((b) => b.id !== currentBookmark.id));

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", currentBookmark.id);

    if (error) {
      console.error("Delete error:", error.message);

      // ❌ rollback if delete fails
      setBookmarks((prev) => [currentBookmark, ...prev]);
      return;
    }

    setDeleteOpen(false);
  };

  /* ---------------- EDIT SUBMIT ---------------- */

  const handleEditSubmit = async (data: {
    title: string;
    url?: string;
    folder_id?: string;
  }) => {
    if (!currentBookmark) return;

    const { error } = await supabase
      .from("bookmarks")
      .update({
        title: data.title,
        folder_id: data.folder_id ?? null,
      })
      .eq("id", currentBookmark.id);

    if (error) {
      console.error("Update error:", error.message);
      return;
    }

    setEditOpen(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className="space-y-3">
        {bookmarks.length === 0 && (
          <p className="text-sm text-muted-foreground">No bookmarks found.</p>
        )}

        {bookmarks.map((bookmark) => {
          const domain = new URL(bookmark.url).hostname;

          return (
            <div
              key={bookmark.id}
              className="group flex items-center justify-between rounded-lg px-4 py-3 hover:bg-secondary transition"
            >
              <div className="flex items-center gap-3 text-sm">
                <Image
                  width={20}
                  height={20}
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                  alt={domain}
                />

                <Link2 className="h-4 w-4 text-primary" />

                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-[220px]">
                    {bookmark.title}
                  </span>

                  <Link
                    href={bookmark.url}
                    target="_blank"
                    className="text-xs text-primary truncate max-w-[220px]"
                  >
                    {bookmark.url}
                  </Link>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => handleEdit(bookmark)}>
                  <Pencil className="h-4 w-4 text-primary" />
                </button>

                <button onClick={() => handleDelete(bookmark)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editOpen && currentBookmark && (
        <CustomModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title="Edit Bookmark"
          icon={Book}
          mode="bookmark"
          isEdit
          defaultTitle={currentBookmark.title}
          defaultURL={currentBookmark.url}
          defaultFolderId={currentBookmark.folder_id ?? ""}
          onSubmit={handleEditSubmit}
        />
      )}

      {deleteOpen && currentBookmark && (
        <DeleteConfirmationModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default BookMarks;
