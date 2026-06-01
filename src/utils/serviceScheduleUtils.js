export const initialServiceScheduleFormData = {
    serviceId: '',
    centreId: '',
    slotId: '',
}

export function getSlotLabel(slot) {
    return `${slot.date} · ${slot.startTime}–${slot.endTime}`
}

export function getAvailableTimeSlots(timeSlots) {
    return timeSlots.filter((slot) => slot.isAvailable)
}

export function getScheduleTitle(schedule) {
    return schedule.serviceTitle || schedule.service?.title
}

export function getScheduleCentre(schedule) {
    return schedule.centreAddress || schedule.centre?.address
}

export function getScheduleDate(schedule) {
    return schedule.date || schedule.slot?.date
}

export function getScheduleStartTime(schedule) {
    return schedule.startTime || schedule.slot?.startTime
}

export function getScheduleEndTime(schedule) {
    return schedule.endTime || schedule.slot?.endTime
}
