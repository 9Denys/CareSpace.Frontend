import { Link } from 'react-router-dom'

import { images } from '../../../assets/images'

function ServiceCard({ service }) {
    return (
        <article
            className="services-page__card"
            key={service.id}
        >
            <div className="services-page__icon-box">
                <img
                    src={images.services}
                    alt="Послуга"
                    className="services-page__icon"
                />
            </div>

            <span className="services-page__badge">
                {service.categoryName}
            </span>

            <h2 className="services-page__card-title">
                {service.title}
            </h2>

            <p className="services-page__card-text">
                {service.description}
            </p>

            <div className="services-page__card-bottom">
                <div className="services-page__time">
                    <img
                        src={images.timeServices}
                        alt="Тривалість"
                        className="services-page__time-icon"
                    />

                    <span>
                        {service.durationMinutes} хв
                    </span>
                </div>

                <Link
                    to={`/services/${service.id}`}
                    className="services-page__details-button"
                >
                    Детальніше
                </Link>
            </div>
        </article>
    )
}

export default ServiceCard
