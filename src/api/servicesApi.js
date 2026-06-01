import axiosClient from './axiosClient'

export const servicesApi = {
    getAll: async () => {
        const response = await axiosClient.get('/Service/GetAll')
        return response.data
    },

    getById: async (id) => {
        const response = await axiosClient.get(`/Service/GetById/${id}`)
        return response.data
    },

    create: async (data) => {
        const response = await axiosClient.post('/Service/Create', data)
        return response.data
    },

    update: async (id, data) => {
        const response = await axiosClient.put(`/Service/Update/${id}`, data)
        return response.data
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`/Service/Delete/${id}`)
        return response.data
    },
}
