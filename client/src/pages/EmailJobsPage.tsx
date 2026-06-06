import { useEffect, useState } from "react"
import Navbar from "@/components/dashboard/Navbar"
import EmailJobsTable from "@/components/emailjob/EmailJobsTable"
import { fetchCampaigns } from "@/api/campaign.api"
import { toast } from "sonner"
import type { CampaignItem, EmailJob } from "@/types/campaign.type"

type EmailJobRow = EmailJob & {
  campaign: {
    id: string
    subject: string
  }
}

export default function EmailJobsPage() {
  const [jobs, setJobs] = useState<EmailJobRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadJobs = async () => {
      try {
        const result = await fetchCampaigns()
        const campaigns = (result?.campaigns || []) as CampaignItem[]
        const nextJobs = campaigns
          .flatMap((campaign) =>
            (campaign.emailJobs || []).map((job) => ({
              ...job,
              campaign: {
                id: campaign.id,
                subject: campaign.subject,
              },
            }))
          )
          .sort((a, b) => {
            const first = new Date(b.createdAt || b.updatedAt || 0).getTime()
            const second = new Date(a.createdAt || a.updatedAt || 0).getTime()
            return first - second
          })

        if (active) {
          setJobs(nextJobs)
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Unable to load email jobs"
        )
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadJobs()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-3xl border bg-white p-6">
          <h2 className="text-2xl font-bold">Inbox</h2>
        </section>

        <section className="mt-6">
          {loading ? (
            <div className="rounded-2xl border bg-white p-6 text-sm text-muted-foreground">
              Loading email jobs...
            </div>
          ) : (
            <EmailJobsTable jobs={jobs} />
          )}
        </section>
      </main>
    </div>
  )
}
