import { useState, useMemo } from "react";
import { HeroBanner } from "../components/HeroBanner";
import { MovieGrid } from "../components/MovieGrid";
import { MovieRow } from "../components/MovieRow";
import { Pagination } from "../components/Pagination";
import type { Movie } from "../components/MovieRow";


const MOVIES_PER_PAGE = 9;

interface HomeProps {
  likedMovies: string[];
  onLike: (id: string) => void;
  onMovieClick: (movieId: string) => void;
  movies: Movie[];
}

export function Home({
  likedMovies,
  onLike,
  onMovieClick,
  movies,
}: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1);

    const featuredMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;

    // Pick highest rated movie as featured
    return [...movies].sort((a, b) => {
      const aRating = parseInt(a.rating.replace("%", "")) || 0;
      const bRating = parseInt(b.rating.replace("%", "")) || 0;
      return bRating - aRating;
    })[0];
  }, [movies]);


  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  const currentMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE);
  }, [currentPage, movies]);


  const likedMoviesList = useMemo(() => {
    return movies.filter((movie) => likedMovies.includes(movie.id));
  }, [movies, likedMovies]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pb-8">


      <HeroBanner {...featuredMovie} />

      <div className="relative -mt-20 sm:-mt-28 md:-mt-32 z-10">


        <h2 className="text-white font-semibold mb-3 sm:mb-4 px-4 sm:px-6 md:px-12 text-base sm:text-lg md:text-xl">
          Popular Movies
        </h2>

        <MovieGrid
          movies={currentMovies}
          likedMovies={likedMovies}
          onLike={onLike}
          onMovieClick={onMovieClick}
        />


        {likedMoviesList.length > 0 && (
          <div className="mt-12">
            <MovieRow
              title="My List"
              movies={likedMoviesList}
              likedMovies={likedMovies}
              onLike={onLike}
              onMovieClick={onMovieClick}
            />
          </div>
        )}


        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}