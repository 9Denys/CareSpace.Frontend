import { useEffect, useState } from 'react'

import { servicesApi } from '../api/servicesApi'

export function useServices() {
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await servicesApi.getAll()
                setServices(data)
            } catch (error) {
                setError('Не вдалося завантажити послуги')
            } finally {
                setIsLoading(false)
            }
        }

        fetchServices()
    }, [])

    return {
        services,
        isLoading,
        error
    }
}
