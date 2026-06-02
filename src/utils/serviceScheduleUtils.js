export const initialServiceScheduleFormData = {
    serviceId: '',
    centreId: '',
    slotId: '',
}

export function getSlotLabel(slot) {
    return `${slot.date} · ${slot.startTime}–${slot.endTime}`
}

export function getAvailableTimeSlots(
    timeSlots,
    schedules,
    selectedCentreId
) {
    if (!selectedCentreId) {
        return []
    }

    return timeSlots.filter((slot) => {
        const isSlotUsedInSelectedCentre = schedules.some((schedule) => {
            const scheduleCentreId =
                schedule.centreId || schedule.centre?.id

            const scheduleSlotId =
                schedule.slotId || schedule.slot?.id

            return (
                scheduleCentreId === selectedCentreId &&
                scheduleSlotId === slot.id
            )
        })

        return !isSlotUsedInSelectedCentre
    })
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