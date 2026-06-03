import { notFound } from "next/navigation";
import { CollegeDetailView } from "@/components/CollegeDetailView";
import { getCollegeById } from "@/lib/college-detail";

type CollegeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CollegeDetailPage({
  params,
}: CollegeDetailPageProps) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    notFound();
  }

  return <CollegeDetailView college={college} />;
}
