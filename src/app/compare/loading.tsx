export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-5 py-6 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-24 animate-pulse rounded-lg bg-zinc-900" />

        <header className="mt-8 mb-8">
          <div className="h-4 w-48 animate-pulse rounded bg-zinc-800" />
          <div className="mt-4 h-12 max-w-xl animate-pulse rounded bg-zinc-800" />
          <div className="mt-5 h-12 max-w-2xl animate-pulse rounded bg-zinc-900" />
        </header>

        <div className="overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse border-b border-zinc-900 bg-zinc-950 last:border-0"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
