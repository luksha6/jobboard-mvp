import { prisma } from "@/lib/prisma";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";

interface SearchParams {
  q?: string;
  category?: string;
  type?: string;
  location?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { q = "", category = "", type = "", location = "" } = params;

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

  const categories = await prisma.job.groupBy({
    by: ["category"],
    where: { active: true },
    _count: true,
    orderBy: { _count: { category: "desc" } },
  });

  const jobTypes = ["full-time", "part-time", "remote", "contract"];

  const hasFilters = q || category || type || location;

  return (
    <div>
      {/* Hero */}
      <div className="text-center py-12 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Find Your Next <span className="text-indigo-600">Opportunity</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Browse {jobs.length}+ jobs from top companies hiring right now.
        </p>
        <SearchBar initialQ={q} initialLocation={location} />
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
              Job Type
            </h3>
            <div className="space-y-2 mb-6">
              <Link
                href={`/?${new URLSearchParams({ q, category, location })}`}
                className={`block text-sm py-1 px-2 rounded transition-colors ${
                  !type
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Types
              </Link>
              {jobTypes.map((t) => (
                <Link
                  key={t}
                  href={`/?${new URLSearchParams({ q, category, type: t, location })}`}
                  className={`block text-sm py-1 px-2 rounded capitalize transition-colors ${
                    type === t
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
              Category
            </h3>
            <div className="space-y-2">
              <Link
                href={`/?${new URLSearchParams({ q, type, location })}`}
                className={`block text-sm py-1 px-2 rounded transition-colors ${
                  !category
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Categories
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.category}
                  href={`/?${new URLSearchParams({ q, type, category: cat.category, location })}`}
                  className={`flex items-center justify-between text-sm py-1 px-2 rounded transition-colors ${
                    category === cat.category
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span>{cat.category}</span>
                  <span className="text-xs text-gray-400">{cat._count}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm">
              {hasFilters ? (
                <>
                  <span className="font-medium text-gray-900">{jobs.length}</span>{" "}
                  results found
                  {hasFilters && (
                    <Link href="/" className="ml-3 text-indigo-600 hover:underline text-xs">
                      Clear filters
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <span className="font-medium text-gray-900">{jobs.length}</span> jobs available
                </>
              )}
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters.</p>
              <Link href="/" className="text-indigo-600 hover:underline text-sm">
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
