import { Link, useLocation } from 'react-router-dom'
import { images } from '../../../assets/images'
import './AdminSidebar.css'

function AdminSidebar() {
    const location = useLocation()

    const menuItems = [
        {
            title: 'Категорії',
            icon: images.adminCategory,
            path: '/admin/categories',
        },
        {
            title: 'Послуги',
            icon: images.adminServices,
            path: '/admin/services',
        },
        {
            title: 'Центри',
            icon: images.adminCentres,
            path: '/admin/centres',
        },
        {
            title: 'Часові слоти',
            icon: images.adminSlots,
            path: '/admin/slots',
        },
        {
            title: 'Розклад послуг',
            icon: images.adminTimetable,
            path: '/admin/service-schedules',
        },
        {
            title: 'Записи користувачів',
            icon: images.adminAppointments,
            path: '/admin/appointments',
        },
    ]

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__logo-block">
                <h2 className="admin-sidebar__logo">
                    CareSpace
                </h2>

                <p className="admin-sidebar__role">
                    Адміністрування
                </p>
            </div>

            <nav className="admin-sidebar__nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.title}
                        to={item.path}
                        className={
                            location.pathname === item.path
                                ? 'admin-sidebar__link admin-sidebar__link--active'
                                : 'admin-sidebar__link'
                        }
                    >
                        <img
                            src={item.icon}
                            alt={item.title}
                            className="admin-sidebar__icon"
                        />

                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

export default AdminSidebar
