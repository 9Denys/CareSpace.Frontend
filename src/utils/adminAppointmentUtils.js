export function getAppointmentStatusText(status) {
    if (status === 0) return 'Заброньовано'
    if (status === 1) return 'Скасовано'
    if (status === 2) return 'Завершено'

    return 'Невідомо'
}

export function formatAppointmentTime(startTime, endTime) {
    if (!startTime || !endTime) {
        return '—'
    }

    return `${startTime.slice(0, 5)}–${endTime.slice(0, 5)}`
}

export function filterAdminAppointments(appointments, searchQuery) {
    const query = searchQuery.toLowerCase()

    return appointments.filter((appointment) => {
        return (
            appointment.userFullName?.toLowerCase().includes(query) ||
            appointment.serviceTitle?.toLowerCase().includes(query) ||
            appointment.centreAddress?.toLowerCase().includes(query)
        )
    })
}
