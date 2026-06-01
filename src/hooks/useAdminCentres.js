import { useEffect, useState } from 'react'

import { centresApi } from '../api/centresApi'
import {
    initialCentreFormData,
    normalizeTime
} from '../utils/centreUtils'

export function useAdminCentres() {
    const [centres, setCentres] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCentre, setEditingCentre] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState(initialCentreFormData)

    useEffect(() => {
        fetchCentres()
    }, [])

    const fetchCentres = async () => {
        try {
            const data = await centresApi.getAll()
            setCentres(data)
        } catch (error) {
            setError('Не вдалося завантажити центри')
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid =
        formData.address.trim() &&
        formData.openTime.trim() &&
        formData.closeTime.trim()

    const openCreateModal = () => {
        setEditingCentre(null)
        setFormData(initialCentreFormData)
        setIsModalOpen(true)
    }

    const openEditModal = (centre) => {
        setEditingCentre(centre)

        setFormData({
            address: centre.address,
            openTime: centre.openTime?.slice(0, 5) || '',
            closeTime: centre.closeTime?.slice(0, 5) || '',
        })

        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingCentre(null)
        setFormData(initialCentreFormData)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!isFormValid) return

        setError('')

        const payload = {
            address: formData.address,
            openTime: normalizeTime(formData.openTime),
            closeTime: normalizeTime(formData.closeTime),
        }

        try {
            if (editingCentre) {
                const updatedCentre = await centresApi.update(
                    editingCentre.id,
                    payload
                )

                setCentres((prev) =>
                    prev.map((centre) =>
                        centre.id === editingCentre.id
                            ? updatedCentre
                            : centre
                    )
                )
            } else {
                const newCentre = await centresApi.create(payload)

                setCentres((prev) => [newCentre, ...prev])
            }

            closeModal()
        } catch (error) {
            setError('Не вдалося зберегти центр')
        }
    }

    const handleDelete = async (centreId) => {
        setError('')

        try {
            await centresApi.delete(centreId)

            setCentres((prev) =>
                prev.filter((centre) => centre.id !== centreId)
            )
        } catch (error) {
            setError('Не вдалося видалити центр')
        }
    }

    return {
        centres,
        isModalOpen,
        editingCentre,
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
