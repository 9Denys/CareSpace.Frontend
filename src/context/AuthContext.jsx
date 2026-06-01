import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedAccessToken = localStorage.getItem('accessToken')
        const savedRefreshToken = localStorage.getItem('refreshToken')
        const savedUser = localStorage.getItem('user')

        if (savedAccessToken) {
            setAccessToken(savedAccessToken)
        }

        if (savedRefreshToken) {
            setRefreshToken(savedRefreshToken)
        }

        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }

        setIsLoading(false)
    }, [])

    const saveAuthData = (data) => {
        const newAccessToken = data.accessToken || data.token
        const newRefreshToken = data.refreshToken
        const userData = data.user

        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken)
            setAccessToken(newAccessToken)
        }

        if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken)
            setRefreshToken(newRefreshToken)
        }

        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
        }
    }

    const login = async (loginData) => {
        const data = await authApi.login(loginData)

        saveAuthData(data)

        return data
    }

    const register = async (registerData) => {
        const data = await authApi.register(registerData)
        return data
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')

        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                refreshToken,
                isLoading,
                isAuthenticated: Boolean(accessToken),
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
