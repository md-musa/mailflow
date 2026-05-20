import Navbar from "@/components/dashboard/Navbar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatsCard from "@/components/dashboard/StatsCard"
import CampaignList from "@/components/dashboard/CampaignList"
import { useState } from "react"
import CreateCampaignDialog from "@/components/campaign/CreateCampaignModal"

export default function DashboardPage() {
  const [openCampaignModal, setOpenCampaignModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CreateCampaignDialog
        openCampaignModal={openCampaignModal}
        setOpenCampaignModal={setOpenCampaignModal}
      />
      <DashboardHeader setOpenCampaignModal={setOpenCampaignModal} />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-10 md:grid-cols-3">
        <StatsCard title="Total Campaigns" value="12" />
        <StatsCard title="Emails Sent" value="8,240" />
        <StatsCard title="Failed Emails" value="32" />
      </section>

      <CampaignList />
    </div>
  )
}
