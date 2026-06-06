import Link from "next/link";
import { CompareCheckbox } from "@/components/CompareCheckbox";
import type { CollegeListItem } from "@/lib/colleges";
import { currencyFormatter } from "@/lib/formatters";

type CollegeCardProps = {
  college: CollegeListItem;
};

function MapPinIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-slate-400"
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
      className="h-3 w-3 text-amber-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
              <MapPinIcon />
              {college.location}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
              <StarIcon />
              {college.rating.toFixed(1)}
            </span>
          </div>
          <h2 className="text-lg font-bold leading-snug text-slate-900">
            {college.name}
          </h2>
        </div>
        <CompareCheckbox collegeId={college.id} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Placements
          </p>
          <p className="mt-0.5 text-sm font-bold text-slate-900">
            {college.placements}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Fees
          </p>
          <p className="mt-0.5 text-sm font-bold tabular-nums text-slate-900">
            {currencyFormatter.format(college.fees)}
          </p>
        </div>
      </div>

      <Link
        href={`/college/${college.id}`}
        aria-label={`View details for ${college.name}`}
        className="absolute inset-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      />
    </article>
  );
}
