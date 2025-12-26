import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <h5 className="text-muted-foreground text-lg">No Results Found</h5>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={`${movie.Title}-${index}`}
          movie={movie}
          onClick={() => onMovieClick(movie)}
        />
      ))}
    </div>
  );
}
