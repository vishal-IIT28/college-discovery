export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-200" />

        <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-10 max-w-xl animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-4 h-16 max-w-2xl animate-pulse rounded bg-slate-100" />
          <div className="mt-6 flex gap-3">
            <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-100" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-slate-100" />
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl border border-slate-100 bg-white"
            />
          ))}
        </section>
      </div>
    </main>
  );
}
