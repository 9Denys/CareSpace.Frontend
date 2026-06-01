import axios from 'axios'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve(token)
        }
    })

    failedQueue = []
}

const clearAuthData = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
}

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status !== 401 ||
            originalRequest._retry
        ) {
            return Promise.reject(error)
        }

        originalRequest._retry = true

        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        if (!accessToken || !refreshToken) {
            clearAuthData()
            window.location.href = '/login'
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject })
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return axiosClient(originalRequest)
                })
                .catch((queueError) => Promise.reject(queueError))
        }

        isRefreshing = true

        try {
            const response = await refreshClient.post('/Auth/RefreshToken', {
                accessToken,
                refreshToken,
            })

            const newAccessToken =
                response.data.accessToken || response.data.token

            const newRefreshToken = response.data.refreshToken

            if (!newAccessToken || !newRefreshToken) {
                throw new Error('Refresh token response is invalid')
            }

            localStorage.setItem('accessToken', newAccessToken)
            localStorage.setItem('refreshToken', newRefreshToken)

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

            processQueue(null, newAccessToken)

            return axiosClient(originalRequest)
        } catch (refreshError) {
            processQueue(refreshError, null)
            clearAuthData()
            window.location.href = '/login'

            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    }
)

export default axiosClient
