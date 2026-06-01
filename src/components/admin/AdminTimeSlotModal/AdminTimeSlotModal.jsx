function AdminTimeSlotModal({
    editingSlot,
    formData,
    isFormValid,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="admin-time-slots-page__overlay">
            <form
                className="admin-time-slots-page__modal"
                onSubmit={onSubmit}
            >
                <div className="admin-time-slots-page__modal-header">
                    <h2 className="admin-time-slots-page__modal-title">
                        {editingSlot
                            ? 'Редагувати часовий слот'
                            : 'Створити часовий слот'}
                    </h2>

                    <button
                        className="admin-time-slots-page__modal-close"
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="admin-time-slots-page__field">
                    <label className="admin-time-slots-page__label">
                        Дата
                    </label>

                    <input
                        className="admin-time-slots-page__input"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={onChange}
                    />
                </div>

                <div className="admin-time-slots-page__modal-grid">
                    <div className="admin-time-slots-page__field">
                        <label className="admin-time-slots-page__label">
                            Час початку
                        </label>

                        <input
                            className="admin-time-slots-page__input"
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={onChange}
                        />
                    </div>

                    <div className="admin-time-slots-page__field">
                        <label className="admin-time-slots-page__label">
                            Час завершення
                        </label>

                        <input
                            className="admin-time-slots-page__input"
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="admin-time-slots-page__field">
                    <label className="admin-time-slots-page__checkbox-label">
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={onChange}
                        />

                        Слот доступний
                    </label>
                </div>

                <div className="admin-time-slots-page__modal-actions">
                    <button
                        className="admin-time-slots-page__cancel-button"
                        type="button"
                        onClick={onClose}
                    >
                        Скасувати
                    </button>

                    <button
                        className="admin-time-slots-page__save-button"
                        type="submit"
                        disabled={!isFormValid}
                    >
                        {editingSlot
                            ? 'Зберегти'
                            : 'Створити слот'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminTimeSlotModal
