import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthPage from "@/pages/AuthPage"
import DashboardPage from "@/pages/DashboardPage"

import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Private */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        {/* <Route
          path=\"*\"
          element={<NotFoundPage />}
        /> */}
      </Routes>
    </BrowserRouter>
  )
}
