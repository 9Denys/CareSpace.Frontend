import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'
import HomeServiceCard from '../../components/cards/HomeServiceCard/HomeServiceCard'
import BenefitCard from '../../components/cards/BenefitCard/BenefitCard'
import StepCard from '../../components/cards/StepCard/StepCard'

import { images } from '../../assets/images'
import {
    popularServices,
    benefits,
    steps,
    aboutItems,
} from '../../constants/homeData'

import './HomePage.css'

function HomePage() {
    return (
        <div className="home-page">
            <Header />

            <main>
                <section className="home-page__hero">
                    <div className="home-page__hero-content">
                        <h1 className="home-page__hero-title">
                            Соціальні послуги поруч з вами
                        </h1>

                        <p className="home-page__hero-text">
                            Переглядайте доступні послуги, обирайте центр та
                            записуйтесь онлайн у зручний час.
                        </p>

                        <a href="/services" className="home-page__hero-button">
                            Переглянути послуги
                        </a>
                    </div>
                </section>

                <section className="home-page__section">
                    <div className="home-page__section-header">
                        <h2 className="home-page__section-title">
                            Популярні послуги
                        </h2>

                        <p className="home-page__section-subtitle">
                            Найбільш затребувані види допомоги
                        </p>
                    </div>

                    <div className="home-page__services">
                        {popularServices.map((service) => (
                            <HomeServiceCard
                                key={service.id}
                                service={service}
                            />
                        ))}
                    </div>
                </section>

                <section className="home-page__section">
                    <div className="home-page__section-header">
                        <h2 className="home-page__section-title">
                            Переваги онлайн-запису
                        </h2>

                        <p className="home-page__section-subtitle">
                            Чому варто використовувати CareSpace
                        </p>
                    </div>

                    <div className="home-page__benefits">
                        {benefits.map((item) => (
                            <BenefitCard
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </section>

                <section className="home-page__section">
                    <div className="home-page__section-header">
                        <h2 className="home-page__section-title">
                            Як працює система
                        </h2>

                        <p className="home-page__section-subtitle">
                            Отримати допомогу просто
                        </p>
                    </div>

                    <div className="home-page__steps">
                        {steps.map((step) => (
                            <StepCard
                                key={step.id}
                                step={step}
                            />
                        ))}
                    </div>
                </section>

                <section className="home-page__about">
                    <div className="home-page__about-content">
                        <h2 className="home-page__about-title">
                            Про систему CareSpace
                        </h2>

                        <p className="home-page__about-text">
                            CareSpace — це сучасна платформа для надання
                            соціальних послуг, яка допомагає громадянам легко
                            знаходити та отримувати необхідну підтримку. Ми
                            об'єднуємо центри надання послуг та користувачів,
                            роблячи процес запису простим та зрозумілим.
                        </p>

                        <div className="home-page__about-list">
                            {aboutItems.map((item) => (
                                <div
                                    className="home-page__about-item"
                                    key={item}
                                >
                                    <img
                                        src={images.benefits}
                                        alt="Перевага"
                                        className="home-page__about-icon"
                                    />

                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default HomePage
