import type { CampaignItem } from "@/types/campaign.type"
import CampaignCard from "./CampaignCard"

type Props = {
  data?: CampaignItem[]
}

export default function CampaignList({ data }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <p className="text-sm text-muted-foreground">
          Recently created email campaigns.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((item) => (
          <CampaignCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
