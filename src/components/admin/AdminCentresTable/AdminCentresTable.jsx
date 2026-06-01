import { images } from '../../../assets/images'

function AdminCentresTable({
    centres,
    onEdit,
    onDelete,
}) {
    return (
        <div className="admin-centres-page__table-wrapper">
            <table className="admin-centres-page__table">
                <thead>
                    <tr>
                        <th>Адреса</th>
                        <th>Час відкриття</th>
                        <th>Час закриття</th>
                        <th>Дії</th>
                    </tr>
                </thead>

                <tbody>
                    {centres.map((centre) => (
                        <tr key={centre.id}>
                            <td>{centre.address}</td>
                            <td>{centre.openTime}</td>
                            <td>{centre.closeTime}</td>

                            <td>
                                <div className="admin-centres-page__table-actions">
                                    <button
                                        className="admin-centres-page__icon-button"
                                        type="button"
                                        onClick={() => onEdit(centre)}
                                    >
                                        <img
                                            src={images.editing}
                                            alt="Редагувати"
                                            className="admin-centres-page__edit-icon"
                                        />
                                    </button>

                                    <button
                                        className="admin-centres-page__icon-button"
                                        type="button"
                                        onClick={() => onDelete(centre.id)}
                                    >
                                        <img
                                            src={images.deletion}
                                            alt="Видалити"
                                            className="admin-centres-page__delete-icon"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {centres.length === 0 && (
                <div className="admin-centres-page__empty">
                    Центри не знайдено
                </div>
            )}
        </div>
    )
}

export default AdminCentresTable
