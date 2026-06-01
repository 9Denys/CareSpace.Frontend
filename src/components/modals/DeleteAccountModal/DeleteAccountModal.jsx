function DeleteAccountModal({
    onClose,
    onDelete,
}) {
    return (
        <div className="delete-modal">
            <div className="delete-modal__overlay">
                <div className="delete-modal__content">
                    <h2 className="delete-modal__title">
                        Ви впевнені?
                    </h2>

                    <p className="delete-modal__text">
                        Ця дія незворотна. Ваш обліковий запис та всі
                        дані будуть назавжди видалені.
                    </p>

                    <div className="delete-modal__actions">
                        <button
                            type="button"
                            className="delete-modal__cancel"
                            onClick={onClose}
                        >
                            Скасувати
                        </button>

                        <button
                            type="button"
                            className="delete-modal__delete"
                            onClick={onDelete}
                        >
                            Видалити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal
