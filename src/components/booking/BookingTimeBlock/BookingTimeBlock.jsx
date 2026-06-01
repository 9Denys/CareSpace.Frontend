import { getScheduleStartTime } from '../../../utils/bookingUtils'

function BookingTimeBlock({
    availableSchedules,
    selectedScheduleId,
    onTimeChange,
}) {
    return (
        <section className="booking-page__block">
            <h2 className="booking-page__block-title">
                Виберіть час
            </h2>

            <div className="booking-page__slots">
                {availableSchedules.length > 0 ? (
                    availableSchedules.map((schedule) => (
                        <button
                            key={schedule.id}
                            type="button"
                            className={`booking-page__slot ${
                                selectedScheduleId === schedule.id
                                    ? 'booking-page__slot--active'
                                    : ''
                            }`}
                            onClick={() => onTimeChange(schedule)}
                        >
                            {getScheduleStartTime(schedule)}
                        </button>
                    ))
                ) : (
                    <p className="booking-page__empty">
                        Спочатку оберіть дату
                    </p>
                )}
            </div>
        </section>
    )
}

export default BookingTimeBlock
