import { Search, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";
import { SignInModal } from "./components/SignInModal";
import { MovieDetailsModal } from "./components/MovieDetailsModal";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import axios from "axios";
import type { Movie } from "./components/MovieRow";

interface ApiMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  878: "Sci-Fi",
  27: "Horror",
  53: "Thriller",
  18: "Drama",
};

const mapMovies = (results: ApiMovie[]): Movie[] => {
  return results.map((movie) => ({
    id: String(movie.id),
    title: movie.title,
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    rating: `${Math.round(movie.vote_average * 10)}%`,
    year: movie.release_date?.split("-")[0] || "N/A",
    genre:
      movie.genre_ids
        ?.map((id) => genreMap[id])
        .filter(Boolean)
        .join(", ") || "Unknown",
  }));
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [likedMovies, setLikedMovies] = useState<string[]>([]);

  const [movies, setMovies] = useState<Movie[]>([]);

  const [user, setUser] = useState<{
    name?: string;
    email?: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=9d688a90853392410d1b2c9afac5c8cb`
        );

        const data = await response.json();

        const formatted = mapMovies(data.results);

        setMovies(formatted);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }


  const handleLike = (movieId: string) => {
    setLikedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleMovieClick = (movieId: string) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      setSelectedMovie(movie);
    }
  };

 
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-4">

            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-white p-1"
              >
                <Menu className="size-6" />
              </button>

              <Link to="/">
                <h1 className="text-red-600 font-bold text-xl sm:text-2xl md:text-3xl">
                  AgFLIX
                </h1>
              </Link>

              <div className="hidden md:flex gap-6 text-white text-sm">
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">

              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white"
              >
                <Search className="size-5 sm:size-6" />
              </button>

              <button
                onClick={() => setIsSignInOpen(true)}
                className="text-white"
              >
                <div className="size-7 sm:size-8 rounded bg-red-600 flex items-center justify-center">
                  <User className="size-4 sm:size-5" />
                </div>
              </button>

            </div>
          </div>
        </nav>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
          user={user}
          setUser={setUser}
        />

        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isLiked={
            selectedMovie
              ? likedMovies.includes(selectedMovie.id)
              : false
          }
          onLike={handleLike}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                likedMovies={likedMovies}
                onLike={handleLike}
                onMovieClick={handleMovieClick}
                movies={movies}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}