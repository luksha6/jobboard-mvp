import PostJobForm from "@/components/PostJobForm";

export default function PostJobPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
        <p className="text-gray-500">
          Reach thousands of qualified candidates. Fill out the form below to list your job.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <PostJobForm />
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        By posting a job, you agree to our terms of service. Jobs are reviewed and posted within 24 hours.
      </p>
    </div>
  );
}
