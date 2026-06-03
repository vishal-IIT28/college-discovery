import Link from "next/link";
import type { CollegeDetail } from "@/lib/college-detail";
import { currencyFormatter } from "@/lib/formatters";

type CollegeDetailViewProps = {
  college: CollegeDetail;
};

export function CollegeDetailView({ college }: CollegeDetailViewProps) {
  const stats = [
    {
      label: "Fees",
      value: currencyFormatter.format(college.fees),
    },
    {
      label: "Rating",
      value: college.rating.toFixed(1),
    },
    {
      label: "Placements",
      value: college.placements,
    },
    {
      label: "Location",
      value: college.location,
    },
  ];

  return (
    <main className="min-h-screen bg-black px-5 py-6 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-lg border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Back
        </Link>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                College profile
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                {college.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-400">
                A focused overview of admissions cost, academic options, and
                placement outcomes for this institution.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-black p-5">
              <p className="text-sm text-zinc-500">Primary campus</p>
              <p className="mt-2 text-2xl font-semibold">{college.location}</p>
              <div className="mt-5 h-px bg-zinc-800" />
              <p className="mt-5 text-sm text-zinc-500">Overall rating</p>
              <p className="mt-2 text-3xl font-bold">{college.rating.toFixed(1)}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <p className="mt-3 text-xl font-semibold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">Courses</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {college.courses.map((course) => (
              <span
                key={course}
                className="rounded-full border border-zinc-700 bg-black px-4 py-2 text-sm text-zinc-200"
              >
                {course}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
