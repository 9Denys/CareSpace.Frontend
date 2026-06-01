function BookingDateBlock({
    availableDates,
    selectedDate,
    onDateChange,
}) {
    return (
        <section className="booking-page__block">
            <h2 className="booking-page__block-title">
                Виберіть дату
            </h2>

            <div className="booking-page__slots">
                {availableDates.length > 0 ? (
                    availableDates.map((date) => (
                        <button
                            key={date}
                            type="button"
                            className={`booking-page__slot ${
                                selectedDate === date
                                    ? 'booking-page__slot--active'
                                    : ''
                            }`}
                            onClick={() => onDateChange(date)}
                        >
                            {date}
                        </button>
                    ))
                ) : (
                    <p className="booking-page__empty">
                        Спочатку оберіть центр
                    </p>
                )}
            </div>
        </section>
    )
}

export default BookingDateBlock
