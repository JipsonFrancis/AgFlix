import { MovieCard } from "./MovieCard";
import type { Movie } from "./MovieRow";

interface MovieGridProps {
  movies: Movie[];
  likedMovies?: string[];
  onLike?: (id: string) => void;
  onMovieClick?: (movieId: string) => void;
}

export function MovieGrid({ movies, likedMovies = [], onLike, onMovieClick }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-12">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          isLiked={likedMovies.includes(movie.id)}
          onLike={onLike}
          onMovieClick={onMovieClick}
        />
      ))}
    </div>
  );
}
