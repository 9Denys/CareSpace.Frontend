import axiosClient from './axiosClient'

export const authApi = {
    login: async (data) => {
        const response = await axiosClient.post('/Auth/Login', data)
        return response.data
    },

    register: async (data) => {
        const response = await axiosClient.post('/Auth/Register', data)
        return response.data
    },

    refresh: async (data) => {
        const response = await axiosClient.post('/Auth/Refresh', data)
        return response.data
    },
}
