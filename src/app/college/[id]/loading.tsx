export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-5 py-6 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-10 w-24 animate-pulse rounded-lg bg-zinc-900" />

        <section className="mt-8 rounded-2xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div>
              <div className="h-4 w-36 animate-pulse rounded bg-zinc-800" />
              <div className="mt-4 h-12 max-w-xl animate-pulse rounded bg-zinc-800" />
              <div className="mt-5 h-20 max-w-2xl animate-pulse rounded bg-zinc-900" />
            </div>

            <div className="h-44 animate-pulse rounded-xl bg-black" />
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-xl bg-zinc-950 ring-1 ring-zinc-900"
            />
          ))}
        </section>
      </div>
    </main>
  );
}
