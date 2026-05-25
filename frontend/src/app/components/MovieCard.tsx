import { motion } from "motion/react";
import { Play, Plus, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  rating?: string;
  year?: string;
  genre?: string;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onMovieClick?: (movieId: string) => void;
}

export function MovieCard({ id, title, image, rating, year, genre, isLiked, onLike, onMovieClick }: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMovieClick = () => {
    if (onMovieClick) {
      onMovieClick(id);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLike) {
      onLike(id);
    }
  };

  return (
    <motion.div
      className="relative min-w-[140px] sm:min-w-[180px] md:min-w-[250px] lg:min-w-[300px] cursor-pointer touch-manipulation"
      onClick={handleClick}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      initial={false}
      animate={{
        scale: isExpanded ? 1.05 : 1,
        zIndex: isExpanded ? 10 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[2/3] sm:aspect-video overflow-hidden rounded-md bg-zinc-800 shadow-lg">
        <img
          src={image}
          alt={title}
          className="size-full object-cover"
        />

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 sm:p-4 flex flex-col justify-end"
          >
            <h3 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base line-clamp-2">{title}</h3>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-zinc-300 mb-2 sm:mb-3 flex-wrap">
              {year && <span>{year}</span>}
              {genre && <span className="border border-zinc-500 px-1.5 py-0.5 rounded text-[10px] sm:text-xs">{genre}</span>}
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">

              <button
                className={`rounded-full p-1.5 sm:p-2 hover:bg-zinc-600 active:bg-zinc-500 transition ${
                  isLiked ? "bg-red-600 text-white" : "bg-zinc-700/80 text-white"
                }`}
                onClick={handleLike}
              >
                {isLiked ? <Check className="size-3 sm:size-4" /> : <Check className="size-3 sm:size-4" />}
              </button>
              <button
                className="bg-zinc-700/80 text-white rounded-full p-1.5 sm:p-2 hover:bg-zinc-600 active:bg-zinc-500 transition ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMovieClick();
                }}
              >
                <ChevronDown className="size-3 sm:size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
