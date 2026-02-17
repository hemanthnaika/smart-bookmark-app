import { Folder, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const Folders = () => {
  return (
    <Link href={"/bookmark/1"} className="space-y-2">
      {["Work", "Learning", "Design", "Personal"].map((folder) => (
        <li
          key={folder}
          className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-te hover:bg-secondary hover:text-primary transition"
        >
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            {folder}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
            <button
              className="p-1.5 rounded-md hover:bg-secondary"
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5 text-primary" />
            </button>

            <button
              className="p-1.5 rounded-md hover:bg-red-500/10"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5 text-red-500" />
            </button>
          </div>
        </li>
      ))}
    </Link>
  );
};

export default Folders;
