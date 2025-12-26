import { Sparkles } from "lucide-react";

interface BrandHeaderProps {
  onReset: () => void;
}

export function BrandHeader({ onReset }: BrandHeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Floating Particles */}
      <div className="absolute top-4 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-8 right-1/3 w-1.5 h-1.5 rounded-full bg-gold/50 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-4 left-1/3 w-1 h-1 rounded-full bg-cyan/40 animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative text-center py-8 px-4">
        <div
          onClick={onReset}
          className="inline-block cursor-pointer transition-all duration-300 active:scale-95 hover:scale-105 group"
        >
          {/* Logo */}
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
              <span className="text-foreground drop-shadow-lg">FILMY</span>
              <span className="text-gradient-primary">FLY</span>
            </h1>
            
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 gradient-primary" />
          </div>
          
          {/* Premium Badge */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
            <span className="shimmer-text text-xs tracking-[6px] font-bold uppercase">
              PREMIUM
            </span>
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </header>
  );
}
