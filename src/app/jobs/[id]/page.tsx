import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

const TYPE_COLORS: Record<string, string> = {
  "full-time": "bg-green-100 text-green-700",
  "part-time": "bg-yellow-100 text-yellow-700",
  remote: "bg-blue-100 text-blue-700",
  contract: "bg-purple-100 text-purple-700",
};

const colorClasses = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
];

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id: parseInt(id) },
    include: { _count: { select: { applications: true } } },
  });

  if (!job) notFound();

  const initials = job.company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const color = colorClasses[job.id % colorClasses.length];

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));

  const formatBullets = (text: string | null) =>
    text
      ? text.split("\n").filter(Boolean).map((line, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">✓</span>
            <span>{line}</span>
          </li>
        ))
      : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-indigo-600 hover:underline text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </Link>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex items-start gap-5">
          <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg`}>
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                {job.featured && (
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                    ⭐ Featured
                  </span>
                )}
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-gray-600 font-medium mt-1">{job.company}</p>
              </div>
              <Link
                href={`/jobs/${job.id}/apply`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
              >
                Apply Now
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                  TYPE_COLORS[job.type] || "bg-gray-100 text-gray-600"
                }`}
              >
                {job.type}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                {job.category}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1 font-medium text-gray-700">
                  💰 {job.salary}
                </span>
              )}
            </div>

            <div className="flex gap-4 mt-3 text-xs text-gray-400">
              <span>Posted {formatDate(job.createdAt)}</span>
              <span>·</span>
              <span>{job._count.applications} applicant{job._count.applications !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About the Role</h2>
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              {job.description.split("\n").filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {job.requirements && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {formatBullets(job.requirements)}
              </ul>
            </div>
          )}

          {job.benefits && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {formatBullets(job.benefits)}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Job Details</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Company</dt>
                <dd className="font-medium text-gray-900">{job.company}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Location</dt>
                <dd className="text-gray-700">{job.location}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Job Type</dt>
                <dd className="capitalize text-gray-700">{job.type}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Category</dt>
                <dd className="text-gray-700">{job.category}</dd>
              </div>
              {job.salary && (
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Salary</dt>
                  <dd className="font-medium text-gray-900">{job.salary}</dd>
                </div>
              )}
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Contact</dt>
                <dd className="text-indigo-600 break-all">{job.email}</dd>
              </div>
            </dl>
          </div>

          <Link
            href={`/jobs/${job.id}/apply`}
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors text-center"
          >
            Apply for This Job
          </Link>
        </div>
      </div>
    </div>
  );
}
