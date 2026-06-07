import Navbar from "@/components/dashboard/Navbar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatsCard from "@/components/dashboard/StatsCard"
import CampaignList from "@/components/dashboard/CampaignList"
import { useEffect, useState } from "react"
import CreateCampaignDialog from "@/components/campaign/CreateCampaignModal"
import { fetchCampaigns } from "@/api/campaign.api"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import type { CampaignItem, CampaignSummary } from "@/types/campaign.type"

export default function DashboardPage() {
  const [openCampaignModal, setOpenCampaignModal] = useState(false)
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([])
  const [summary, setSummary] = useState<CampaignSummary>()

  useEffect(() => {
    async function getCampaign() {
      const result = await fetchCampaigns()
      setCampaigns(result?.campaigns)
      setSummary(result?.summary)
    }

    getCampaign()
    const intervalId = setInterval(getCampaign, 2000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CreateCampaignDialog
        openCampaignModal={openCampaignModal}
        setOpenCampaignModal={setOpenCampaignModal}
      />
      <DashboardHeader setOpenCampaignModal={setOpenCampaignModal} />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-10 md:grid-cols-3">
        <StatsCard
          title="Total Campaigns"
          value={summary?.totalCampaign || 0}
        />
        <StatsCard title="Emails Sent" value={summary?.totalEmailSent || 0} />
        <StatsCard
          title="Failed Emails"
          value={summary?.totalEmailFailed || 0}
        />
      </section>

      {summary?.totalCampaign ? (
        <section className="mx-auto max-w-7xl px-6 pb-6">
          <div className="rounded-3xl border bg-white p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-md font-medium text-slate-900">Test Inbox</p>

                <p className="mt-2 text-sm text-muted-foreground">
                  This system simulates a queue-based email delivery workflow.
                  Emails are not sent to any external mailbox.
                </p>

                <p className="mt-2 text-sm text-amber-700">
                  Note: This is a simulation only. In production, a real SMTP
                  service (e.g., Brevo) will handle email delivery.
                </p>
              </div>

              <Button asChild className="rounded-xl">
                <Link to="/email-jobs">Inbox</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <CampaignList data={campaigns} />
    </div>
  )
}
