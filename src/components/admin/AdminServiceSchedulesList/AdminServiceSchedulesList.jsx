import {
    getScheduleCentre,
    getScheduleDate,
    getScheduleEndTime,
    getScheduleStartTime,
    getScheduleTitle
} from '../../../utils/serviceScheduleUtils'

function AdminServiceSchedulesList({
    schedules,
    onDelete,
}) {
    return (
        <div className="admin-service-schedules-page__list-card">
            <h2 className="admin-service-schedules-page__card-title">
                Створені розклади
            </h2>

            {schedules.length === 0 ? (
                <div className="admin-service-schedules-page__empty">
                    Поки що немає створених розкладів
                </div>
            ) : (
                <div className="admin-service-schedules-page__list">
                    {schedules.map((schedule) => (
                        <div
                            className="admin-service-schedules-page__schedule"
                            key={schedule.id}
                        >
                            <div>
                                <h3 className="admin-service-schedules-page__schedule-title">
                                    {getScheduleTitle(schedule)}
                                </h3>

                                <p className="admin-service-schedules-page__schedule-text">
                                    {getScheduleCentre(schedule)}
                                </p>

                                <p className="admin-service-schedules-page__schedule-time">
                                    {getScheduleDate(schedule)} ·{' '}
                                    {getScheduleStartTime(schedule)}–
                                    {getScheduleEndTime(schedule)}
                                </p>
                            </div>

                            <button
                                className="admin-service-schedules-page__delete"
                                type="button"
                                onClick={() => onDelete(schedule.id)}
                            >
                                Видалити
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminServiceSchedulesList
