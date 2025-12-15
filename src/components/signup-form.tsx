import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NavLink } from "react-router-dom"
import { X } from "lucide-react"
import { setShowLoginPage } from '@/store/loginSlice'
import { useDispatch } from 'react-redux'
import { useState } from "react"
import apiClient from "@/api/apiClient"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<{
    fullName: string,
    username: string,
    email: string,
    password: string,
    avatar: File | null,
    coverImage: File | null
  }>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null
  })

  const [signupError, setSignupError] = useState<string | null>(null)
  const [signupMessage, setSignupMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSignupError(null)
    setSignupMessage(null)
    setLoading(true)

    const formDataToSend = new FormData()
    formDataToSend.append("fullName", formData.fullName)
    formDataToSend.append("username", formData.username)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("password", formData.password)
    if (formData.avatar) formDataToSend.append("avatar", formData.avatar)
    if (formData.coverImage) formDataToSend.append("coverImage", formData.coverImage)

    try {
      const response = await apiClient.post('/api/users/register', formDataToSend)
      setSignupMessage("Account created successfully! Please login.")
      setLoading(false)

      dispatch(setShowLoginPage(true))
    } catch (error: any) {
      setSignupError(
        error.response?.data?.message || error.message || "Something went wrong"
      )
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <div className="flex flex-1 justify-between">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <NavLink to="/">
            <X />
          </NavLink>
        </div>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {signupError && (
              <div className="mb-3 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
                {signupError}
              </div>
            )}
            {signupMessage && (
              <div className="mb-3 rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
                {signupMessage}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="fullName" type="text" placeholder="John Doe" required onChange={handleChange} />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" name="username" type="text" placeholder="myusername" required onChange={handleChange} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" name="email" placeholder="m@example.com" required onChange={handleChange} />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required onChange={handleChange} />
            </Field>
            <Field>
              <FieldLabel htmlFor="avatar">Avatar</FieldLabel>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Input id="avatar" name="avatar" type="file" onChange={handleChange} />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="cover-image">Cover Image</FieldLabel>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Input id="cover-image" name="coverImage" type="file" onChange={handleChange} />
              </div>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Create Account"}
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <NavLink
                    to="/"
                    className="underline underline-offset-4"
                    onClick={() => dispatch(setShowLoginPage(true))}
                  >
                    Sign In
                  </NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}