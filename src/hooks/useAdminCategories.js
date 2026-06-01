import { useEffect, useState } from 'react'

import { categoriesApi } from '../api/categoriesApi'
import { initialCategoryFormData } from '../utils/categoryUtils'

export function useAdminCategories() {
    const [categories, setCategories] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState(initialCategoryFormData)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const data = await categoriesApi.getAll()
            setCategories(data)
        } catch (error) {
            setError('Не вдалося завантажити категорії')
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid =
        formData.name.trim() &&
        formData.description.trim()

    const openCreateModal = () => {
        setEditingCategory(null)
        setFormData(initialCategoryFormData)
        setIsModalOpen(true)
    }

    const openEditModal = (category) => {
        setEditingCategory(category)

        setFormData({
            name: category.name,
            description: category.description,
        })

        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingCategory(null)
        setFormData(initialCategoryFormData)
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

        try {
            if (editingCategory) {
                const updatedCategory = await categoriesApi.update(
                    editingCategory.id,
                    {
                        name: formData.name,
                        description: formData.description,
                    }
                )

                setCategories((prev) =>
                    prev.map((category) =>
                        category.id === editingCategory.id
                            ? updatedCategory
                            : category
                    )
                )
            } else {
                const newCategory = await categoriesApi.create({
                    name: formData.name,
                    description: formData.description,
                })

                setCategories((prev) => [newCategory, ...prev])
            }

            closeModal()
        } catch (error) {
            setError('Не вдалося зберегти категорію')
        }
    }

    const handleDelete = async (categoryId) => {
        setError('')

        try {
            await categoriesApi.delete(categoryId)

            setCategories((prev) =>
                prev.filter((category) => category.id !== categoryId)
            )
        } catch (error) {
            setError('Не вдалося видалити категорію')
        }
    }

    return {
        categories,
        isModalOpen,
        editingCategory,
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
