import { images } from '../../../assets/images'

function AdminCategoriesTable({
    categories,
    onEdit,
    onDelete,
}) {
    return (
        <div className="admin-categories-page__table-wrapper">
            <table className="admin-categories-page__table">
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Дії</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>

                            <td>
                                {category.description}
                            </td>

                            <td>
                                <div className="admin-categories-page__table-actions">
                                    <button
                                        className="admin-categories-page__icon-button"
                                        type="button"
                                        onClick={() => onEdit(category)}
                                    >
                                        <img
                                            src={images.editing}
                                            alt="Редагувати"
                                            className="admin-categories-page__edit-icon"
                                        />
                                    </button>

                                    <button
                                        className="admin-categories-page__icon-button"
                                        type="button"
                                        onClick={() => onDelete(category.id)}
                                    >
                                        <img
                                            src={images.deletion}
                                            alt="Видалити"
                                            className="admin-categories-page__delete-icon"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {categories.length === 0 && (
                <div className="admin-categories-page__empty">
                    Категорії не знайдено
                </div>
            )}
        </div>
    )
}

export default AdminCategoriesTable
