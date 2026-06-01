import { useEffect, useState } from 'react'

import { servicesApi } from '../api/servicesApi'
import { categoriesApi } from '../api/categoriesApi'
import { initialServiceFormData } from '../utils/serviceAdminUtils'

export function useAdminServices() {
    const [services, setServices] = useState([])
    const [categories, setCategories] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingService, setEditingService] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState(initialServiceFormData)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [servicesData, categoriesData] = await Promise.all([
                servicesApi.getAll(),
                categoriesApi.getAll(),
            ])

            setServices(servicesData)
            setCategories(categoriesData)
        } catch (error) {
            setError('Не вдалося завантажити послуги')
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid =
        formData.title.trim() &&
        formData.description.trim() &&
        formData.categoryId &&
        Number(formData.durationMinutes) > 0

    const openCreateModal = () => {
        setEditingService(null)
        setFormData(initialServiceFormData)
        setIsModalOpen(true)
    }

    const openEditModal = (service) => {
        setEditingService(service)

        setFormData({
            title: service.title || '',
            description: service.description || '',
            categoryId: service.categoryId || '',
            durationMinutes: String(service.durationMinutes || ''),
            isActive: service.isActive,
        })

        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingService(null)
        setFormData(initialServiceFormData)
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
            categoryId: formData.categoryId,
            title: formData.title,
            description: formData.description,
            durationMinutes: Number(formData.durationMinutes),
            isActive: formData.isActive,
        }

        try {
            if (editingService) {
                const updatedService = await servicesApi.update(
                    editingService.id,
                    payload
                )

                setServices((prev) =>
                    prev.map((service) =>
                        service.id === editingService.id
                            ? updatedService
                            : service
                    )
                )
            } else {
                const newService = await servicesApi.create(payload)

                setServices((prev) => [newService, ...prev])
            }

            closeModal()
        } catch (error) {
            setError('Не вдалося зберегти послугу')
        }
    }

    const handleDelete = async (serviceId) => {
        setError('')

        try {
            await servicesApi.delete(serviceId)

            setServices((prev) =>
                prev.filter((service) => service.id !== serviceId)
            )
        } catch (error) {
            setError('Не вдалося видалити послугу')
        }
    }

    return {
        services,
        categories,
        isModalOpen,
        editingService,
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
