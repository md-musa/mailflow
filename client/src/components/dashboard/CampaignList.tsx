import CampaignCard from "./CampaignCard"

const campaigns = [
  {
    id: 1,
    subject: "Exam Notice",
    status: "PROCESSING",
    total: 1000,
    sent: 730,
    failed: 20,
    pending: 250,
  },

  {
    id: 2,
    subject: "Programming Contest",
    status: "COMPLETED",
    total: 540,
    sent: 540,
    failed: 0,
    pending: 0,
  },

  {
    id: 3,
    subject: "Club Meeting",
    status: "SCHEDULED",
    total: 120,
    sent: 0,
    failed: 0,
    pending: 120,
  },
]

export default function CampaignList() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <p className="text-sm text-muted-foreground">
          Recently created email campaigns.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} />
        ))}
      </div>
    </section>
  )
}
