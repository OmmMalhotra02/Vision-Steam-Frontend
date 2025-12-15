import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from '@/components/login-form'

function Login() {

    const dispatch = useDispatch()
    const loginPage = useSelector((state: any) => state.login.showLoginPage)

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
            {loginPage && <LoginForm className='w-full sm:w-96 flex justify-between' />}
        </div>
    )
}

export default Login
