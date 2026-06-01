import { Link } from 'react-router-dom'

import { useLoginForm } from '../../../hooks/useLoginForm'

import './LoginPage.css'

function LoginPage() {
    const {
        formData,
        error,
        isLoading,
        handleChange,
        handleSubmit,
    } = useLoginForm()

    return (
        <div className="login-page">
            <div className="login-page__card">
                <Link to="/" className="login-page__logo">
                    CareSpace
                </Link>

                <h2 className="login-page__title">
                    Вітаємо знову
                </h2>

                <p className="login-page__subtitle">
                    Увійдіть до свого облікового запису
                </p>

                <form className="login-page__form" onSubmit={handleSubmit}>
                    <div className="login-page__field">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="login-page__field">
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
                        <p className="login-page__error">
                            {error}
                        </p>
                    )}

                    <button
                        className="login-page__button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Вхід...' : 'Увійти'}
                    </button>
                </form>

                <p className="login-page__footer-text">
                    Ще не маєте облікового запису?{' '}

                    <Link to="/register">
                        Зареєструватися
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
