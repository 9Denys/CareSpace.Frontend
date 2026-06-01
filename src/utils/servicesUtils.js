export const ALL_SERVICES_CATEGORY = 'Всі послуги'

export function getServiceCategories(services) {
    const serviceCategories = services.map((service) => service.categoryName)

    return [ALL_SERVICES_CATEGORY, ...new Set(serviceCategories)]
}

export function filterServices(services, activeCategory, searchQuery) {
    return services.filter((service) => {
        const title = service.title?.toLowerCase() || ''
        const description = service.description?.toLowerCase() || ''
        const query = searchQuery.toLowerCase()

        const matchesCategory =
            activeCategory === ALL_SERVICES_CATEGORY ||
            service.categoryName === activeCategory

        const matchesSearch =
            title.includes(query) ||
            description.includes(query)

        return matchesCategory && matchesSearch
    })
}
