import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { MovieCard } from "./MovieCard";

export interface Movie {
  id: string;
  title: string;
  image: string;
  rating?: string;
  year?: string;
  genre?: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  likedMovies?: string[];
  onLike?: (id: string) => void;
  onMovieClick?: (movieId: string) => void;
}

export function MovieRow({ title, movies, likedMovies = [], onLike, onMovieClick }: MovieRowProps) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="group relative mb-6 sm:mb-8">
      <h2 className="text-white font-semibold mb-3 sm:mb-4 px-4 sm:px-6 md:px-12 text-base sm:text-lg md:text-xl">
        {title}
      </h2>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-10 lg:w-12 bg-gradient-to-r from-black/90 to-transparent items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="size-6 lg:size-8 text-white" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-12 scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start">
              <MovieCard
                {...movie}
                isLiked={likedMovies.includes(movie.id)}
                onLike={onLike}
                onMovieClick={onMovieClick}
              />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 w-10 lg:w-12 bg-gradient-to-l from-black/90 to-transparent items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="size-6 lg:size-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
