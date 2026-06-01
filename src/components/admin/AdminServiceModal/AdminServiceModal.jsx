function AdminServiceModal({
    editingService,
    categories,
    formData,
    isFormValid,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="admin-services-page__overlay">
            <form
                className="admin-services-page__modal"
                onSubmit={onSubmit}
            >
                <div className="admin-services-page__modal-header">
                    <h2 className="admin-services-page__modal-title">
                        {editingService
                            ? 'Редагувати послугу'
                            : 'Створити послугу'}
                    </h2>

                    <button
                        className="admin-services-page__modal-close"
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="admin-services-page__field">
                    <label className="admin-services-page__label">
                        Назва
                    </label>

                    <input
                        className="admin-services-page__input"
                        type="text"
                        name="title"
                        placeholder="Введіть назву послуги"
                        value={formData.title}
                        onChange={onChange}
                    />
                </div>

                <div className="admin-services-page__field">
                    <label className="admin-services-page__label">
                        Опис
                    </label>

                    <textarea
                        className="admin-services-page__textarea"
                        name="description"
                        placeholder="Опишіть послугу"
                        value={formData.description}
                        onChange={onChange}
                    />
                </div>

                <div className="admin-services-page__field">
                    <label className="admin-services-page__label">
                        Категорія
                    </label>

                    <select
                        className="admin-services-page__input"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={onChange}
                    >
                        <option value="">
                            Оберіть категорію
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="admin-services-page__field">
                    <label className="admin-services-page__label">
                        Тривалість у хвилинах
                    </label>

                    <input
                        className="admin-services-page__input"
                        type="number"
                        min="5"
                        step="5"
                        name="durationMinutes"
                        placeholder="Наприклад, 60"
                        value={formData.durationMinutes}
                        onChange={onChange}
                    />
                </div>

                <div className="admin-services-page__field">
                    <label className="admin-services-page__checkbox-label">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={onChange}
                        />

                        Активна послуга
                    </label>
                </div>

                <div className="admin-services-page__modal-actions">
                    <button
                        className="admin-services-page__cancel-button"
                        type="button"
                        onClick={onClose}
                    >
                        Скасувати
                    </button>

                    <button
                        className="admin-services-page__save-button"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        {editingService ? 'Зберегти' : 'Створити'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminServiceModal
