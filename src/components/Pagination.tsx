import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | "dots")[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("dots");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("dots");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex justify-center gap-2 mt-12 flex-wrap animate-fade-in" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-11 h-11 flex items-center justify-center bg-secondary text-foreground rounded-xl border border-border transition-all duration-300 hover:bg-muted hover:border-primary/50 hover:scale-105 active:scale-95"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Page Numbers */}
      {getVisiblePages().map((page, idx) =>
        page === "dots" ? (
          <span key={`dots-${idx}`} className="w-11 h-11 flex items-end justify-center text-muted-foreground text-lg pb-2">
            •••
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative w-11 h-11 flex items-center justify-center rounded-xl font-bold transition-all duration-300 overflow-hidden ${
              page === currentPage
                ? "gradient-accent text-accent-foreground glow-accent scale-105"
                : "bg-secondary text-foreground border border-border hover:bg-muted hover:border-primary/50 hover:scale-105 active:scale-95"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page === currentPage && (
              <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-accent via-cyan to-accent bg-[length:200%_200%]" />
            )}
            <span className="relative z-10">{page}</span>
          </button>
        )
      )}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-11 h-11 flex items-center justify-center bg-secondary text-foreground rounded-xl border border-border transition-all duration-300 hover:bg-muted hover:border-primary/50 hover:scale-105 active:scale-95"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
}
