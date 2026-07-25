import { useState } from "react"
import { toast } from "sonner"
import { Mail } from "lucide-react"

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
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
          <section className="hidden bg-slate-50/80 p-10 lg:flex lg:flex-col lg:justify-center xl:p-14">
            <div className="max-w-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="text-2xl font-semibold tracking-tight text-slate-950">
                  MailFlow
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="my-4 text-3xl font-semibold tracking-tight text-slate-950">
                  Reliable email delivery for modern organizations.
                </h1>

                <ul className="space-y-2 text-base leading-7 text-slate-600">
                  <li>• Organize contacts and recipient groups.</li>
                  <li>• Create and manage email campaigns with ease.</li>
                  <li>
                    • Deliver emails reliably through background queue
                    processing.
                  </li>
                  <li>• Track campaign progress and delivery status.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-center bg-white p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="w-full max-w-md space-y-4">
              <Card className="border-0 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
                <CardContent className="p-8">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="mb-8 grid w-full grid-cols-2 rounded-2xl bg-slate-100 p-1">
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
                        <h2 className="text-2xl font-semibold text-slate-950">
                          Welcome back
                        </h2>

                        <p className="text-sm text-slate-600">
                          Access your campaigns, contact lists, and reporting in
                          one place.
                        </p>
                      </div>

                      <form onSubmit={handleLogin} className="space-y-5">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                          <p className="font-semibold text-slate-900">
                            Demo Account Credentails
                          </p>
                          <div className="mt-2 space-y-1">
                            <p>
                              <span className="font-medium text-slate-900">
                                Email:
                              </span>{" "}
                              test.user@gmail.com
                            </p>
                            <p>
                              <span className="font-medium text-slate-900">
                                Password:
                              </span>{" "}
                              111111
                            </p>
                          </div>
                        </div>

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
                        <h2 className="text-2xl font-semibold text-slate-950">
                          Create account
                        </h2>

                        <p className="text-sm text-slate-600">
                          Start building your campaigns and contact lists with
                          MailFlow.
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
        </div>
      </div>
    </div>
  )
}
