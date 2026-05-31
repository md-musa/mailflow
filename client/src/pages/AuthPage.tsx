import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"

export default function AuthPage() {
  const [loading, setLoading] = useState(false)
  const { loginUser, registerUser } = useAuth()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await loginUser(loginData)

      toast.success("Login successful", { position: "top-center" })
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await registerUser(registerData)

      toast.success("Account created", { position: "top-center" })
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">MailFlow</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Organize your audience and send email campaigns with confidence.
          </p>
        </div>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-2 rounded-2xl">
                <TabsTrigger value="login" className="rounded-xl">
                  Login
                </TabsTrigger>

                <TabsTrigger value="register" className="rounded-xl">
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login">
                <div className="mb-6 space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Welcome Back</h2>

                  <p className="text-sm text-muted-foreground">
                    Log in to access your campaigns, lists, and reporting.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label>Email</Label>

                    <Input
                      type="email"
                      placeholder="abc@gmail.com"
                      className="h-11 rounded-xl"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>

                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="h-11 rounded-xl"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register */}
              <TabsContent value="register">
                <div className="mb-6 space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Create Account</h2>

                  <p className="text-sm text-muted-foreground">
                    Create an account and start building your contact lists.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <Label>Full Name</Label>

                    <Input
                      type="text"
                      placeholder="Mr. Hasan"
                      className="h-11 rounded-xl"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>

                    <Input
                      type="email"
                      placeholder="abc@gmail.com"
                      className="h-11 rounded-xl"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>

                    <Input
                      type="password"
                      placeholder="Create password"
                      className="h-11 rounded-xl"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
