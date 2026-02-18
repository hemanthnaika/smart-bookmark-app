"use client";

import { Folder, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import CustomModal from "./customModal";
import DeleteConfirmationModal from "./deleteConfirmationModal";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getSupabaseBrowserClient } from "@/lib/browser-client";

type FolderType = {
  id: string;
  name: string;
  user_id: string;
  created_at: string | null;
};

const Folders = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();
  const supabase = getSupabaseBrowserClient();

  // ✅ INITIAL FETCH + REALTIME
  useEffect(() => {
    if (!currentUser?.id) return;

    // 1️⃣ Fetch initial data
    const fetchFolders = async () => {
      const { data, error } = await supabase
        .from("folders")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (!error) setFolders(data || []);
    };

    fetchFolders();

    // 2️⃣ Realtime subscription
    const channel = supabase
      .channel("folders-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "folders",
          filter: `user_id=eq.${currentUser.id}`,
        },
        (payload) => {
          const { eventType, new: newRow, old } = payload;

          setFolders((prev) => {
            if (eventType === "INSERT") {
              return [newRow as FolderType, ...prev];
            }

            if (eventType === "UPDATE") {
              return prev.map((f) =>
                f.id === newRow.id ? (newRow as FolderType) : f,
              );
            }

            if (eventType === "DELETE") {
              return prev.filter((f) => f.id !== old.id);
            }

            return prev;
          });
        },
      )
      .subscribe();

    // 3️⃣ Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser?.id, supabase]);

  const handleEdit = (folder: FolderType) => {
    setCurrentFolder(folder);
    setEditOpen(true);
  };

  const handleDelete = (folder: FolderType) => {
    setCurrentFolder(folder);
    setDeleteOpen(true);
  };

  // DELETE
  const confirmDelete = async () => {
    if (!currentFolder || !currentUser) return;

    setLoading(true);

    // 🔥 Optimistically remove from UI
    setFolders((prev) =>
      prev.filter((folder) => folder.id !== currentFolder.id),
    );

    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("id", currentFolder.id)
      .eq("user_id", currentUser.id); // 🔒 security

    if (error) {
      console.error("Delete failed:", error);
    }

    setLoading(false);
    setDeleteOpen(false);
    setCurrentFolder(null);
  };

  // UPDATE
  const handleEditSubmit = async (data: { title: string }) => {
    if (!currentFolder) return;

    setLoading(true);

    await supabase
      .from("folders")
      .update({ name: data.title })
      .eq("id", currentFolder.id);

    setLoading(false);
    setEditOpen(false);
  };

  return (
    <>
      <ul className="space-y-2">
        {folders.length === 0 && (
          <p className="text-sm text-muted-foreground">No folders found.</p>
        )}

        {folders.map((folder) => (
          <li
            key={folder.id}
            className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-secondary hover:text-primary transition"
          >
            <Link
              href={`/bookmark/${folder.id}`}
              className="flex items-center gap-2"
            >
              <Folder className="h-4 w-4" />
              {folder.name}
            </Link>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                className="p-1.5 rounded-md hover:bg-secondary"
                onClick={() => handleEdit(folder)}
              >
                <Pencil className="h-3.5 w-3.5 text-primary" />
              </button>

              <button
                className="p-1.5 rounded-md hover:bg-red-500/10"
                onClick={() => handleDelete(folder)}
              >
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editOpen && currentFolder && (
        <CustomModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title="Edit Folder"
          icon={Folder}
          mode="folder"
          isEdit
          defaultTitle={currentFolder.name}
          onSubmit={handleEditSubmit}
        />
      )}

      {deleteOpen && currentFolder && (
        <DeleteConfirmationModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default Folders;
