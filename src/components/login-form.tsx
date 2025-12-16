import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useDispatch } from "react-redux"
import { login, setShowLoginPage } from "@/store/loginSlice"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import apiClient from "@/api/apiClient"
import { cn } from "@/lib/utils"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const loginPayload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    try {
      const response = await apiClient.post("/api/users/login", loginPayload)
      const { user } = response.data.data
      dispatch(login({ user }))
      dispatch(setShowLoginPage(false))
      navigate("/")
    } catch (error) {
      console.error("API request error", error.response?.data?.message || error.message)
      toast.error(error.response.data?.message)
    }
  }

  const dispatch = useDispatch()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <CardHeader>
          <div className="flex flex-1 justify-between">
            <CardTitle className="text-2xl">Login</CardTitle>
            <NavLink to="/">
              <X onClick={() => dispatch(setShowLoginPage(false))} />
            </NavLink>
          </div>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="myusername"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  className="bg-background"
                  id="password-toggle"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                />
                <Button
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent mt-3"
                  onClick={() => setShowPassword(!showPassword)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <NavLink to="/signup">
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </NavLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
