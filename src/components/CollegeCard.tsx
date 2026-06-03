import Link from "next/link";
import type { CollegeListItem } from "@/lib/colleges";
import { currencyFormatter } from "@/lib/formatters";

type CollegeCardProps = {
  college: CollegeListItem;
};

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Link
      href={`/college/${college.id}`}
      className="block rounded-xl bg-zinc-900 p-6 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500"
    >
      <h2 className="text-2xl font-bold">{college.name}</h2>

      <div className="mt-4 space-y-2 text-sm text-zinc-300">
        <p>Location: {college.location}</p>
        <p>Rating: {college.rating.toFixed(1)}</p>
        <p>Fees: {currencyFormatter.format(college.fees)}</p>
        <p>Placements: {college.placements}</p>
      </div>
    </Link>
  );
}
