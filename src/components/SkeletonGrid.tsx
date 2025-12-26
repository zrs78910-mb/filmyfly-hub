export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="skeleton-loading aspect-[2/3] rounded-xl"
          style={{ animationDelay: `${i * 0.05}s` }}
        />
      ))}
    </div>
  );
}
