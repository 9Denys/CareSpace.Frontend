import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'
import ProfileUserCard from '../../components/cards/ProfileUserCard/ProfileUserCard'
import AppointmentCard from '../../components/cards/AppointmentCard/AppointmentCard'
import EditProfileModal from '../../components/modals/EditProfileModal/EditProfileModal'
import DeleteAccountModal from '../../components/modals/DeleteAccountModal/DeleteAccountModal'

import { userApi } from '../../api/userApi'
import { appointmentsApi } from '../../api/appointmentsApi'
import { useAuth } from '../../context/AuthContext'
import { useProfile } from '../../hooks/useProfile'

import './ProfilePage.css'

function ProfilePage() {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const {
        userData,
        setUserData,
        appointments,
        setAppointments,
        isLoading,
        error,
        setError,
    } = useProfile()

    const activeAppointments = appointments.filter(
        (appointment) => appointment.status === 0
    )

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSaveProfile = async (event) => {
        event.preventDefault()
        setError('')

        try {
            const updatedProfile = await userApi.updateMyProfile({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
            })

            if (userData.currentPassword.trim() && userData.password.trim()) {
                await userApi.updateMyPassword({
                    currentPassword: userData.currentPassword,
                    newPassword: userData.password,
                })
            }

            setUserData((prev) => ({
                ...prev,
                firstName: updatedProfile.firstName || prev.firstName,
                lastName: updatedProfile.lastName || prev.lastName,
                email: updatedProfile.email || prev.email,
                phoneNumber: updatedProfile.phoneNumber || prev.phoneNumber,
                currentPassword: '',
                password: '',
            }))

            setIsEditModalOpen(false)
        } catch (error) {
            setError('Не вдалося оновити профіль')
        }
    }

    const handleCancelAppointment = async (id) => {
        setError('')

        try {
            await appointmentsApi.cancel(id)

            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === id
                        ? {
                              ...appointment,
                              status: 1,
                              cancelledAt: new Date().toISOString(),
                          }
                        : appointment
                )
            )
        } catch (error) {
            setError('Не вдалося скасувати запис')
        }
    }

    const handleDeleteAccount = async () => {
        setError('')

        try {
            await userApi.deleteMyProfile()

            logout()
            navigate('/')
        } catch (error) {
            setError('Не вдалося видалити обліковий запис')
            setIsDeleteModalOpen(false)
        }
    }

    return (
        <div className="profile-page">
            <Header />

            <main className="profile-page__main">
                <h1 className="profile-page__title">
                    Особистий кабінет
                </h1>

                {isLoading && (
                    <div className="profile-page__empty">
                        Завантаження профілю...
                    </div>
                )}

                {error && (
                    <div className="profile-page__empty profile-page__empty--error">
                        {error}
                    </div>
                )}

                {!isLoading && (
                    <>
                        <ProfileUserCard
                            userData={userData}
                            onEdit={() => setIsEditModalOpen(true)}
                            onDelete={() => setIsDeleteModalOpen(true)}
                        />

                        <section className="profile-page__appointments">
                            <h2 className="profile-page__section-title">
                                Активні записи
                            </h2>

                            <div className="profile-page__appointments-list">
                                {activeAppointments.map((appointment) => (
                                    <AppointmentCard
                                        key={appointment.id}
                                        appointment={appointment}
                                        onCancel={handleCancelAppointment}
                                    />
                                ))}

                                {activeAppointments.length === 0 && (
                                    <div className="profile-page__empty">
                                        У вас поки немає активних записів.
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>

            {isEditModalOpen && (
                <EditProfileModal
                    userData={userData}
                    onChange={handleInputChange}
                    onSubmit={handleSaveProfile}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteAccountModal
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDeleteAccount}
                />
            )}

            <Footer />
        </div>
    )
}

export default ProfilePage
