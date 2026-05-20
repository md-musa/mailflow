import { Navigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem("accessToken")

  if (!token) {
    return <Navigate to="/auth" replace />
  }

  return children
}
