import { Prisma } from "@/generated/client";
import prisma from "@/lib/prisma";

export type CollegeListQuery = {
  search?: string | string[] | null;
  maxFees?: string | string[] | null;
  page?: string | string[] | null;
  limit?: string | string[] | null;
};

export type CollegeListItem = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placements: string;
};

export type CollegePagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CollegeListResponse = {
  data: CollegeListItem[];
  pagination: CollegePagination;
};

export type ParsedCollegeListQuery = {
  search: string;
  maxFees: number | null;
  page: number;
  limit: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 24;

function firstParam(value: string | string[] | null | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function positiveInt(
  value: string | string[] | null | undefined,
  fallback: number,
) {
  const parsed = Number.parseInt(firstParam(value) ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function positiveNumber(value: string | string[] | null | undefined) {
  const parsed = Number.parseInt(firstParam(value) ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function parseCollegeListQuery(
  query: CollegeListQuery,
): ParsedCollegeListQuery {
  const limit = Math.min(positiveInt(query.limit, DEFAULT_LIMIT), MAX_LIMIT);

  return {
    search: (firstParam(query.search) ?? "").trim(),
    maxFees: positiveNumber(query.maxFees),
    page: positiveInt(query.page, DEFAULT_PAGE),
    limit,
  };
}

export function buildCollegeSearchParams(
  query: Partial<ParsedCollegeListQuery> & { page?: number },
) {
  const params = new URLSearchParams();

  if (query.search) {
    params.set("search", query.search);
  }

  if (query.maxFees !== null && query.maxFees !== undefined) {
    params.set("maxFees", String(query.maxFees));
  }

  if (query.page && query.page > 1) {
    params.set("page", String(query.page));
  }

  if (query.limit && query.limit !== DEFAULT_LIMIT) {
    params.set("limit", String(query.limit));
  }

  const queryString = params.toString();
  return queryString ? `/?${queryString}` : "/";
}

export async function getColleges(
  query: CollegeListQuery = {},
): Promise<CollegeListResponse> {
  const parsed = parseCollegeListQuery(query);
  const where: Prisma.CollegeWhereInput = {};

  if (parsed.search) {
    where.name = {
      contains: parsed.search,
      mode: "insensitive",
    };
  }

  if (parsed.maxFees !== null) {
    where.fees = {
      lte: parsed.maxFees,
    };
  }

  const total = await prisma.college.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / parsed.limit));
  const page = Math.min(parsed.page, totalPages);

  const data = await prisma.college.findMany({
    where,
    orderBy: {
      rating: "desc",
    },
    skip: (page - 1) * parsed.limit,
    take: parsed.limit,
    select: {
      id: true,
      name: true,
      location: true,
      fees: true,
      rating: true,
      placements: true,
    },
  });

  return {
    data,
    pagination: {
      page,
      limit: parsed.limit,
      total,
      totalPages,
    },
  };
}
