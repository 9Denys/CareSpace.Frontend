import { images } from '../../../assets/images'

function AdminTimeSlotsTable({
    slots,
    onEdit,
    onDelete,
}) {
    return (
        <div className="admin-time-slots-page__table-wrapper">
            <table className="admin-time-slots-page__table">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Час початку</th>
                        <th>Час завершення</th>
                        <th>Статус</th>
                        <th>Дії</th>
                    </tr>
                </thead>

                <tbody>
                    {slots.map((slot) => (
                        <tr key={slot.id}>
                            <td>{slot.date}</td>
                            <td>{slot.startTime}</td>
                            <td>{slot.endTime}</td>
                            <td>
                                {slot.isAvailable
                                    ? 'Доступний'
                                    : 'Зайнятий'}
                            </td>

                            <td>
                                <div className="admin-time-slots-page__table-actions">
                                    <button
                                        className="admin-time-slots-page__icon-button"
                                        type="button"
                                        onClick={() => onEdit(slot)}
                                    >
                                        <img
                                            src={images.editing}
                                            alt="Редагувати"
                                            className="admin-time-slots-page__edit-icon"
                                        />
                                    </button>

                                    <button
                                        className="admin-time-slots-page__icon-button"
                                        type="button"
                                        onClick={() => onDelete(slot.id)}
                                    >
                                        <img
                                            src={images.deletion}
                                            alt="Видалити"
                                            className="admin-time-slots-page__delete-icon"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {slots.length === 0 && (
                <div className="admin-time-slots-page__empty">
                    Часові слоти не знайдено
                </div>
            )}
        </div>
    )
}

export default AdminTimeSlotsTable
