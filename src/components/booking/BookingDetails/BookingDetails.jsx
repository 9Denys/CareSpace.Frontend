import { images } from '../../../assets/images'

function BookingDetails({
    serviceTitle,
    selectedCentre,
    selectedDate,
    selectedTime,
    selectedScheduleId,
    isSubmitting,
    onSubmit,
}) {
    return (
        <aside className="booking-page__details">
            <h2 className="booking-page__details-title">
                Деталі запису
            </h2>

            <div className="booking-page__details-item">
                <span className="booking-page__details-label">
                    Послуга
                </span>

                <strong>
                    {serviceTitle}
                </strong>
            </div>

            <div className="booking-page__details-item">
                <span className="booking-page__details-label">
                    Центр
                </span>

                <div className="booking-page__details-row">
                    <img
                        src={images.point}
                        alt="Локація"
                        className="booking-page__small-icon"
                    />

                    <strong>
                        {selectedCentre?.address || 'Не вибрано'}
                    </strong>
                </div>
            </div>

            <div className="booking-page__details-item">
                <span className="booking-page__details-label">
                    Дата
                </span>

                <div className="booking-page__details-row">
                    <img
                        src={images.bookings}
                        alt="Дата"
                        className="booking-page__small-icon"
                    />

                    <strong>
                        {selectedDate || 'Не вибрано'}
                    </strong>
                </div>
            </div>

            <div className="booking-page__details-item">
                <span className="booking-page__details-label">
                    Час
                </span>

                <div className="booking-page__details-row">
                    <img
                        src={images.schedules}
                        alt="Час"
                        className="booking-page__small-icon"
                    />

                    <strong>
                        {selectedTime || 'Не вибрано'}
                    </strong>
                </div>
            </div>

            <button
                className="booking-page__submit"
                onClick={onSubmit}
                disabled={isSubmitting || !selectedScheduleId}
            >
                {isSubmitting ? 'Створення...' : 'Створити запис'}
            </button>
        </aside>
    )
}

export default BookingDetails
