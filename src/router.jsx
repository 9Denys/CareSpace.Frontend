import { createBrowserRouter } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/auth/Login/LoginPage'
import RegisterPage from './pages/auth/Register/RegisterPage'
import ServicesPage from './pages/Services/ServicesPage'
import ServiceDetailsPage from './pages/ServiceDetails/ServiceDetailsPage'
import BookingPage from './pages/Booking/BookingPage'
import BookingSuccessPage from './pages/BookingSuccess/BookingSuccessPage'
import ProfilePage from './pages/Profile/ProfilePage'
import AdminAppointmentsPage from './pages/admin/AdminAppointments/AdminAppointmentsPage'
import AdminServiceSchedulesPage from './pages/admin/AdminServiceSchedulesPage/AdminServiceSchedulesPage'
import AdminTimeSlotsPage from './pages/admin/AdminTimeSlotsPage/AdminTimeSlotsPage'
import AdminCentresPage from './pages/admin/AdminCentresPage/AdminCentresPage'
import AdminServicesPage from './pages/admin/AdminServicesPage/AdminServicesPage'
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage/AdminCategoriesPage'
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute'
import AdminRoute from './components/common/AdminRoute/AdminRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },

    {
        path: '/login',
        element: <LoginPage />,
    },

    {
        path: '/register',
        element: <RegisterPage />,
    },

    {
        path: '/services',
        element: <ServicesPage />,
    },

    {
        path: '/services/:id',
        element: <ServiceDetailsPage />,
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/booking/:id',
                element: <BookingPage />,
            },

            {
                path: '/booking-success',
                element: <BookingSuccessPage />,
            },

            {
                path: '/profile',
                element: <ProfilePage />,
            },
        ],
    },

    {
        element: <AdminRoute />,
        children: [
            {
                path: '/admin/appointments',
                element: <AdminAppointmentsPage />,
            },

            {
                path: '/admin/service-schedules',
                element: <AdminServiceSchedulesPage />,
            },

            {
                path: '/admin/slots',
                element: <AdminTimeSlotsPage />,
            },

            {
                path: '/admin/centres',
                element: <AdminCentresPage />,
            },

            {
                path: '/admin/services',
                element: <AdminServicesPage />,
            },

            {
                path: '/admin/categories',
                element: <AdminCategoriesPage />,
            },
        ],
    },
])
