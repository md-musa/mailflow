import Navbar from "@/components/dashboard/Navbar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatsCard from "@/components/dashboard/StatsCard"
import CampaignList from "@/components/dashboard/CampaignList"
import { useEffect, useState } from "react"
import CreateCampaignDialog from "@/components/campaign/CreateCampaignModal"
import { fetchCampaigns } from "@/api/campaign.api"

export default function DashboardPage() {
  const [openCampaignModal, setOpenCampaignModal] = useState(false)
  const [campaigns, setCampaigns] = useState()
  const [summary, setSummary] = useState()

  useEffect(() => {
    async function getCampaign() {
      const result = await fetchCampaigns()
      setCampaigns(result?.campaigns)
      setSummary(result?.summary)

      console.log(result)
    }

    setInterval(getCampaign, 2000)
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

      <CampaignList data={campaigns} />
    </div>
  )
}
