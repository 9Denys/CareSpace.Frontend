import axiosClient from './axiosClient'

export const appointmentsApi = {
    getAll: async () => {
        const response = await axiosClient.get('/Appointment/GetAll')
        return response.data
    },

    getMy: async () => {
        const response = await axiosClient.get('/Appointment/GetMy/my')
        return response.data
    },

    create: async (scheduleId) => {
        const response = await axiosClient.post('/Appointment/Create', {
            scheduleId,
        })

        return response.data
    },

    cancel: async (id) => {
        const response = await axiosClient.patch(`/Appointment/Cancel/${id}/cancel`)
        return response.data
    },
}
