import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminCategoriesTable from '../../../components/admin/AdminCategoriesTable/AdminCategoriesTable'
import AdminCategoryModal from '../../../components/admin/AdminCategoryModal/AdminCategoryModal'

import { images } from '../../../assets/images'
import { useAdminCategories } from '../../../hooks/useAdminCategories'
import { filterCategories } from '../../../utils/categoryUtils'

import './AdminCategoriesPage.css'

function AdminCategoriesPage() {
    const [searchValue, setSearchValue] = useState('')

    const {
        categories,
        isModalOpen,
        editingCategory,
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
    } = useAdminCategories()

    const filteredCategories = useMemo(() => {
        return filterCategories(categories, searchValue)
    }, [categories, searchValue])

    return (
        <div className="admin-categories-page">
            <AdminSidebar />

            <main className="admin-categories-page__content">
                <div className="admin-categories-page__topbar">
                    <Link
                        to="/"
                        className="admin-categories-page__home-button"
                    >
                        На головну
                    </Link>
                </div>

                <section className="admin-categories-page__main">
                    <div className="admin-categories-page__header">
                        <h1 className="admin-categories-page__title">
                            Управління категоріями
                        </h1>

                        <p className="admin-categories-page__subtitle">
                            Створюйте та редагуйте категорії послуг
                        </p>
                    </div>

                    <div className="admin-categories-page__card">
                        <div className="admin-categories-page__actions">
                            <div className="admin-categories-page__search">
                                <img
                                    src={images.search}
                                    alt="Пошук"
                                    className="admin-categories-page__search-icon"
                                />

                                <input
                                    className="admin-categories-page__search-input"
                                    type="text"
                                    placeholder="Пошук категорій..."
                                    value={searchValue}
                                    onChange={(event) =>
                                        setSearchValue(event.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="admin-categories-page__add-button"
                                type="button"
                                onClick={openCreateModal}
                            >
                                Додати категорію
                            </button>
                        </div>

                        {error && (
                            <div className="admin-categories-page__empty admin-categories-page__empty--error">
                                {error}
                            </div>
                        )}

                        {isLoading && (
                            <div className="admin-categories-page__empty">
                                Завантаження категорій...
                            </div>
                        )}

                        {!isLoading && (
                            <AdminCategoriesTable
                                categories={filteredCategories}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <AdminCategoryModal
                    editingCategory={editingCategory}
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

export default AdminCategoriesPage
