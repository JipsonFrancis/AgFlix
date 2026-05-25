import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-0 bg-black/90 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="flex items-center">
            <Search className="size-5 text-white ml-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              autoFocus
              className="bg-transparent text-white px-3 py-2 w-[200px] sm:w-[300px] outline-none placeholder:text-zinc-400"
            />
            <button
              type="button"
              onClick={onClose}
              className="text-white p-2 hover:text-zinc-300"
            >
              <X className="size-5" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
