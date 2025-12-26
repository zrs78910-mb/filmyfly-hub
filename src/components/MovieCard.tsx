import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const thumbnail = movie["Thumbnail URL"] || "https://via.placeholder.com/300x450?text=No+Img";

  return (
    <article
      onClick={onClick}
      className="group bg-card border border-border/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-background/50 hover:border-border active:scale-[0.98]"
    >
      <div className="relative aspect-[2/3] bg-secondary overflow-hidden">
        <img
          src={thumbnail}
          alt={movie.Title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-400 group-hover:brightness-110 group-hover:contrast-105 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-muted-foreground truncate transition-colors group-hover:text-foreground">
          {movie.Title}
        </h3>
      </div>
    </article>
  );
}
