import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Check, Info } from "lucide-react";
import type { Movie } from "./MovieRow";

interface MovieDetailsModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  isLiked?: boolean;
  onLike?: (id: string) => void;
}

export function MovieDetailsModal({ movie, isOpen, onClose, isLiked, onLike }: MovieDetailsModalProps) {
  if (!movie) return null;

  const handleLike = () => {
    if (onLike && movie) {
      onLike(movie.id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
          >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 rounded-lg w-full max-w-4xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
          >
            <X className="size-6" />
          </button>

          {/* Hero Image */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
            <img
              src={movie.image}
              alt={movie.title}
              className="size-full object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h2>
              <div className="flex items-center gap-3 flex-wrap mb-6">
                <button className="bg-zinc-600/70 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded text-sm sm:text-base font-semibold flex items-center gap-1.5 sm:gap-2 hover:bg-zinc-600 active:bg-zinc-700 transition touch-manipulation">
                  <Info className="size-4 sm:size-5 md:size-6" />
                  <span className="hidden xs:inline">More Info</span>
                  <span className="xs:hidden">Info</span>
                </button>
                <button
                  onClick={handleLike}
                  className={`rounded-full p-2.5 sm:p-3 transition ${
                    isLiked ? "bg-red-600 text-white" : "bg-zinc-800/80 text-white hover:bg-zinc-700"
                  }`}
                >
                  {isLiked ? <Check className="size-5 sm:size-6" /> : <Plus className="size-5 sm:size-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4 flex-wrap text-sm sm:text-base">
              {movie.rating && (
                <span className="text-green-400 font-semibold text-lg">{movie.rating} Match</span>
              )}
              {movie.year && <span className="text-zinc-300">{movie.year}</span>}
              {movie.genre && (
                <span className="border border-zinc-600 px-3 py-1 rounded text-zinc-300">
                  {movie.genre}
                </span>
              )}
              <span className="border border-zinc-600 px-3 py-1 rounded text-zinc-300">HD</span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Synopsis</h3>
                <p className="text-zinc-400 leading-relaxed">
                  An epic tale of adventure, courage, and determination. Follow the incredible journey
                  as our heroes face impossible odds and discover the true meaning of friendship and
                  sacrifice. With stunning visuals and a gripping storyline, this cinematic masterpiece
                  will keep you on the edge of your seat from start to finish.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div>
                  <h4 className="text-zinc-500 text-sm mb-1">Cast</h4>
                  <p className="text-white text-sm">
                    Sarah Johnson, Michael Chen, Emma Rodriguez, James Williams
                  </p>
                </div>
                <div>
                  <h4 className="text-zinc-500 text-sm mb-1">Director</h4>
                  <p className="text-white text-sm">Christopher Anderson</p>
                </div>
                <div>
                  <h4 className="text-zinc-500 text-sm mb-1">Genre</h4>
                  <p className="text-white text-sm">{movie.genre || "Action"}, Adventure, Thriller</p>
                </div>
                <div>
                  <h4 className="text-zinc-500 text-sm mb-1">Runtime</h4>
                  <p className="text-white text-sm">2h 14m</p>
                </div>
              </div>
            </div>

                
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
