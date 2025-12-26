interface BrandHeaderProps {
  onReset: () => void;
}

export function BrandHeader({ onReset }: BrandHeaderProps) {
  return (
    <header className="text-center py-6 px-4 bg-gradient-to-b from-secondary to-background border-b border-border/50">
      <div
        onClick={onReset}
        className="inline-block cursor-pointer transition-transform active:scale-95 hover:scale-105"
      >
        <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none">
          <span className="text-foreground">FILMY</span>
          <span className="text-primary">FLY</span>
        </h1>
        <span className="block text-[0.65rem] text-gold tracking-[6px] font-semibold mt-1">
          PREMIUM
        </span>
      </div>
    </header>
  );
}
