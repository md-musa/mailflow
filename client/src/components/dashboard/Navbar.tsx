import { Link, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">MailFlow</h1>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/groups">
            <Button variant="outline" className="rounded-xl">
              Groups
            </Button>
          </Link>

          <Button asChild className="rounded-xl">
            <Link to="/">Dashboard</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
