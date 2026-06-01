import axiosClient from './axiosClient'

export const centresApi = {
    getAll: async () => {
        const response = await axiosClient.get('/ServiceCentre/GetAll')
        return response.data
    },

    create: async (data) => {
        const response = await axiosClient.post('/ServiceCentre/Create', data)
        return response.data
    },

    update: async (id, data) => {
        const response = await axiosClient.put(`/ServiceCentre/Update/${id}`, data)
        return response.data
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`/ServiceCentre/Delete/${id}`)
        return response.data
    },
}
