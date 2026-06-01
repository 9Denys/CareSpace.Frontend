import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminCentresTable from '../../../components/admin/AdminCentresTable/AdminCentresTable'
import AdminCentreModal from '../../../components/admin/AdminCentreModal/AdminCentreModal'

import { images } from '../../../assets/images'
import { useAdminCentres } from '../../../hooks/useAdminCentres'
import { filterCentres } from '../../../utils/centreUtils'

import './AdminCentresPage.css'

function AdminCentresPage() {
    const [searchValue, setSearchValue] = useState('')

    const {
        centres,
        isModalOpen,
        editingCentre,
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
    } = useAdminCentres()

    const filteredCentres = useMemo(() => {
        return filterCentres(centres, searchValue)
    }, [centres, searchValue])

    return (
        <div className="admin-centres-page">
            <AdminSidebar />

            <main className="admin-centres-page__content">
                <div className="admin-centres-page__topbar">
                    <Link
                        to="/"
                        className="admin-centres-page__home-button"
                    >
                        На головну
                    </Link>
                </div>

                <section className="admin-centres-page__main">
                    <div className="admin-centres-page__header">
                        <h1 className="admin-centres-page__title">
                            Управління центрами
                        </h1>

                        <p className="admin-centres-page__subtitle">
                            Створюйте та редагуйте центри надання послуг
                        </p>
                    </div>

                    <div className="admin-centres-page__card">
                        <div className="admin-centres-page__actions">
                            <div className="admin-centres-page__search">
                                <img
                                    src={images.search}
                                    alt="Пошук"
                                    className="admin-centres-page__search-icon"
                                />

                                <input
                                    className="admin-centres-page__search-input"
                                    type="text"
                                    placeholder="Пошук центрів..."
                                    value={searchValue}
                                    onChange={(event) =>
                                        setSearchValue(event.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="admin-centres-page__add-button"
                                type="button"
                                onClick={openCreateModal}
                            >
                                Додати центр
                            </button>
                        </div>

                        {error && (
                            <div className="admin-centres-page__empty admin-centres-page__empty--error">
                                {error}
                            </div>
                        )}

                        {isLoading && (
                            <div className="admin-centres-page__empty">
                                Завантаження центрів...
                            </div>
                        )}

                        {!isLoading && (
                            <AdminCentresTable
                                centres={filteredCentres}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <AdminCentreModal
                    editingCentre={editingCentre}
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

export default AdminCentresPage
