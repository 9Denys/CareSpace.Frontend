import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">

                <div className="footer__top">

                    <div className="footer__column">
                        <h2 className="footer__logo">
                            CareSpace
                        </h2>

                        <p className="footer__description">
                            Система надання соціальних
                            послуг з можливістю
                            онлайн-запису
                        </p>
                    </div>

                    <div className="footer__column">
                        <h3 className="footer__title">
                            Навігація
                        </h3>

                        <div className="footer__links">
                            <Link
                                to="/"
                                className="footer__link"
                            >
                                Головна
                            </Link>

                            <Link
                                to="/services"
                                className="footer__link"
                            >
                                Послуги
                            </Link>
                        </div>
                    </div>

                    <div className="footer__column">
                        <h3 className="footer__title">
                            Для користувачів
                        </h3>

                        <div className="footer__links">
                            <Link
                                to="/login"
                                className="footer__link"
                            >
                                Увійти
                            </Link>

                            <Link
                                to="/register"
                                className="footer__link"
                            >
                                Зареєструватися
                            </Link>

                            <Link
                                to="/profile"
                                className="footer__link"
                            >
                                Особистий кабінет
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="footer__bottom">

                    <p className="footer__copyright">
                        © 2026 CareSpace. Всі права захищено.
                    </p>

                    <p className="footer__hotline">
                        Гаряча лінія:
                        <span> 0 800 123 456</span>
                    </p>

                </div>

            </div>
        </footer>
    )
}

export default Footer
