import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {

    const loginStatus = useSelector((state: any) => state.login.status)

    if(!loginStatus) return <Navigate to='/login' replace />
    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute