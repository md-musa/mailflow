import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

export default function Navbar() {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully", { position: "top-center" })
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">MailFlow</h1>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link to="/groups">
            <Button variant="outline" className="rounded-xl">
              Groups
            </Button>
          </Link>

          {/* <Button asChild className="rounded-xl">
            <Link to="/">Dashboard</Link>
          </Button> */}

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
