import { Film } from "lucide-react";
import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Film className="w-10 h-10 text-muted-foreground" />
        </div>
        <h5 className="text-muted-foreground text-lg font-medium">No Results Found</h5>
        <p className="text-muted-foreground/60 text-sm mt-1">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
      {movies.map((movie, index) => (
        <MovieCard
          key={`${movie.Title}-${index}`}
          movie={movie}
          onClick={() => onMovieClick(movie)}
          index={index}
        />
      ))}
    </div>
  );
}
