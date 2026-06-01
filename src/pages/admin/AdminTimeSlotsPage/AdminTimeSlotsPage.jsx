import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminTimeSlotsTable from '../../../components/admin/AdminTimeSlotsTable/AdminTimeSlotsTable'
import AdminTimeSlotModal from '../../../components/admin/AdminTimeSlotModal/AdminTimeSlotModal'

import { images } from '../../../assets/images'
import { useAdminTimeSlots } from '../../../hooks/useAdminTimeSlots'
import { filterTimeSlots } from '../../../utils/timeSlotUtils'

import './AdminTimeSlotsPage.css'

function AdminTimeSlotsPage() {
    const [searchValue, setSearchValue] = useState('')

    const {
        slots,
        isModalOpen,
        editingSlot,
        isLoading,
        error,
        formData,
        isFormValid,
        openCreateModal,
        openEditModal,
        closeModal,
        handleChange,
        handleSubmit,
        handleDelete,
    } = useAdminTimeSlots()

    const filteredSlots = useMemo(() => {
        return filterTimeSlots(slots, searchValue)
    }, [slots, searchValue])

    return (
        <div className="admin-time-slots-page">
            <AdminSidebar />

            <main className="admin-time-slots-page__content">
                <div className="admin-time-slots-page__topbar">
                    <Link
                        to="/"
                        className="admin-time-slots-page__home-button"
                    >
                        На головну
                    </Link>
                </div>

                <section className="admin-time-slots-page__main">
                    <div className="admin-time-slots-page__header">
                        <h1 className="admin-time-slots-page__title">
                            Управління часовими слотами
                        </h1>

                        <p className="admin-time-slots-page__subtitle">
                            Створюйте та редагуйте доступні часові слоти
                        </p>
                    </div>

                    <div className="admin-time-slots-page__card">
                        <div className="admin-time-slots-page__actions">
                            <div className="admin-time-slots-page__search">
                                <img
                                    src={images.search}
                                    alt="Пошук"
                                    className="admin-time-slots-page__search-icon"
                                />

                                <input
                                    className="admin-time-slots-page__search-input"
                                    type="text"
                                    placeholder="Пошук слотів за датою..."
                                    value={searchValue}
                                    onChange={(event) =>
                                        setSearchValue(event.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="admin-time-slots-page__add-button"
                                type="button"
                                onClick={openCreateModal}
                            >
                                Додати слот
                            </button>
                        </div>

                        {error && (
                            <div className="admin-time-slots-page__empty admin-time-slots-page__empty--error">
                                {error}
                            </div>
                        )}

                        {isLoading && (
                            <div className="admin-time-slots-page__empty">
                                Завантаження часових слотів...
                            </div>
                        )}

                        {!isLoading && (
                            <AdminTimeSlotsTable
                                slots={filteredSlots}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <AdminTimeSlotModal
                    editingSlot={editingSlot}
                    formData={formData}
                    isFormValid={isFormValid}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={closeModal}
                />
            )}
        </div>
    )
}

export default AdminTimeSlotsPage
