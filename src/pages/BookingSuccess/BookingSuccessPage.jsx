import { Link } from 'react-router-dom'
import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'
import { images } from '../../assets/images'
import './BookingSuccessPage.css'

function BookingSuccessPage() {
    return (
        <div className="booking-success-page">
            <Header />

            <main className="booking-success-page__main">
                <section className="booking-success-page__card">
                    <div className="booking-success-page__icon-box">
                        <img
                            src={images.benefits}
                            alt="Успішно"
                            className="booking-success-page__icon"
                        />
                    </div>

                    <h1 className="booking-success-page__title">
                        Запис успішно створено
                    </h1>

                    <p className="booking-success-page__text">
                        Ваш запис підтверджено. Деталі надіслано в особистий кабінет.
                    </p>

                    <div className="booking-success-page__actions">
                        <Link
                            to="/profile"
                            className="booking-success-page__button booking-success-page__button--primary"
                        >
                            Мої записи
                        </Link>

                        <Link
                            to="/services"
                            className="booking-success-page__button booking-success-page__button--secondary"
                        >
                            До послуг
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default BookingSuccessPage
