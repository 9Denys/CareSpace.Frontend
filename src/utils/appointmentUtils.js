export function getStatusText(status) {
    if (status === 0) return 'Заброньовано'
    if (status === 1) return 'Скасовано'
    if (status === 2) return 'Завершено'

    return 'Невідомо'
}

export function formatTime(startTime, endTime) {
    if (!startTime || !endTime) {
        return 'Час не вказано'
    }

    return `${startTime.slice(0, 5)}–${endTime.slice(0, 5)}`
}
