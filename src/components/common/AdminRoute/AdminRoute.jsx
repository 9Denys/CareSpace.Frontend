import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

function AdminRoute() {
    const { user, isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return null
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role !== 1) {
        return <Navigate to="/profile" replace />
    }

    return <Outlet />
}

export default AdminRoute
