import { images } from '../../../assets/images'

function AdminServicesTable({
    services,
    onEdit,
    onDelete,
}) {
    return (
        <div className="admin-services-page__table-wrapper">
            <table className="admin-services-page__table">
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Категорія</th>
                        <th>Тривалість</th>
                        <th>Статус</th>
                        <th>Дії</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.title}</td>
                            <td>{service.categoryName}</td>
                            <td>{service.durationMinutes} хв</td>
                            <td>
                                {service.isActive
                                    ? 'Активна'
                                    : 'Неактивна'}
                            </td>

                            <td>
                                <div className="admin-services-page__table-actions">
                                    <button
                                        className="admin-services-page__icon-button"
                                        type="button"
                                        onClick={() => onEdit(service)}
                                    >
                                        <img
                                            src={images.editing}
                                            alt="Редагувати"
                                            className="admin-services-page__edit-icon"
                                        />
                                    </button>

                                    <button
                                        className="admin-services-page__icon-button"
                                        type="button"
                                        onClick={() => onDelete(service.id)}
                                    >
                                        <img
                                            src={images.deletion}
                                            alt="Видалити"
                                            className="admin-services-page__delete-icon"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {services.length === 0 && (
                <div className="admin-services-page__empty">
                    Послуги не знайдено
                </div>
            )}
        </div>
    )
}

export default AdminServicesTable
