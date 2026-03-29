import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ApplyForm from "@/components/ApplyForm";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id: parseInt(id) },
  });

  if (!job) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/jobs/${job.id}`}
          className="text-indigo-600 hover:underline text-sm flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Job
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center gap-3">
        <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-gray-500">Applying for</p>
          <p className="font-semibold text-gray-900">{job.title}</p>
          <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply Now</h1>
        <p className="text-gray-500 text-sm mb-6">
          Fill out the form below to apply. Your application will be sent directly to the employer.
        </p>
        <ApplyForm jobId={job.id} />
      </div>
    </div>
  );
}
