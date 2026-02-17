"use client";
import { Folder, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import CustomModal from "./customModal";
import { useState } from "react";
import DeleteConfirmationModal from "./deleteConfirmationModal";

const Folders = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("");
  const [folders, setFolders] = useState([
    "Work",
    "Learning",
    "Design",
    "Personal",
  ]);

  const handleEdit = (folderName: string) => {
    setCurrentFolder(folderName);
    setEditOpen(true);
  };

  const handleDelete = (folderName: string) => {
    setCurrentFolder(folderName);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setFolders(folders.filter((f) => f !== currentFolder));
    console.log("Deleted folder:", currentFolder);
  };

  const handleEditSubmit = (data: { title: string }) => {
    setFolders(folders.map((f) => (f === currentFolder ? data.title : f)));
    console.log("Folder updated:", data.title);
  };

  return (
    <>
      <ul className="space-y-2">
        {folders.map((folder) => (
          <li
            key={folder}
            className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-secondary hover:text-primary transition"
          >
            <Link href={`/bookmark/1`} className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              {folder}
            </Link>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                className="p-1.5 rounded-md hover:bg-secondary"
                title="Edit"
                onClick={() => handleEdit(folder)}
              >
                <Pencil className="h-3.5 w-3.5 text-primary" />
              </button>

              <button
                className="p-1.5 rounded-md hover:bg-red-500/10"
                title="Delete"
                onClick={() => handleDelete(folder)}
              >
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editOpen && (
        <CustomModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title="Edit Folder"
          icon={Folder}
          mode="folder"
          isEdit
          defaultTitle={currentFolder}
          onSubmit={handleEditSubmit}
        />
      )}

      {deleteOpen && (
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
