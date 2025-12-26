import { useState, useEffect, useMemo } from "react";
import { Movie } from "@/types/movie";

const API_URL = "https://script.google.com/macros/s/AKfycbw90pV76-vyhxBpj77JvbV-UFUjn1-r4RDsuj9GSJ_WC3btyllVR-X-9IDOVNDIYrcG/exec";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const filtered = data.filter((m: Movie) => m.Title);
        setMovies(filtered);
      } catch (err) {
        setError("Server Error. Check Internet.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) return movies;
    return movies.filter((m) =>
      m.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  return {
    movies,
    filteredMovies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
  };
}
