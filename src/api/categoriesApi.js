import axiosClient from './axiosClient'

export const categoriesApi = {
    getAll: async () => {
        const response = await axiosClient.get('/ServiceCategory/GetAll')
        return response.data
    },

    create: async (data) => {
        const response = await axiosClient.post('/ServiceCategory/Create', data)
        return response.data
    },

    update: async (id, data) => {
        const response = await axiosClient.put(`/ServiceCategory/Update/${id}`, data)
        return response.data
    },

    delete: async (id) => {
        const response = await axiosClient.delete(`/ServiceCategory/Delete/${id}`)
        return response.data
    },
}
