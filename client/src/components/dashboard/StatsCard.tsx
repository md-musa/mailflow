import { Card, CardContent } from "@/components/ui/card"

type Props = {
  title: string
  value: string
}

export default function StatsCard({ title, value }: Props) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="px-6">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
      </CardContent>
    </Card>
  )
}
