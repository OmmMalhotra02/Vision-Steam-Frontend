import { SignupForm } from "@/components/signup-form"

export default function SignUp() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 dark:bg-gray-800 dark:text-white">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
