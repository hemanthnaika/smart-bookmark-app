import { LucideIcon } from "lucide-react";
import React from "react";

const CustomButton = ({ title, icon }: { title: string; icon: LucideIcon }) => {
  const Icon = icon;
  return (
    <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition w-full md:w-1/2">
      <Icon className="h-4 w-4" />
      {title}
    </button>
  );
};

export default CustomButton;
