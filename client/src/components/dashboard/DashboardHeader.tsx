import { Button } from "@/components/ui/button"

type Props = {
  setOpenCampaignModal(openCampaignModal: boolean): void
}

export default function DashboardHeader({ setOpenCampaignModal }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-3xl border bg-white p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Campaigns made easy
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Build email campaigns, track recipients, and keep your contact
              groups organized.
            </p>
          </div>

          <Button
            onClick={() => setOpenCampaignModal(true)}
            className="h-12 rounded-2xl px-6"
          >
            + Create Campaign
          </Button>
        </div>
      </div>
    </section>
  )
}
