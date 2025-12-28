import { useState, useEffect } from "react";
import { X, Loader2, Download, ExternalLink, Sparkles, Bolt, CheckCircle2 } from "lucide-react";

interface PremiumLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalUrl: string;
  linkLabel: string;
  movieTitle: string;
}

// Extract download info from URL
function extractDownloadInfo(url: string, label: string) {
  const urlLower = url.toLowerCase();
  const labelLower = label.toLowerCase();
  
  // Determine quality
  let quality = "HD";
  if (urlLower.includes("4k") || labelLower.includes("4k")) quality = "4K UHD";
  else if (urlLower.includes("1080p") || labelLower.includes("1080p")) quality = "1080p";
  else if (urlLower.includes("720p") || labelLower.includes("720p")) quality = "720p";
  else if (urlLower.includes("480p") || labelLower.includes("480p")) quality = "480p";

  // Determine server/host from URL
  let server = "Premium Server";
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    server = hostname.split(".")[0].charAt(0).toUpperCase() + hostname.split(".")[0].slice(1);
  } catch {
    server = "Premium Server";
  }

  return { quality, server };
}

const buttonColors = [
  "from-primary to-pink",
  "from-cyan to-purple",
  "from-gold to-accent",
  "from-purple to-primary",
];

export function PremiumLinkModal({ isOpen, onClose, originalUrl, linkLabel, movieTitle }: PremiumLinkModalProps) {
  const [countdown, setCountdown] = useState(3);
  const [isProcessing, setIsProcessing] = useState(true);
  const [showPremiumPage, setShowPremiumPage] = useState(false);
  const [processingFailed, setProcessingFailed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      setIsProcessing(true);
      setShowPremiumPage(false);
      setProcessingFailed(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Simulate premium page creation success (always succeeds in this case)
          setIsProcessing(false);
          setShowPremiumPage(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // If processing failed, open original URL
  useEffect(() => {
    if (processingFailed) {
      window.open(originalUrl, "_blank");
      onClose();
    }
  }, [processingFailed, originalUrl, onClose]);

  if (!isOpen) return null;

  const { quality, server } = extractDownloadInfo(originalUrl, linkLabel);

  // Processing overlay
  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex items-center justify-center animate-fade-in">
        <div className="glass-card rounded-3xl p-10 max-w-md w-[90%] text-center space-y-6 animate-scale-in">
          {/* Animated Loader */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-gold animate-spin" style={{ animationDuration: '1.5s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-black text-gradient-primary">{countdown}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">Processing...</h2>
            <p className="text-muted-foreground text-sm">Generating Premium Link</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-primary transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground">Please wait {countdown} second{countdown !== 1 ? 's' : ''}...</p>
        </div>
      </div>
    );
  }

  // Premium Page
  return (
    <div className="fixed inset-0 z-[200] bg-background overflow-y-auto animate-fade-in">
      {/* Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[120px]" />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[210] w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground transition-all duration-300 hover:bg-destructive/20 hover:border-destructive/50 hover:scale-110 active:scale-95"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <main className="container max-w-2xl py-12 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent">Premium Link Ready</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
            <span className="text-foreground">FILMY</span>
            <span className="text-primary">FLY</span>
            <span className="shimmer-text text-lg ml-2">PREMIUM</span>
          </h1>
          <p className="text-muted-foreground text-sm">High-Speed Download Links</p>
        </div>

        {/* Movie Title Card */}
        <div 
          className="glass-card rounded-2xl p-5 mb-6 border-l-4 border-l-primary animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg gradient-primary flex-shrink-0">
              <Sparkles className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">File Name</p>
              <p className="text-foreground font-semibold leading-tight break-all">{movieTitle}</p>
            </div>
          </div>
        </div>

        {/* Link Info */}
        <div 
          className="glass-card rounded-2xl p-5 mb-6 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-cyan/20">
              <ExternalLink className="w-4 h-4 text-cyan" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Link Details</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Quality</p>
              <p className="font-semibold text-foreground">{quality}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Server</p>
              <p className="font-semibold text-foreground capitalize">{server}</p>
            </div>
          </div>
        </div>

        {/* Download Links Section */}
        <section 
          className="glass-card rounded-2xl p-6 mb-6 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-5">
            <div className="p-1.5 rounded-lg gradient-gold">
              <Bolt className="w-4 h-4 text-gold-foreground" />
            </div>
            <span className="text-gradient-gold">Download Links</span>
          </h2>

          <div className="space-y-3">
            {/* Primary Download Link */}
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl px-5 py-4 text-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden gradient-primary glow-primary"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <span className="font-bold">Download Now</span>
              </div>
              <span className="text-xs opacity-80 bg-foreground/10 px-2 py-1 rounded">{quality}</span>
            </a>

            {/* Alternative Links */}
            {[
              { label: "Mirror Link 1", delay: "0.25s" },
              { label: "Mirror Link 2", delay: "0.3s" },
            ].map((link, i) => (
              <a
                key={i}
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-border rounded-xl px-4 py-3.5 text-foreground transition-all duration-300 hover:translate-x-1 hover:shadow-lg relative overflow-hidden animate-slide-up"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 100%)`,
                  animationDelay: link.delay,
                }}
              >
                {/* Colored Gradient Overlay */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${buttonColors[i % buttonColors.length]}`}
                />
                <span className="truncate pr-4 font-medium relative z-10">{link.label}</span>
                <div 
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${buttonColors[i % buttonColors.length]} download-icon-3d group-hover:scale-110 group-hover:-translate-y-0.5`}
                >
                  <Download className="w-5 h-5 text-foreground drop-shadow-md" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl border border-border text-muted-foreground font-medium transition-all duration-300 hover:bg-secondary hover:text-foreground animate-slide-up"
          style={{ animationDelay: "0.35s" }}
        >
          ← Back to Movie Details
        </button>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-xs mt-10 pt-6 border-t border-border/30">
          <div className="flex items-center justify-center gap-1">
            <span className="text-foreground font-bold">FILMY</span>
            <span className="text-primary font-bold">FLY</span>
          </div>
          <p className="mt-1 opacity-60">© 2025 All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
}
