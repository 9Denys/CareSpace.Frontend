function AdminCentreModal({
    editingCentre,
    formData,
    isFormValid,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="admin-centres-page__overlay">
            <form
                className="admin-centres-page__modal"
                onSubmit={onSubmit}
            >
                <div className="admin-centres-page__modal-header">
                    <h2 className="admin-centres-page__modal-title">
                        {editingCentre
                            ? 'Редагувати центр'
                            : 'Створити центр'}
                    </h2>

                    <button
                        className="admin-centres-page__modal-close"
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="admin-centres-page__field">
                    <label className="admin-centres-page__label">
                        Адреса
                    </label>

                    <input
                        className="admin-centres-page__input"
                        type="text"
                        name="address"
                        placeholder="вул. Назва, 1, Місто"
                        value={formData.address}
                        onChange={onChange}
                    />
                </div>

                <div className="admin-centres-page__modal-grid">
                    <div className="admin-centres-page__field">
                        <label className="admin-centres-page__label">
                            Час відкриття
                        </label>

                        <input
                            className="admin-centres-page__input"
                            type="time"
                            name="openTime"
                            value={formData.openTime}
                            onChange={onChange}
                        />
                    </div>

                    <div className="admin-centres-page__field">
                        <label className="admin-centres-page__label">
                            Час закриття
                        </label>

                        <input
                            className="admin-centres-page__input"
                            type="time"
                            name="closeTime"
                            value={formData.closeTime}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="admin-centres-page__modal-actions">
                    <button
                        className="admin-centres-page__cancel-button"
                        type="button"
                        onClick={onClose}
                    >
                        Скасувати
                    </button>

                    <button
                        className="admin-centres-page__save-button"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        {editingCentre ? 'Зберегти' : 'Створити'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminCentreModal
