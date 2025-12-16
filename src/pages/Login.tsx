import { LoginForm } from '@/components/login-form'

function Login() {

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
            <LoginForm className='w-full sm:w-96 flex justify-between' />
        </div>
    )
}

export default Login
