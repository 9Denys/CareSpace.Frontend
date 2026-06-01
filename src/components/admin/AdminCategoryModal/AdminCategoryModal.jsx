function AdminCategoryModal({
    editingCategory,
    formData,
    isFormValid,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="admin-categories-page__overlay">
            <form
                className="admin-categories-page__modal"
                onSubmit={onSubmit}
            >
                <div className="admin-categories-page__modal-header">
                    <h2 className="admin-categories-page__modal-title">
                        {editingCategory
                            ? 'Редагувати категорію'
                            : 'Створити категорію'}
                    </h2>

                    <button
                        className="admin-categories-page__modal-close"
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="admin-categories-page__field">
                    <label className="admin-categories-page__label">
                        Назва категорії
                    </label>

                    <input
                        className="admin-categories-page__input"
                        type="text"
                        name="name"
                        placeholder="Введіть назву категорії"
                        value={formData.name}
                        onChange={onChange}
                    />
                </div>

                <div className="admin-categories-page__field">
                    <label className="admin-categories-page__label">
                        Опис категорії
                    </label>

                    <textarea
                        className="admin-categories-page__textarea"
                        name="description"
                        placeholder="Опишіть категорію"
                        value={formData.description}
                        onChange={onChange}
                    />
                </div>

                <div className="admin-categories-page__modal-actions">
                    <button
                        className="admin-categories-page__cancel-button"
                        type="button"
                        onClick={onClose}
                    >
                        Скасувати
                    </button>

                    <button
                        className="admin-categories-page__save-button"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        {editingCategory ? 'Зберегти' : 'Створити'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminCategoryModal
