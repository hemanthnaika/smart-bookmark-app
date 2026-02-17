"use client";
import React from "react";
import { Trash2, X } from "lucide-react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "Do you really want to continue? This action cannot be undone.",
}: DeleteConfirmationModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>

        <h2 className="text-gray-900 font-semibold mt-4 text-xl">{title}</h2>
        <p className="text-sm text-gray-600 mt-2 text-center">{description}</p>

        <div className="flex items-center justify-center gap-4 mt-5 w-full">
          <button
            onClick={onClose}
            className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
