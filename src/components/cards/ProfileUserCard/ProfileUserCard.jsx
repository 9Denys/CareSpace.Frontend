import { images } from '../../../assets/images'

function ProfileUserCard({
    userData,
    onEdit,
    onDelete,
}) {
    return (
        <section className="profile-page__user-card">
            <div className="profile-page__user-info">
                <div className="profile-page__avatar">
                    <img
                        src={images.user}
                        alt="Користувач"
                        className="profile-page__avatar-icon"
                    />
                </div>

                <div>
                    <h2 className="profile-page__user-name">
                        {userData.firstName} {userData.lastName}
                    </h2>

                    <p className="profile-page__user-text">
                        {userData.email}
                    </p>

                    <p className="profile-page__user-text">
                        {userData.phoneNumber || 'Телефон не вказано'}
                    </p>
                </div>
            </div>

            <div className="profile-page__user-actions">
                <button
                    type="button"
                    className="profile-page__edit-button"
                    onClick={onEdit}
                >
                    Редагувати профіль
                </button>

                <button
                    type="button"
                    className="profile-page__delete-button"
                    onClick={onDelete}
                >
                    Видалити обліковий запис
                </button>
            </div>
        </section>
    )
}

export default ProfileUserCard
