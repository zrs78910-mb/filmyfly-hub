import { useState, useEffect } from "react";
import { useMovies } from "@/hooks/useMovies";
import { usePagination } from "@/hooks/usePagination";
import { BrandHeader } from "@/components/BrandHeader";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { Pagination } from "@/components/Pagination";
import { MovieDetail } from "@/components/MovieDetail";
import { Movie } from "@/types/movie";

const Index = () => {
  const { filteredMovies, loading, error, searchQuery, setSearchQuery } = useMovies();
  const { currentPage, totalPages, paginatedItems, goToPage, resetPage } = usePagination(filteredMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Handle hash-based routing for movie details
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const title = decodeURIComponent(hash.substring(1));
        const movie = filteredMovies.find((m) => m.Title === title);
        if (movie) {
          setSelectedMovie(movie);
          document.body.style.overflow = "hidden";
        }
      } else {
        setSelectedMovie(null);
        document.body.style.overflow = "auto";
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [filteredMovies]);

  // Reset page when search changes
  useEffect(() => {
    resetPage();
  }, [searchQuery]);

  const handleMovieClick = (movie: Movie) => {
    window.location.hash = encodeURIComponent(movie.Title);
  };

  const handleClose = () => {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    setSelectedMovie(null);
    document.body.style.overflow = "auto";
  };

  const handleReset = () => {
    setSearchQuery("");
    handleClose();
    resetPage();
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Mesh */}
      <div className="fixed inset-0 gradient-mesh opacity-30 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <BrandHeader onReset={handleReset} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <main className="flex-1 container py-8">
          {/* Results Count */}
          {!loading && !error && filteredMovies.length > 0 && (
            <div className="mb-6 animate-fade-in">
              <p className="text-muted-foreground text-sm">
                Showing <span className="text-foreground font-semibold">{paginatedItems.length}</span> of{" "}
                <span className="text-foreground font-semibold">{filteredMovies.length}</span> results
                {searchQuery && (
                  <span>
                    {" "}for "<span className="text-primary">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>
          )}

          {loading ? (
            <SkeletonGrid />
          ) : error ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-block p-4 rounded-full bg-destructive/10 mb-4">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
              </div>
              <p className="text-destructive font-medium">{error}</p>
              <p className="text-muted-foreground text-sm mt-2">Please check your internet connection</p>
            </div>
          ) : (
            <>
              <MovieGrid movies={paginatedItems} onMovieClick={handleMovieClick} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-border/30">
          <div className="container text-center">
            <div className="flex items-center justify-center gap-0.5 mb-2">
              <span className="text-foreground font-bold text-lg tracking-wide">FILMY</span>
              <span className="text-primary font-bold text-lg tracking-wide">FLY</span>
            </div>
            <p className="text-muted-foreground text-xs">© 2025 All Rights Reserved</p>
          </div>
        </footer>
      </div>

      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={handleClose} />
      )}
    </div>
  );
};

export default Index;
