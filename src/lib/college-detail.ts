import prisma from "@/lib/prisma";

export type CollegeDetail = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placements: string;
  courses: string[];
};

export async function getCollegeById(id: string): Promise<CollegeDetail | null> {
  return prisma.college.findUnique({
    where: {
      id,
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
}
