import axiosClient from './axiosClient'

export const timeSlotsApi = {
    getAll: async () => {
        const response = await axiosClient.get('/TimeSlot/GetAll')
        return response.data
    },

    create: async (data) => {
        const response = await axiosClient.post('/TimeSlot/Create', data)
        return response.data
    },

    update: async (id, data) => {
        const response = await axiosClient.put(`/TimeSlot/Update/${id}`, data)
        return response.data
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`/TimeSlot/Delete/${id}`)
        return response.data
    },
}
