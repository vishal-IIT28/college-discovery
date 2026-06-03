import { NextResponse } from "next/server";
import { getColleges } from "@/lib/colleges";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const colleges = await getColleges({
    search: searchParams.get("search"),
    maxFees: searchParams.get("maxFees"),
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
  });

  return NextResponse.json(colleges);
}
