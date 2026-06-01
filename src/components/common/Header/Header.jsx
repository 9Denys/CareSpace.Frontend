import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../../context/AuthContext'
import { userApi } from '../../../api/userApi'

import './Header.css'

function Header() {
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useAuth()

    const [profile, setProfile] = useState(null)

    const isAdmin = user?.role === 1

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated) {
                setProfile(null)
                return
            }

            try {
                const data = await userApi.getMyProfile()
                setProfile(data)
            } catch (error) {
                setProfile(null)
            }
        }

        fetchProfile()
    }, [isAuthenticated])

    const userName =
        profile?.firstName && profile?.lastName
            ? `${profile.firstName} ${profile.lastName}`
            : 'Профіль'

    const handleLogout = () => {
        logout()
        setProfile(null)
        navigate('/')
    }

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    CareSpace
                </Link>

                <nav className="header__nav">
                    <Link to="/" className="header__link">
                        Головна
                    </Link>

                    <Link to="/services" className="header__link">
                        Послуги
                    </Link>
                </nav>

                <div className="header__actions">
                    {!isAuthenticated && (
                        <>
                            <Link to="/login" className="header__login">
                                Увійти
                            </Link>

                            <Link to="/register" className="header__register">
                                Реєстрація
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <Link
                                to={isAdmin ? '/admin/appointments' : '/profile'}
                                className="header__register"
                            >
                                {isAdmin ? 'Адмін-панель' : userName}
                            </Link>

                            <button
                                type="button"
                                className="header__logout"
                                onClick={handleLogout}
                            >
                                Вийти
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
