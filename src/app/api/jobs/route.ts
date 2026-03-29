import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";

  const jobs = await prisma.job.findMany({
    where: {
      active: true,
      ...(q && {
        OR: [
          { title: { contains: q } },
          { company: { contains: q } },
          { description: { contains: q } },
        ],
      }),
      ...(category && { category }),
      ...(type && { type }),
      ...(location && { location: { contains: location } }),
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    include: { _count: { select: { applications: true } } },
  });

  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    title,
    company,
    location,
    type,
    category,
    salary,
    description,
    requirements,
    benefits,
    email,
  } = body;

  if (!title || !company || !location || !type || !category || !description || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const job = await prisma.job.create({
    data: {
      title,
      company,
      location,
      type,
      category,
      salary: salary || null,
      description,
      requirements: requirements || null,
      benefits: benefits || null,
      email,
    },
  });

  return NextResponse.json(job, { status: 201 });
}
