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
      
      {/* Enhanced Floating Particles - More dots */}
      <div className="absolute top-2 left-[10%] w-2 h-2 rounded-full bg-primary/60 animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-6 left-[20%] w-1.5 h-1.5 rounded-full bg-gold/70 animate-float" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-4 left-[35%] w-1 h-1 rounded-full bg-cyan/50 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-8 right-[15%] w-2 h-2 rounded-full bg-pink/50 animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-3 right-[25%] w-1.5 h-1.5 rounded-full bg-purple/60 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-4 left-[15%] w-1 h-1 rounded-full bg-accent/50 animate-float" style={{ animationDelay: "2.5s" }} />
      <div className="absolute bottom-6 left-[40%] w-1.5 h-1.5 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-3 right-[30%] w-2 h-2 rounded-full bg-gold/50 animate-float" style={{ animationDelay: "3.5s" }} />
      <div className="absolute bottom-5 right-[20%] w-1 h-1 rounded-full bg-cyan/60 animate-float" style={{ animationDelay: "4s" }} />
      <div className="absolute top-10 left-[50%] w-1.5 h-1.5 rounded-full bg-pink/40 animate-float" style={{ animationDelay: "4.5s" }} />
      <div className="absolute bottom-8 right-[45%] w-1 h-1 rounded-full bg-purple/50 animate-float" style={{ animationDelay: "5s" }} />
      <div className="absolute top-5 right-[40%] w-1.5 h-1.5 rounded-full bg-gold/40 animate-float" style={{ animationDelay: "5.5s" }} />
      
      <div className="relative text-center py-8 px-4">
        <div
          onClick={onReset}
          className="inline-block cursor-pointer transition-all duration-300 active:scale-95 hover:scale-105 group"
        >
          {/* Logo with Side Light Effects */}
          <div className="relative logo-glow">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
              <span className="text-foreground drop-shadow-lg">FILMY</span>
              <span className="text-gradient-primary">FLY</span>
            </h1>
            
            {/* Enhanced Glow Effect on Hover */}
            <div className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 gradient-primary" />
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
