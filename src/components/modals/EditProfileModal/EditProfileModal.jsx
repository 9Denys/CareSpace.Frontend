function EditProfileModal({
    userData,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="profile-modal">
            <div className="profile-modal__overlay">
                <form
                    className="profile-modal__content"
                    onSubmit={onSubmit}
                >
                    <div className="profile-modal__header">
                        <h2 className="profile-modal__title">
                            Редагувати профіль
                        </h2>

                        <button
                            type="button"
                            className="profile-modal__close"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>

                    <div className="profile-modal__field">
                        <label className="profile-modal__label">
                            Ім&apos;я
                        </label>

                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={onChange}
                            className="profile-modal__input"
                        />
                    </div>

                    <div className="profile-modal__field">
                        <label className="profile-modal__label">
                            Прізвище
                        </label>

                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={onChange}
                            className="profile-modal__input"
                        />
                    </div>

                    <div className="profile-modal__field">
                        <label className="profile-modal__label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={onChange}
                            className="profile-modal__input"
                        />
                    </div>

                    <div className="profile-modal__field">
                        <label className="profile-modal__label">
                            Телефон
                        </label>

                        <input
                            type="tel"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={onChange}
                            className="profile-modal__input"
                        />
                    </div>

                    <div className="profile-modal__field">
                        <label className="profile-modal__label">
                            Поточний пароль
                        </label>

                        <input
                            type="password"
                            name="currentPassword"
                            value={userData.currentPassword}
                            onChange={onChange}
                            className="profile-modal__input"
                            placeholder="Поточний пароль"
                        />
                    </div>

                    <div className="profile-modal__field">
                        <label className="profile-modal__label">
                            Новий пароль
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={onChange}
                            className="profile-modal__input"
                            placeholder="Новий пароль"
                        />
                    </div>

                    <div className="profile-modal__actions">
                        <button
                            type="button"
                            className="profile-modal__cancel"
                            onClick={onClose}
                        >
                            Скасувати
                        </button>

                        <button
                            type="submit"
                            className="profile-modal__save"
                        >
                            Зберегти зміни
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal
