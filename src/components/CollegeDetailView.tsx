import Link from "next/link";
import type { CollegeDetail } from "@/lib/college-detail";
import { currencyFormatter } from "@/lib/formatters";

type CollegeDetailViewProps = {
  college: CollegeDetail;
};

const COURSE_CHIP_STYLES = [
  "text-indigo-700 bg-indigo-50",
  "text-emerald-700 bg-emerald-50",
  "text-violet-700 bg-violet-50",
  "text-sky-700 bg-sky-50",
  "text-rose-700 bg-rose-50",
  "text-amber-700 bg-amber-50",
] as const;

function MapPinIcon() {
  return (
    <svg
      className="h-4 w-4 text-slate-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.465-.247.85-.47.775-.503 1.88-1.305 2.985-2.38 2.208-2.09 3.32-4.14 3.32-6.15C17 4.45 14.108 2 10.5 2S4 4.45 4 8.5c0 2.01 1.112 4.06 3.32 6.15 1.105 1.075 2.21 1.877 2.985 2.38.385.223.664.374.85.47a5.74 5.74 0 00.281.14l.018.008.006.003zM10 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="h-4 w-4 text-amber-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function CollegeDetailView({ college }: CollegeDetailViewProps) {
  const stats = [
    {
      label: "Annual fees",
      value: currencyFormatter.format(college.fees),
      emphasis: true,
    },
    {
      label: "Overall rating",
      value: college.rating.toFixed(1),
      badge: true,
    },
    {
      label: "Placements",
      value: college.placements,
    },
    {
      label: "Campus",
      value: college.location,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          ← Back to search
        </Link>

        <header className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            College profile
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {college.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
            Admissions cost, academic options, and placement outcomes for
            this institution.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
              <MapPinIcon />
              {college.location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
              <StarIcon />
              {college.rating.toFixed(1)} rating
            </span>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {stat.label}
              </p>
              {stat.badge ? (
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xl font-bold text-amber-700">
                  <StarIcon />
                  {stat.value}
                </p>
              ) : (
                <p
                  className={`mt-2 font-bold text-slate-900 ${
                    stat.emphasis
                      ? "text-xl tabular-nums"
                      : "text-lg leading-snug"
                  }`}
                >
                  {stat.value}
                </p>
              )}
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Courses offered</h2>
          <p className="mt-1 text-sm text-slate-500">
            Programs available at this campus.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {college.courses.map((course, index) => (
              <span
                key={course}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${COURSE_CHIP_STYLES[index % COURSE_CHIP_STYLES.length]}`}
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
