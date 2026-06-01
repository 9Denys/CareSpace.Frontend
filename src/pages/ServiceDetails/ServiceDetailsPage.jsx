import { Link, useParams } from 'react-router-dom'

import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'

import { images } from '../../assets/images'
import { useServiceDetails } from '../../hooks/useServiceDetails'

import './ServiceDetailsPage.css'

function ServiceDetailsPage() {
    const { id } = useParams()

    const {
        service,
        isLoading,
        error
    } = useServiceDetails(id)

    return (
        <div className="service-details-page">
            <Header />

            <main className="service-details-page__main">
                {isLoading && (
                    <p className="service-details-page__message">
                        Завантаження послуги...
                    </p>
                )}

                {error && (
                    <p className="service-details-page__message service-details-page__message--error">
                        {error}
                    </p>
                )}

                {!isLoading && !error && service && (
                    <section className="service-details-page__card">
                        <div className="service-details-page__icon-box">
                            <img
                                src={images.services}
                                alt="Послуга"
                                className="service-details-page__icon"
                            />
                        </div>

                        <span className="service-details-page__badge">
                            {service.categoryName}
                        </span>

                        <h1 className="service-details-page__title">
                            {service.title}
                        </h1>

                        <p className="service-details-page__description">
                            {service.description}
                        </p>

                        <div className="service-details-page__duration">
                            <img
                                src={images.timeServices}
                                alt="Тривалість"
                                className="service-details-page__small-icon"
                            />

                            <span>
                                Тривалість: {service.durationMinutes} хв
                            </span>
                        </div>

                        <div className="service-details-page__divider"></div>

                        <div className="service-details-page__actions">
                            <Link
                                to={`/booking/${service.id}`}
                                className="service-details-page__button"
                            >
                                Записатися
                            </Link>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default ServiceDetailsPage
