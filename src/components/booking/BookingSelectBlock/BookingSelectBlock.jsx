function BookingSelectBlock({
    centres,
    selectedCentreId,
    onCentreChange,
}) {
    return (
        <section className="booking-page__block">
            <h2 className="booking-page__block-title">
                Виберіть центр
            </h2>

            <label className="booking-page__label">
                Центр надання послуг
            </label>

            <select
                className="booking-page__select"
                value={selectedCentreId}
                onChange={onCentreChange}
            >
                <option value="">
                    Оберіть центр
                </option>

                {centres.map((centre) => (
                    <option
                        key={centre.id}
                        value={centre.id}
                    >
                        {centre.address}
                    </option>
                ))}
            </select>
        </section>
    )
}

export default BookingSelectBlock
