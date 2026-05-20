import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">MailFlow</h1>

          <p className="text-sm text-muted-foreground">
            Queue-Based Bulk Email System
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Groups
          </Button>

          <Button className="rounded-xl">Create Campaign</Button>
        </div>
      </div>
    </nav>
  )
}
