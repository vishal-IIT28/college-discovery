import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 py-10 text-white">
      <section className="max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center shadow-2xl shadow-black/40">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          College not found
        </p>
        <h1 className="mt-3 text-3xl font-bold">This college is not available</h1>
        <p className="mt-3 text-zinc-400">
          It may have been removed, or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          Back to colleges
        </Link>
      </section>
    </main>
  );
}
