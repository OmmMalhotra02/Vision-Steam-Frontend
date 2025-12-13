import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const { status, userData } = useSelector((state: any) => state.login)

    if (!status || !userData) {
        return <Navigate to="/" replace />
    }

    return children
}