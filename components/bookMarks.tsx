import { Link2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    url: "https://github.com",
    title: "GitHub",
  },
  {
    url: "https://tailwindcss.com",
    title: "Tailwind CSS",
  },
  {
    url: "https://figma.com",
    title: "Figma",
  },
  {
    url: "https://www.smilebox.com",
    title: "Smilebox",
  },
];

const BookMarks = () => {
  return (
    <div className="space-y-3">
      {links.map((link) => {
        const domain = new URL(link.url).hostname;

        return (
          <div
            key={link.title}
            className="group flex items-center justify-between rounded-lg px-4 py-3 hover:bg-secondary transition hover:cursor-pointer"
          >
            {/* Left content */}
            <div className="flex items-center gap-3 text-sm">
              <Image
                width={20}
                height={20}
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                alt={domain}
                className="h-5 w-5 rounded"
              />

              <Link2 className="h-4 w-4 text-primary" />

              <div className="flex flex-col">
                <span className="text-text font-medium truncate max-w-[220px]">
                  {link.title}
                </span>

                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline truncate max-w-[220px]"
                >
                  {link.url}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                className="p-2 rounded-lg hover:bg-secondary transition"
                title="Edit"
              >
                <Pencil className="h-4 w-4 text-primary" />
              </button>

              <button
                className="p-2 rounded-lg hover:bg-red-500/10 transition"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookMarks;
