import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string | null;
  description: string;
  featured: boolean;
  createdAt: Date;
  _count?: { applications: number };
}

const TYPE_COLORS: Record<string, string> = {
  "full-time": "bg-green-100 text-green-700",
  "part-time": "bg-yellow-100 text-yellow-700",
  remote: "bg-blue-100 text-blue-700",
  contract: "bg-purple-100 text-purple-700",
};

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function JobCard({ job }: { job: Job }) {
  const initials = job.company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const colorClasses = [
    "bg-indigo-500",
    "bg-violet-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
  ];
  const color = colorClasses[job.id % colorClasses.length];

  return (
    <Link href={`/jobs/${job.id}`}>
      <div
        className={`bg-white rounded-xl border ${
          job.featured ? "border-indigo-200 shadow-md" : "border-gray-200"
        } p-5 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group`}
      >
        {job.featured && (
          <div className="flex justify-end mb-2">
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              ⭐ Featured
            </span>
          </div>
        )}
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}>
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-lg leading-tight">
              {job.title}
            </h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <span className="font-medium text-gray-700">{job.company}</span>
              <span>·</span>
              <span>{job.location}</span>
            </div>

            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
              {job.description.split("\n")[0]}
            </p>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
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
                <span className="text-xs text-gray-600 font-medium">
                  💰 {job.salary}
                </span>
              )}
              <span className="text-xs text-gray-400 ml-auto">
                {timeAgo(job.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
