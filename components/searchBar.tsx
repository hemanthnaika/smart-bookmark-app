import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full max-w-md ">
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search bookmarks..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
