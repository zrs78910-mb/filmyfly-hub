import { ArrowLeft, Bolt, Download, Images } from "lucide-react";
import { Movie } from "@/types/movie";

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

function generateTags(title: string) {
  const t = title.toLowerCase();
  const tags: { label: string; isQuality?: boolean }[] = [];
  
  if (t.includes("hindi")) tags.push({ label: "Hindi" });
  if (t.includes("dual audio")) tags.push({ label: "Dual Audio" });
  if (t.includes("4k")) tags.push({ label: "4K UHD", isQuality: true });
  else if (t.includes("1080p")) tags.push({ label: "1080p", isQuality: true });
  else tags.push({ label: "HD", isQuality: true });

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

export function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const thumbnail = movie["Thumbnail URL"] || "";
  const tags = generateTags(movie.Title);
  const links = parseLinks(movie["Download Links"]);
  const screenshot = movie["Screenshot URL"];

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto animate-fade-in">
      {/* Back Button */}
      <button
        onClick={onClose}
        className="fixed top-5 left-5 z-[110] w-11 h-11 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground transition-colors hover:bg-secondary"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Backdrop */}
      {thumbnail && (
        <div
          className="fixed top-0 left-0 w-full h-[60vh] -z-10 opacity-30"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        >
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover blur-[25px] scale-110"
          />
        </div>
      )}

      {/* Content */}
      <main className="container max-w-4xl pt-20 pb-10 animate-slide-up">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Poster */}
          <div className="flex justify-center">
            <img
              src={thumbnail || "https://via.placeholder.com/300x450?text=No+Img"}
              alt={movie.Title}
              className="w-full max-w-[280px] rounded-xl border border-border/50 shadow-2xl"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4">{movie.Title}</h1>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tag.isQuality
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              This file is protected and hosted on high-speed servers. Click below to download instantly.
            </p>

            {/* Download Links */}
            <section className="bg-card/50 border border-border/50 rounded-2xl p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-4">
                <Bolt className="w-4 h-4 text-gold" />
                Download Links
              </h2>

              {links && links.length > 0 ? (
                <div className="space-y-2">
                  {links.map((item, i) =>
                    item.type === "header" ? (
                      <div key={i} className="text-sm text-muted-foreground font-medium pt-2 first:pt-0">
                        {item.label}
                      </div>
                    ) : (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-secondary border border-border rounded-xl px-4 py-3 text-foreground transition-colors hover:bg-muted hover:border-primary"
                      >
                        <span className="truncate pr-4">{item.label}</span>
                        <Download className="w-4 h-4 flex-shrink-0" />
                      </a>
                    )
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">Links coming soon...</p>
              )}
            </section>

            {/* Screenshot */}
            {screenshot && (
              <section className="mt-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-4">
                  <Images className="w-4 h-4 text-gold" />
                  Preview / Screenshots
                </h2>
                <img
                  src={screenshot}
                  alt="Screenshot"
                  className="w-full rounded-xl border border-border"
                />
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm mt-12">
          © 2025 FilmyFly Premium
        </footer>
      </main>
    </div>
  );
}
