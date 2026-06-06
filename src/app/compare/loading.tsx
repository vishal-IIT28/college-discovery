export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-200" />

        <header className="mt-8 mb-8">
          <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-10 max-w-md animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-4 h-5 max-w-lg animate-pulse rounded bg-slate-100" />
        </header>

        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-16 animate-pulse border-b border-slate-100 bg-slate-50/50 last:border-0"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
