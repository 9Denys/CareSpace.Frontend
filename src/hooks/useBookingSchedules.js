import { useEffect, useState } from 'react'

import { serviceSchedulesApi } from '../api/serviceSchedulesApi'

export function useBookingSchedules(serviceId) {
    const [schedules, setSchedules] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await serviceSchedulesApi.getAll()

                const serviceSchedules = data.filter(
                    (schedule) => schedule.serviceId === serviceId
                )

                setSchedules(serviceSchedules)
            } catch (error) {
                setError('Не вдалося завантажити розклад')
            } finally {
                setIsLoading(false)
            }
        }

        fetchSchedules()
    }, [serviceId])

    return {
        schedules,
        isLoading,
        error,
        setError,
    }
}
