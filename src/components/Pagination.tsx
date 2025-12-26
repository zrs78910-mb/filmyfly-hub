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
    const maxVisible = 5;
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
    <nav className="flex justify-center gap-2 mt-10 flex-wrap" aria-label="Pagination">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center bg-secondary text-foreground rounded-lg border border-border transition-colors hover:bg-muted"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {getVisiblePages().map((page, idx) =>
        page === "dots" ? (
          <span key={`dots-${idx}`} className="w-10 h-10 flex items-end justify-center text-muted-foreground text-lg">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border font-semibold transition-all ${
              page === currentPage
                ? "bg-accent text-accent-foreground border-accent shadow-[0_0_10px_hsl(var(--accent)/0.4)]"
                : "bg-secondary text-foreground border-border hover:bg-muted"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center bg-secondary text-foreground rounded-lg border border-border transition-colors hover:bg-muted"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
}
