import { Link } from 'react-router-dom'

import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminServiceScheduleForm from '../../../components/admin/AdminServiceScheduleForm/AdminServiceScheduleForm'
import AdminServiceSchedulesList from '../../../components/admin/AdminServiceSchedulesList/AdminServiceSchedulesList'

import { useAdminServiceSchedules } from '../../../hooks/useAdminServiceSchedules'

import './AdminServiceSchedulesPage.css'

function AdminServiceSchedulesPage() {
    const {
        services,
        centres,
        timeSlots,
        schedules,
        isLoading,
        error,
        formData,
        isFormValid,
        handleChange,
        handleSubmit,
        handleDelete,
    } = useAdminServiceSchedules()

    return (
        <div className="admin-service-schedules-page">
            <AdminSidebar />

            <main className="admin-service-schedules-page__content">
                <div className="admin-service-schedules-page__topbar">
                    <Link
                        to="/"
                        className="admin-service-schedules-page__home-button"
                    >
                        На головну
                    </Link>
                </div>

                <section className="admin-service-schedules-page__main">
                    <div className="admin-service-schedules-page__header">
                        <h1 className="admin-service-schedules-page__title">
                            Розклад послуг
                        </h1>

                        <p className="admin-service-schedules-page__subtitle">
                            Створіть зв&apos;язок між послугою, центром та часовим слотом
                        </p>
                    </div>

                    {error && (
                        <div className="admin-service-schedules-page__empty admin-service-schedules-page__empty--error">
                            {error}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="admin-service-schedules-page__empty">
                            Завантаження розкладу...
                        </div>
                    ) : (
                        <div className="admin-service-schedules-page__grid">
                            <AdminServiceScheduleForm
                                services={services}
                                centres={centres}
                                timeSlots={timeSlots}
                                formData={formData}
                                isFormValid={isFormValid}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                            />

                            <AdminServiceSchedulesList
                                schedules={schedules}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default AdminServiceSchedulesPage
