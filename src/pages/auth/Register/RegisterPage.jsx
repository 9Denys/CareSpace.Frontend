import { Link } from 'react-router-dom'

import { useRegisterForm } from '../../../hooks/useRegisterForm'

import './RegisterPage.css'

function RegisterPage() {
    const {
        formData,
        error,
        isLoading,
        handleChange,
        handleSubmit,
    } = useRegisterForm()

    return (
        <div className="register-page">
            <div className="register-page__card">
                <Link to="/" className="register-page__logo">
                    CareSpace
                </Link>

                <h2 className="register-page__title">
                    Створити акаунт
                </h2>

                <p className="register-page__subtitle">
                    Заповніть форму для реєстрації
                </p>

                <form className="register-page__form" onSubmit={handleSubmit}>
                    <div className="register-page__row">
                        <div className="register-page__field">
                            <label>Ім&apos;я</label>

                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="register-page__field">
                            <label>Прізвище</label>

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="register-page__field">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-page__field">
                        <label>Телефон</label>

                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-page__field">
                        <label>Пароль</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && (
                        <p className="register-page__error">
                            {error}
                        </p>
                    )}

                    <button
                        className="register-page__button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Створення...' : 'Створити акаунт'}
                    </button>
                </form>

                <p className="register-page__footer-text">
                    Вже маєте обліковий запис?{' '}

                    <Link to="/login">
                        Увійти
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
