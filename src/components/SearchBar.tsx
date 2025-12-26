import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/30 shadow-2xl shadow-background/80">
      <div className="container py-4">
        <div className="relative max-w-2xl mx-auto group">
          {/* Search Icon with Animation */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 group-focus-within:scale-110">
            <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
          </div>
          
          {/* Input Field */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search movies, series, shows..."
            className="w-full bg-secondary/80 border-2 border-border/50 rounded-2xl py-3.5 px-5 pl-12 pr-12 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300 focus:bg-secondary focus:border-primary/50 focus:shadow-[0_0_30px_hsl(var(--primary)/0.15)] hover:border-border"
          />
          
          {/* Clear Button */}
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 animate-scale-in"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Gradient Border on Focus */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-primary via-purple to-cyan opacity-30" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }} />
          </div>
        </div>
      </div>
    </nav>
  );
}
