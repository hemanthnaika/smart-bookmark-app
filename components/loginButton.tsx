"use client";

import { google } from "@/assets";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const GoogleModel = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full max-w-sm mx-4 rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex justify-center">
          <Image src={google} alt="Google" className="h-10 w-10" />
        </div>

        <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
          Sign in with Google
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Continue to <span className="font-medium">Smart Bookmark</span>
        </p>

        <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          <Image src={google} alt="Google" className="h-4 w-4" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-gray-400">
          We never post without permission
        </p>
      </div>
    </div>
  );
};
const LoginButton = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="rounded-full bg-primary px-4 py-2 text-sm font-poppins font-medium text-white hover:bg-primary/80 transition "
        onClick={() => setOpen(true)}
      >
        {title}
      </button>
      <GoogleModel open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default LoginButton;
