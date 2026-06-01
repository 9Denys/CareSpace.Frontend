export const initialTimeSlotFormData = {
    date: '',
    startTime: '',
    endTime: '',
    isAvailable: true,
}

export function normalizeTime(time) {
    if (!time) {
        return ''
    }

    return time.length === 5 ? `${time}:00` : time
}

export function filterTimeSlots(slots, searchValue) {
    return slots.filter((slot) =>
        slot.date
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    )
}
