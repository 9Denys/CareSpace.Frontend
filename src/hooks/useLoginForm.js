import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export function useLoginForm() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setIsLoading(true)

        try {
            const data = await login(formData)

            const role = data.user?.role

            if (role === 1) {
                navigate('/admin/appointments')
            } else {
                navigate('/profile')
            }
        } catch (error) {
            setError('Невірний email або пароль')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        formData,
        error,
        isLoading,
        handleChange,
        handleSubmit,
    }
}
