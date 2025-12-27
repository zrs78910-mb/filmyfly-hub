import { Play } from "lucide-react";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  index?: number;
}

export function MovieCard({ movie, onClick, index = 0 }: MovieCardProps) {
  const thumbnail = movie["Thumbnail URL"] || "https://via.placeholder.com/300x450?text=No+Img";

  // Generate quality badge from title
  const getQualityBadge = () => {
    const title = movie.Title.toLowerCase();
    if (title.includes("4k")) return { label: "4K", color: "gradient-gold" };
    if (title.includes("1080p")) return { label: "1080p", color: "gradient-primary" };
    if (title.includes("720p")) return { label: "720p", color: "gradient-accent" };
    return { label: "HD", color: "gradient-purple" };
  };

  const quality = getQualityBadge();

  return (
    <article
      onClick={onClick}
      className="group rounded-xl cursor-pointer card-hover rainbow-border animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "backwards" }}
    >
      {/* Inner Card Content */}
      <div className="relative overflow-hidden rounded-lg">
        {/* Poster Container */}
        <div className="relative aspect-[2/3] bg-secondary overflow-hidden">
          {/* Image */}
          <img
            src={thumbnail}
            alt={movie.Title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          {/* Quality Badge */}
          <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${quality.color} text-foreground shadow-lg`}>
            {quality.label}
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center glow-primary transform scale-75 group-hover:scale-100 transition-transform duration-500">
              <Play className="w-6 h-6 text-foreground fill-current ml-1" />
            </div>
          </div>

          {/* Shimmer Effect on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Title Section */}
        <div className="p-3 relative">
          <h3 className="text-sm font-medium text-muted-foreground truncate transition-colors duration-300 group-hover:text-foreground">
            {movie.Title}
          </h3>
          
          {/* Animated Underline */}
          <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-pink rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </article>
  );
}
