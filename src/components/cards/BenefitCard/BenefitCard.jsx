import { images } from '../../../assets/images'

function BenefitCard({ item }) {
    return (
        <article className="home-page__benefit-card">
            <div className="home-page__benefit-image-box">
                <img
                    src={images[item.image]}
                    alt={item.title}
                    className="home-page__benefit-image"
                />
            </div>

            <h3 className="home-page__benefit-title">
                {item.title}
            </h3>

            <p className="home-page__benefit-description">
                {item.description}
            </p>
        </article>
    )
}

export default BenefitCard
