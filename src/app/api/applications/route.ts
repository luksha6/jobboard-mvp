import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { jobId, name, email, phone, coverLetter, resumeUrl } = body;

  if (!jobId || !name || !email || !coverLetter) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const job = await prisma.job.findUnique({ where: { id: parseInt(jobId) } });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const application = await prisma.application.create({
    data: {
      jobId: parseInt(jobId),
      name,
      email,
      phone: phone || null,
      coverLetter,
      resumeUrl: resumeUrl || null,
    },
  });

  return NextResponse.json(application, { status: 201 });
}
