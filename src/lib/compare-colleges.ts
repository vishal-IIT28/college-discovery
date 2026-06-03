import prisma from "@/lib/prisma";
import { parseCompareIds } from "@/lib/compare-selection";

export type CompareCollege = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placements: string;
  courses: string[];
};

export async function getCompareColleges(
  idsParam: string | string[] | null | undefined,
) {
  const ids = parseCompareIds(idsParam);

  if (ids.length === 0) {
    return [];
  }

  const colleges = await prisma.college.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      name: true,
      location: true,
      fees: true,
      rating: true,
      placements: true,
      courses: true,
    },
  });

  return ids
    .map((id) => colleges.find((college) => college.id === id))
    .filter((college): college is CompareCollege => Boolean(college));
}
