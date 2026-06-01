export const initialCentreFormData = {
    address: '',
    openTime: '',
    closeTime: '',
}

export function normalizeTime(time) {
    if (!time) {
        return ''
    }

    return time.length === 5 ? `${time}:00` : time
}

export function filterCentres(centres, searchValue) {
    return centres.filter((centre) =>
        centre.address
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    )
}
