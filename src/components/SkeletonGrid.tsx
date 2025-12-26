export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="relative rounded-xl overflow-hidden animate-fade-in"
          style={{ animationDelay: `${i * 0.03}s`, animationFillMode: "backwards" }}
        >
          <div className="aspect-[2/3] skeleton-loading" />
          <div className="p-3 bg-card">
            <div className="h-4 skeleton-loading rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
