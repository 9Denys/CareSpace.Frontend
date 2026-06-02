import { useEffect, useState } from 'react'

import { serviceSchedulesApi } from '../api/serviceSchedulesApi'

export function useBookingSchedules(serviceId) {
    const [schedules, setSchedules] = useState([])
    const [availableSchedules, setAvailableSchedules] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAvailableLoading, setIsAvailableLoading] = useState(false)
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

    const fetchAvailableSchedules = async (centreId, date) => {
        if (!serviceId || !centreId || !date) {
            setAvailableSchedules([])
            return
        }

        setIsAvailableLoading(true)
        setError('')

        try {
            const data = await serviceSchedulesApi.getAvailable(
                serviceId,
                centreId,
                date
            )

            setAvailableSchedules(data)
        } catch (error) {
            setError('Не вдалося завантажити доступні слоти')
            setAvailableSchedules([])
        } finally {
            setIsAvailableLoading(false)
        }
    }

    return {
        schedules,
        availableSchedules,
        isLoading,
        isAvailableLoading,
        error,
        setError,
        fetchAvailableSchedules,
    }
}