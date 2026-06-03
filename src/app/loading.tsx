export default function Loading() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mb-10 h-10 w-80 max-w-full animate-pulse rounded-lg bg-zinc-800" />

      <div className="mb-8 h-24 animate-pulse rounded-xl bg-zinc-900" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-xl bg-zinc-900"
          />
        ))}
      </div>
    </main>
  );
}
