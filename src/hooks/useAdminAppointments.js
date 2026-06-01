import { useEffect, useState } from 'react'

import { appointmentsApi } from '../api/appointmentsApi'

export function useAdminAppointments() {
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await appointmentsApi.getAll()
                setAppointments(data)
            } catch (error) {
                setError('Не вдалося завантажити записи')
            } finally {
                setIsLoading(false)
            }
        }

        fetchAppointments()
    }, [])

    return {
        appointments,
        isLoading,
        error,
    }
}
