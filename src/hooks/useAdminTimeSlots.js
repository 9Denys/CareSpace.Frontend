import { useEffect, useState } from 'react'

import { timeSlotsApi } from '../api/timeSlotsApi'
import {
    initialTimeSlotFormData,
    normalizeTime
} from '../utils/timeSlotUtils'

export function useAdminTimeSlots() {
    const [slots, setSlots] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSlot, setEditingSlot] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState(initialTimeSlotFormData)

    useEffect(() => {
        fetchSlots()
    }, [])

    const fetchSlots = async () => {
        try {
            const data = await timeSlotsApi.getAll()
            setSlots(data)
        } catch (error) {
            setError('Не вдалося завантажити часові слоти')
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid =
        formData.date.trim() &&
        formData.startTime.trim() &&
        formData.endTime.trim()

    const openCreateModal = () => {
        setEditingSlot(null)
        setFormData(initialTimeSlotFormData)
        setIsModalOpen(true)
    }

    const openEditModal = (slot) => {
        setEditingSlot(slot)

        setFormData({
            date: slot.date,
            startTime: slot.startTime?.slice(0, 5) || '',
            endTime: slot.endTime?.slice(0, 5) || '',
            isAvailable: slot.isAvailable,
        })

        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingSlot(null)
        setFormData(initialTimeSlotFormData)
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!isFormValid) return

        setError('')

        const payload = {
            date: formData.date,
            startTime: normalizeTime(formData.startTime),
            endTime: normalizeTime(formData.endTime),
            isAvailable: formData.isAvailable,
        }

        try {
            if (editingSlot) {
                const updatedSlot = await timeSlotsApi.update(
                    editingSlot.id,
                    payload
                )

                setSlots((prev) =>
                    prev.map((slot) =>
                        slot.id === editingSlot.id
                            ? updatedSlot
                            : slot
                    )
                )
            } else {
                const newSlot = await timeSlotsApi.create(payload)

                setSlots((prev) => [newSlot, ...prev])
            }

            closeModal()
        } catch (error) {
            setError('Не вдалося зберегти часовий слот')
        }
    }

    const handleDelete = async (slotId) => {
        setError('')

        try {
            await timeSlotsApi.delete(slotId)

            setSlots((prev) =>
                prev.filter((slot) => slot.id !== slotId)
            )
        } catch (error) {
            setError('Не вдалося видалити часовий слот')
        }
    }

    return {
        slots,
        isModalOpen,
        editingSlot,
        isLoading,
        error,
        formData,
        isFormValid,
        openCreateModal,
        openEditModal,
        closeModal,
        handleChange,
        handleSubmit,
        handleDelete,
    }
}
