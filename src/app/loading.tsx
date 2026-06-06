export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10 sm:py-14">
          <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-10 w-80 max-w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-slate-100" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-10">
        <div className="mb-10 h-40 animate-pulse rounded-2xl border border-slate-100 bg-white" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 animate-pulse rounded-xl border border-slate-100 bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
