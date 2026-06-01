import axiosClient from './axiosClient'

export const serviceSchedulesApi = {
    getAll: async () => {
        const response = await axiosClient.get('/ServiceSchedule/GetAll')
        return response.data
    },

    create: async (data) => {
        const response = await axiosClient.post('/ServiceSchedule/Create', data)
        return response.data
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`/ServiceSchedule/Delete/${id}`)
        return response.data
    },
}
