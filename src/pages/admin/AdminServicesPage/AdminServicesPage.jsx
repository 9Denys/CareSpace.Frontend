import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminServicesTable from '../../../components/admin/AdminServicesTable/AdminServicesTable'
import AdminServiceModal from '../../../components/admin/AdminServiceModal/AdminServiceModal'

import { images } from '../../../assets/images'
import { useAdminServices } from '../../../hooks/useAdminServices'
import { filterAdminServices } from '../../../utils/serviceAdminUtils'

import './AdminServicesPage.css'

function AdminServicesPage() {
    const [searchValue, setSearchValue] = useState('')

    const {
        services,
        categories,
        isModalOpen,
        editingService,
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
    } = useAdminServices()

    const filteredServices = useMemo(() => {
        return filterAdminServices(services, searchValue)
    }, [services, searchValue])

    return (
        <div className="admin-services-page">
            <AdminSidebar />

            <main className="admin-services-page__content">
                <div className="admin-services-page__topbar">
                    <Link
                        to="/"
                        className="admin-services-page__home-button"
                    >
                        На головну
                    </Link>
                </div>

                <section className="admin-services-page__main">
                    <div className="admin-services-page__header">
                        <h1 className="admin-services-page__title">
                            Управління послугами
                        </h1>

                        <p className="admin-services-page__subtitle">
                            Створюйте та редагуйте доступні послуги
                        </p>
                    </div>

                    <div className="admin-services-page__card">
                        <div className="admin-services-page__actions">
                            <div className="admin-services-page__search">
                                <img
                                    src={images.search}
                                    alt="Пошук"
                                    className="admin-services-page__search-icon"
                                />

                                <input
                                    className="admin-services-page__search-input"
                                    type="text"
                                    placeholder="Пошук послуг..."
                                    value={searchValue}
                                    onChange={(event) =>
                                        setSearchValue(event.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="admin-services-page__add-button"
                                type="button"
                                onClick={openCreateModal}
                            >
                                Додати послугу
                            </button>
                        </div>

                        {error && (
                            <div className="admin-services-page__empty admin-services-page__empty--error">
                                {error}
                            </div>
                        )}

                        {isLoading && (
                            <div className="admin-services-page__empty">
                                Завантаження послуг...
                            </div>
                        )}

                        {!isLoading && (
                            <AdminServicesTable
                                services={filteredServices}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <AdminServiceModal
                    editingService={editingService}
                    categories={categories}
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

export default AdminServicesPage
