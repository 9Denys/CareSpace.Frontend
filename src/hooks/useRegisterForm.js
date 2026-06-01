import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export function useRegisterForm() {
    const navigate = useNavigate()
    const { register, login } = useAuth()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
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
            await register({
                user: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    role: 0,
                    passwordHash: formData.password,
                },
            })

            await login({
                email: formData.email,
                password: formData.password,
            })

            navigate('/profile')
        } catch (error) {
            setError('Не вдалося створити акаунт')
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
