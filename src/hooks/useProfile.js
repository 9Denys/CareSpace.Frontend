import { useEffect, useState } from 'react'

import { userApi } from '../api/userApi'
import { appointmentsApi } from '../api/appointmentsApi'

export function useProfile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        password: '',
    })

    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const [profileData, appointmentsData] = await Promise.all([
                    userApi.getMyProfile(),
                    appointmentsApi.getMy(),
                ])

                setUserData({
                    firstName: profileData.firstName || '',
                    lastName: profileData.lastName || '',
                    email: profileData.email || '',
                    phoneNumber: profileData.phoneNumber || '',
                    currentPassword: '',
                    password: '',
                })

                setAppointments(appointmentsData)
            } catch (error) {
                setError('Не вдалося завантажити дані профілю')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfileData()
    }, [])

    return {
        userData,
        setUserData,
        appointments,
        setAppointments,
        isLoading,
        error,
        setError,
    }
}
