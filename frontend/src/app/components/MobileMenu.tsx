import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Link } from "react-router";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-zinc-900 z-50 md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h2 className="text-red-600 font-bold text-2xl">AgFLIX</h2>
              <button
                onClick={onClose}
                className="text-white p-2 hover:bg-zinc-800 rounded-full transition"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-1">
              <Link
                to="/"
                className="text-white px-4 py-3 rounded-md hover:bg-zinc-800 transition"
                onClick={onClose}
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="text-white px-4 py-3 rounded-md hover:bg-zinc-800 transition"
                onClick={onClose}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
