export const initialServiceFormData = {
    title: '',
    description: '',
    categoryId: '',
    durationMinutes: '',
    isActive: true,
}

export function filterAdminServices(services, searchValue) {
    return services.filter((service) =>
        service.title
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    )
}
