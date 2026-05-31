import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthPage from "@/pages/AuthPage"
import DashboardPage from "@/pages/DashboardPage"
import GroupsPage from "@/pages/GroupsPage"

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

        <Route
          path="/groups"
          element={
            <PrivateRoute>
              <GroupsPage />
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
