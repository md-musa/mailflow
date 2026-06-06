type EmailJobItem = {
  id: string
  recipientEmail: string
  status: string
  previewUrl?: string | null
  createdAt?: string
  updatedAt?: string
  campaign?: {
    id: string
    subject: string
  }
}

type Props = {
  jobs: EmailJobItem[]
}

function formatDate(value?: string) {
  if (!value) return "-"

  return new Date(value).toLocaleString()
}

export default function EmailJobsTable({ jobs }: Props) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-sm text-muted-foreground">
        No email jobs found yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Email</th>
              <th className="px-4 py-3 font-medium text-slate-600">Campaign</th>
              <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 font-medium text-slate-600">Created</th>
              <th className="px-4 py-3 font-medium text-slate-600">Preview</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="px-4 py-3 text-slate-700">{job.recipientEmail}</td>
                <td className="px-4 py-3 text-slate-700">
                  {job.campaign?.subject || "-"}
                </td>
                <td className="px-4 py-3 text-slate-700">{job.status}</td>
                <td className="px-4 py-3 text-slate-700">
                  {formatDate(job.createdAt)}
                </td>
                <td className="px-4 py-3">
                  {job.previewUrl ? (
                    <a
                      href={job.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-900 underline underline-offset-4"
                    >
                      More details
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
