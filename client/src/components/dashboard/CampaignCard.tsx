import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"

type Props = {
  subject: string
  status: string
  stats: {
    TOTAL: number
    SENT: number
    FAILED: number
    PENDING: number
  }
}

export default function CampaignCard({ subject, status, stats }: Props) {
  const { TOTAL, SENT, FAILED, PENDING } = stats
  const progress = TOTAL > 0 ? Math.round((SENT / TOTAL) * 100) : 0

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{subject}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Recipients: {TOTAL}
            </p>
          </div>
          <Badge
            variant={status === "COMPLETED" ? "default" : "secondary"}
            className="rounded-full"
          >
            {status}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Sent</p>
            <p className="font-semibold">{SENT}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Failed</p>
            <p className="font-semibold">{FAILED}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Pending</p>
            <p className="font-semibold">{PENDING}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">{progress}% completed</p>
        </div>

        {/* <Button variant="outline" className="w-full rounded-xl">
          {" "}
          View Details{" "}
        </Button> */}
      </CardContent>
    </Card>
  )
}
