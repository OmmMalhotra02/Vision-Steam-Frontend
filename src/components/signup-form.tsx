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
    <Card {...props} className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-1 justify-between">
          <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Create an account</CardTitle>
          <NavLink to="/">
            <X />
          </NavLink>
        </div>
        <CardDescription className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <div className="mx-6 h-px bg-gray-200 dark:bg-gray-700" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {signupError && (
              <div className="mb-3 rounded-md bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {signupError}
              </div>
            )}
            {signupMessage && (
              <div className="mb-3 rounded-md bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                {signupMessage}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</FieldLabel>
              <Input id="name" name="fullName" type="text" placeholder="John Doe" required onChange={handleChange} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500" />
            </Field>
            <Field>
              <FieldLabel htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</FieldLabel>
              <Input id="username" name="username" type="text" placeholder="myusername" required onChange={handleChange} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</FieldLabel>
              <Input id="email" type="email" name="email" placeholder="m@example.com" required onChange={handleChange} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500" />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</FieldLabel>
              <Input id="password" name="password" type="password" required onChange={handleChange} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500" />
            </Field>
            <Field>
              <FieldLabel htmlFor="avatar" className="text-gray-700 dark:text-gray-300">Avatar</FieldLabel>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Input id="avatar" name="avatar" type="file" onChange={handleChange} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500" />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="cover-image" className="text-gray-700 dark:text-gray-300">Cover Image</FieldLabel>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Input id="cover-image" name="coverImage" type="file" onChange={handleChange} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500" />
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
                <FieldDescription className="text-gray-600 dark:text-gray-400">
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