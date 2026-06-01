import axiosClient from './axiosClient'

export const userApi = {
    getMyProfile: async () => {
        const response = await axiosClient.get('/User/GetMyProfile')
        return response.data
    },

    updateMyProfile: async (data) => {
        const response = await axiosClient.patch('/User/UpdateMyProfile', data)
        return response.data
    },

    updateMyPassword: async (data) => {
        const response = await axiosClient.patch('/User/UpdateMyPassword', data)
        return response.data
    },

    deleteMyProfile: async () => {
        const response = await axiosClient.delete('/User/DeleteMyProfile')
        return response.data
    },
}
