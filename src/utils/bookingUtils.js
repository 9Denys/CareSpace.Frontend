export function getScheduleDate(schedule) {
    return schedule.date || schedule.slot?.date
}

export function getScheduleStartTime(schedule) {
    return schedule.startTime || schedule.slot?.startTime
}

export function getServiceTitle(schedules, selectedSchedule) {
    return (
        selectedSchedule?.serviceTitle ||
        schedules[0]?.serviceTitle ||
        selectedSchedule?.service?.title ||
        schedules[0]?.service?.title ||
        'Послугу не вибрано'
    )
}

export function getUniqueCentres(schedules) {
    const uniqueCentres = []

    schedules.forEach((schedule) => {
        const centre = {
            id: schedule.centreId,
            address: schedule.centreAddress || schedule.centre?.address,
        }

        const exists = uniqueCentres.some((item) => item.id === centre.id)

        if (!exists) {
            uniqueCentres.push(centre)
        }
    })

    return uniqueCentres
}

export function getAvailableDates(schedules, selectedCentreId) {
    if (!selectedCentreId) {
        return []
    }

    const dates = schedules
        .filter((schedule) => schedule.centreId === selectedCentreId)
        .map((schedule) => getScheduleDate(schedule))

    return [...new Set(dates)]
}

export function getAvailableSchedules(
    schedules,
    selectedCentreId,
    selectedDate
) {
    return schedules.filter((schedule) => {
        const scheduleDate = getScheduleDate(schedule)

        return (
            schedule.centreId === selectedCentreId &&
            scheduleDate === selectedDate
        )
    })
}
