import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <section className="max-w-lg rounded-xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          College not found
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          This college is not available
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          It may have been removed, or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Back to colleges
        </Link>
      </section>
    </main>
  );
}
