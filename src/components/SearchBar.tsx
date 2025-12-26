import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50 shadow-lg shadow-background/50">
      <div className="container py-3">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search movies, series..."
            className="w-full bg-secondary border border-border rounded-xl py-3 px-5 pl-12 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
          />
        </div>
      </div>
    </nav>
  );
}
