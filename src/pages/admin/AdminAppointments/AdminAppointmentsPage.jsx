import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminAppointmentsTable from '../../../components/admin/AdminAppointmentsTable/AdminAppointmentsTable'

import { images } from '../../../assets/images'
import { useAdminAppointments } from '../../../hooks/useAdminAppointments'
import { filterAdminAppointments } from '../../../utils/adminAppointmentUtils'

import './AdminAppointmentsPage.css'

function AdminAppointmentsPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const {
        appointments,
        isLoading,
        error,
    } = useAdminAppointments()

    const filteredAppointments = useMemo(() => {
        return filterAdminAppointments(appointments, searchQuery)
    }, [appointments, searchQuery])

    return (
        <div className="admin-appointments-page">
            <AdminSidebar />

            <div className="admin-appointments-page__content">
                <header className="admin-appointments-page__topbar">
                    <Link
                        to="/"
                        className="admin-appointments-page__home-button"
                    >
                        На головну
                    </Link>
                </header>

                <main className="admin-appointments-page__main">
                    <section className="admin-appointments-page__header">
                        <h1 className="admin-appointments-page__title">
                            Записи користувачів
                        </h1>

                        <p className="admin-appointments-page__subtitle">
                            Перегляд та управління записами на послуги
                        </p>
                    </section>

                    <section className="admin-appointments-page__table-card">
                        <div className="admin-appointments-page__search">
                            <img
                                src={images.search}
                                alt="Пошук"
                                className="admin-appointments-page__search-icon"
                            />

                            <input
                                type="text"
                                placeholder="Пошук за користувачем або послугою..."
                                className="admin-appointments-page__search-input"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                }
                            />
                        </div>

                        {isLoading && (
                            <p className="admin-appointments-page__message">
                                Завантаження записів...
                            </p>
                        )}

                        {error && (
                            <p className="admin-appointments-page__message admin-appointments-page__message--error">
                                {error}
                            </p>
                        )}

                        {!isLoading && !error && filteredAppointments.length === 0 && (
                            <p className="admin-appointments-page__message">
                                Записи не знайдено
                            </p>
                        )}

                        {!isLoading && !error && filteredAppointments.length > 0 && (
                            <AdminAppointmentsTable
                                appointments={filteredAppointments}
                            />
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

export default AdminAppointmentsPage
