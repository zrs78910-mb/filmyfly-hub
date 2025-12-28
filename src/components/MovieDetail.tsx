import { useState } from "react";
import { ArrowLeft, Bolt, Download, Images, Play, Sparkles } from "lucide-react";
import { Movie } from "@/types/movie";
import { PremiumLinkModal } from "./PremiumLinkModal";

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

function generateTags(title: string) {
  const t = title.toLowerCase();
  const tags: { label: string; type: "quality" | "language" | "audio" }[] = [];
  
  if (t.includes("hindi")) tags.push({ label: "Hindi", type: "language" });
  if (t.includes("english")) tags.push({ label: "English", type: "language" });
  if (t.includes("dual audio")) tags.push({ label: "Dual Audio", type: "audio" });
  if (t.includes("4k")) tags.push({ label: "4K UHD", type: "quality" });
  else if (t.includes("1080p")) tags.push({ label: "1080p", type: "quality" });
  else if (t.includes("720p")) tags.push({ label: "720p", type: "quality" });
  else tags.push({ label: "HD", type: "quality" });

  return tags;
}

function parseLinks(text?: string) {
  if (!text) return null;

  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  const elements: { type: "header" | "link"; label: string; url?: string }[] = [];

  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;

    if (!line.includes("http") && (line.match(/^[-~•]/) || line.toLowerCase().includes("episode"))) {
      const clean = line.replace(/^[-~•\s]+|[-~•\s]+$/g, "").trim();
      if (clean) elements.push({ type: "header", label: clean });
    } else if (line.includes("http")) {
      const match = line.match(/(https?:\/\/[^\s]+)/);
      if (match) {
        const url = match[0];
        const label = line.replace(url, "").replace(/[:]/g, "").trim() || "Download File";
        elements.push({ type: "link", label, url });
      }
    }
  });

  return elements;
}

// Different colors for download buttons
const buttonColors = [
  "from-primary to-pink",
  "from-cyan to-purple",
  "from-gold to-accent",
  "from-purple to-primary",
  "from-pink to-gold",
  "from-accent to-cyan",
];

export function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const thumbnail = movie["Thumbnail URL"] || "";
  const tags = generateTags(movie.Title);
  const links = parseLinks(movie["Download Links"]);
  const screenshot = movie["Screenshot URL"];

  // Premium Link Modal State
  const [premiumModal, setPremiumModal] = useState<{
    isOpen: boolean;
    url: string;
    label: string;
  }>({ isOpen: false, url: "", label: "" });

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, label: string) => {
    e.preventDefault();
    setPremiumModal({ isOpen: true, url, label });
  };

  const getTagStyle = (type: string) => {
    switch (type) {
      case "quality": return "gradient-primary";
      case "language": return "bg-cyan/20 text-cyan border border-cyan/30";
      case "audio": return "bg-purple/20 text-purple border border-purple/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto animate-fade-in">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="fixed top-4 left-4 z-[110] w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:scale-110 active:scale-95 group"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Blurred Backdrop Image */}
      {thumbnail && (
        <div className="fixed top-0 left-0 w-full h-[60vh] -z-10">
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover blur-xl scale-110 opacity-30 animate-blur-in"
          />
          {/* Gradient Mesh Overlay */}
          <div className="absolute inset-0 gradient-mesh opacity-40" />
        </div>
      )}

      {/* Full Page Black Gradient from Bottom to Top */}
      <div className="fixed inset-0 pointer-events-none -z-[5]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 via-40% to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-background via-background/80 via-60% to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-background" />
      </div>

      {/* Content */}
      <main className="container max-w-5xl pt-20 pb-12">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 animate-slide-up">
          {/* Poster with Thick Animated Rainbow Border Glow */}
          <div className="flex justify-center md:justify-start">
            <div className="relative group detail-poster-glow poster-glow">
              <img
                src={thumbnail || "https://via.placeholder.com/300x450?text=No+Img"}
                alt={movie.Title}
                className="relative z-10 w-full max-w-[280px] rounded-2xl shadow-2xl backdrop-shadow transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center glow-primary animate-pulse-glow">
                  <Play className="w-7 h-7 text-foreground fill-current ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6 relative">
            
            {/* Title Section */}
            <div className="relative">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 animate-fade-in relative z-10" style={{ animationDelay: "0.1s" }}>
                {movie.Title}
              </h1>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 animate-fade-in relative z-10" style={{ animationDelay: "0.2s" }}>
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getTagStyle(tag.type)}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
              This file is protected and hosted on high-speed servers. 
              Click below to download instantly with maximum speed.
            </p>

            {/* Download Links Section */}
            <section className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-5">
                <div className="p-1.5 rounded-lg gradient-gold">
                  <Bolt className="w-4 h-4 text-gold-foreground" />
                </div>
                <span className="text-gradient-gold">Download Links</span>
              </h2>

              {links && links.length > 0 ? (
                <div className="space-y-2">
                  {links.map((item, i) =>
                    item.type === "header" ? (
                      <div key={i} className="text-sm text-muted-foreground font-semibold pt-3 first:pt-0 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-gold" />
                        {item.label}
                      </div>
                    ) : (
                      <a
                        key={i}
                        href={item.url}
                        onClick={(e) => handleDownloadClick(e, item.url!, item.label)}
                        className="group flex items-center justify-between border border-border rounded-xl px-4 py-3.5 text-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 100%)`,
                        }}
                      >
                        {/* Colored Gradient Overlay */}
                        <div 
                          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${buttonColors[i % buttonColors.length]}`}
                        />
                        <span className="truncate pr-4 font-medium relative z-10">{item.label}</span>
                        {/* 3D Download Icon */}
                        <div 
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${buttonColors[i % buttonColors.length]} download-icon-3d group-hover:scale-110 group-hover:-translate-y-0.5`}
                        >
                          <Download className="w-5 h-5 text-foreground drop-shadow-md" />
                        </div>
                      </a>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="font-medium">Links coming soon...</p>
                  <p className="text-sm mt-1 opacity-70">Check back later for download options</p>
                </div>
              )}
            </section>

            {/* Screenshot Section */}
            {screenshot && (
              <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4">
                  <div className="p-1.5 rounded-lg bg-purple/20">
                    <Images className="w-4 h-4 text-purple" />
                  </div>
                  <span className="text-purple">Preview / Screenshots</span>
                </h2>
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={screenshot}
                    alt="Screenshot"
                    className="w-full rounded-xl border border-border transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm mt-16 pt-8 border-t border-border/30 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center justify-center gap-2">
            <span className="text-foreground font-bold">FILMY</span>
            <span className="text-primary font-bold">FLY</span>
            <span className="shimmer-text text-xs">PREMIUM</span>
          </div>
          <p className="mt-2 opacity-60">© 2025 All Rights Reserved</p>
        </footer>
      </main>

      {/* Premium Link Modal */}
      <PremiumLinkModal
        isOpen={premiumModal.isOpen}
        onClose={() => setPremiumModal({ isOpen: false, url: "", label: "" })}
        originalUrl={premiumModal.url}
        linkLabel={premiumModal.label}
        movieTitle={movie.Title}
      />
    </div>
  );
}
