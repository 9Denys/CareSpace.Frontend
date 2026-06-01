import { useEffect, useState } from 'react'

import { servicesApi } from '../api/servicesApi'

export function useServiceDetails(id) {
    const [service, setService] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await servicesApi.getById(id)
                setService(data)
            } catch (error) {
                setError('Не вдалося завантажити інформацію про послугу')
            } finally {
                setIsLoading(false)
            }
        }

        fetchService()
    }, [id])

    return {
        service,
        isLoading,
        error
    }
}
