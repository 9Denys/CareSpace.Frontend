import { useMemo, useState } from 'react'

import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'
import ServiceCard from '../../components/cards/ServiceCard/ServiceCard'

import { images } from '../../assets/images'
import { useServices } from '../../hooks/useServices'
import {
    ALL_SERVICES_CATEGORY,
    filterServices,
    getServiceCategories
} from '../../utils/servicesUtils'

import './ServicesPage.css'

function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState(ALL_SERVICES_CATEGORY)
    const [searchQuery, setSearchQuery] = useState('')

    const { services, isLoading, error } = useServices()

    const categories = useMemo(() => {
        return getServiceCategories(services)
    }, [services])

    const filteredServices = useMemo(() => {
        return filterServices(services, activeCategory, searchQuery)
    }, [services, activeCategory, searchQuery])

    return (
        <div className="services-page">
            <Header />

            <main className="services-page__main">
                <section className="services-page__header">
                    <h1 className="services-page__title">
                        Каталог послуг
                    </h1>

                    <p className="services-page__subtitle">
                        Оберіть потрібну послугу для запису
                    </p>

                    <div className="services-page__search">
                        <img
                            src={images.search}
                            alt="Пошук"
                            className="services-page__search-icon"
                        />

                        <input
                            type="text"
                            placeholder="Пошук послуг..."
                            className="services-page__search-input"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </div>

                    <div className="services-page__categories">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={
                                    activeCategory === category
                                        ? 'services-page__category services-page__category--active'
                                        : 'services-page__category'
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {isLoading && (
                    <p className="services-page__message">
                        Завантаження послуг...
                    </p>
                )}

                {error && (
                    <p className="services-page__message services-page__message--error">
                        {error}
                    </p>
                )}

                {!isLoading && !error && filteredServices.length === 0 && (
                    <p className="services-page__message">
                        Послуги не знайдено
                    </p>
                )}

                {!isLoading && !error && filteredServices.length > 0 && (
                    <section className="services-page__grid">
                        {filteredServices.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                            />
                        ))}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default ServicesPage
