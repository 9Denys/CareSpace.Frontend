import { images } from '../../../assets/images'

function HomeServiceCard({ service }) {
    return (
        <article className="home-page__service-card">
            <div className="home-page__service-image-box">
                <img
                    src={images.services}
                    alt="Послуга"
                    className="home-page__service-image"
                />
            </div>

            <h3 className="home-page__service-title">
                {service.title}
            </h3>

            <p className="home-page__service-description">
                {service.description}
            </p>

            <div className="home-page__service-time">
                <img
                    src={images.timeServices}
                    alt="Тривалість"
                    className="home-page__time-image"
                />

                <span>{service.duration}</span>
            </div>
        </article>
    )
}

export default HomeServiceCard
