import { useEffect, useState } from 'react'

import { servicesApi } from '../api/servicesApi'
import { centresApi } from '../api/centresApi'
import { timeSlotsApi } from '../api/timeSlotsApi'
import { serviceSchedulesApi } from '../api/serviceSchedulesApi'

import { initialServiceScheduleFormData } from '../utils/serviceScheduleUtils'

export function useAdminServiceSchedules() {
    const [services, setServices] = useState([])
    const [centres, setCentres] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [schedules, setSchedules] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState(initialServiceScheduleFormData)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [
                servicesData,
                centresData,
                timeSlotsData,
                schedulesData,
            ] = await Promise.all([
                servicesApi.getAll(),
                centresApi.getAll(),
                timeSlotsApi.getAll(),
                serviceSchedulesApi.getAll(),
            ])

            setServices(servicesData)
            setCentres(centresData)
            setTimeSlots(timeSlotsData)
            setSchedules(schedulesData)
        } catch (error) {
            setError('Не вдалося завантажити дані розкладу')
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid =
        formData.serviceId &&
        formData.centreId &&
        formData.slotId

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === 'centreId' ? { slotId: '' } : {}),
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!isFormValid) return

        setError('')

        try {
            const newSchedule = await serviceSchedulesApi.create({
                serviceId: formData.serviceId,
                centreId: formData.centreId,
                slotId: formData.slotId,
            })

            setSchedules((prev) => [newSchedule, ...prev])
            setFormData(initialServiceScheduleFormData)
        } catch (error) {
            setError('Не вдалося створити розклад')
        }
    }

    const handleDelete = async (scheduleId) => {
        setError('')

        try {
            await serviceSchedulesApi.delete(scheduleId)

            setSchedules((prev) =>
                prev.filter((schedule) => schedule.id !== scheduleId)
            )
        } catch (error) {
            setError('Не вдалося видалити розклад')
        }
    }

    return {
        services,
        centres,
        timeSlots,
        schedules,
        isLoading,
        error,
        formData,
        isFormValid,
        handleChange,
        handleSubmit,
        handleDelete,
    }
}