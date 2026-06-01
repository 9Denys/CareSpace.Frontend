import { images } from '../../../assets/images'

import {
    formatTime,
    getStatusText
} from '../../../utils/appointmentUtils'

function AppointmentCard({
    appointment,
    onCancel,
}) {
    return (
        <article
            className="profile-page__appointment-card"
            key={appointment.id}
        >
            <div className="profile-page__appointment-info">
                <div className="profile-page__appointment-header">
                    <h3 className="profile-page__appointment-title">
                        {appointment.serviceTitle}
                    </h3>

                    <span className="profile-page__status">
                        {getStatusText(appointment.status)}
                    </span>
                </div>

                <div className="profile-page__appointment-details">
                    <div className="profile-page__detail-row">
                        <img
                            src={images.point}
                            alt="Локація"
                            className="profile-page__detail-icon"
                        />

                        <span>
                            {appointment.centreAddress}
                        </span>
                    </div>

                    <div className="profile-page__detail-row">
                        <img
                            src={images.bookings}
                            alt="Дата"
                            className="profile-page__detail-icon"
                        />

                        <span>
                            {appointment.date}
                        </span>
                    </div>

                    <div className="profile-page__detail-row">
                        <img
                            src={images.schedules}
                            alt="Час"
                            className="profile-page__detail-icon"
                        />

                        <span>
                            {formatTime(
                                appointment.startTime,
                                appointment.endTime
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="profile-page__cancel-button"
                onClick={() => onCancel(appointment.id)}
            >
                Скасувати запис
            </button>
        </article>
    )
}

export default AppointmentCard
