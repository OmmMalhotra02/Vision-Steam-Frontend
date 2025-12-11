import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from '@/components/login-form'

function Login() {

    const dispatch = useDispatch()
    const loginPage = useSelector((state: any) => state.login.showLoginPage)

    return (
        <div className='flex items-center justify-center h-screen'>
            {loginPage && <LoginForm className='w-120 flex align-middle justify-between' />}
        </div>
    )
}

export default Login