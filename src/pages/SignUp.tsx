import { SignupForm } from "@/components/signup-form"

export default function SignUp() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
