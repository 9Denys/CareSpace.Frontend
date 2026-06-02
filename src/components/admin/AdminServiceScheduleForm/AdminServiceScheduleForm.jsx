import {
    getAvailableTimeSlots,
    getSlotLabel,
} from '../../../utils/serviceScheduleUtils'

function AdminServiceScheduleForm({
    services,
    centres,
    timeSlots,
    schedules,
    formData,
    isFormValid,
    onChange,
    onSubmit,
}) {
    const availableTimeSlots = getAvailableTimeSlots(
        timeSlots,
        schedules,
        formData.centreId
    )

    return (
        <form
            className="admin-service-schedules-page__form-card"
            onSubmit={onSubmit}
        >
            <h2 className="admin-service-schedules-page__card-title">
                Створити розклад
            </h2>

            <div className="admin-service-schedules-page__field">
                <label className="admin-service-schedules-page__label">
                    Вибір послуги
                </label>

                <select
                    className="admin-service-schedules-page__select"
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={onChange}
                >
                    <option value="">Оберіть послугу</option>

                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="admin-service-schedules-page__field">
                <label className="admin-service-schedules-page__label">
                    Вибір центру
                </label>

                <select
                    className="admin-service-schedules-page__select"
                    name="centreId"
                    value={formData.centreId}
                    onChange={onChange}
                >
                    <option value="">Оберіть центр</option>

                    {centres.map((centre) => (
                        <option key={centre.id} value={centre.id}>
                            {centre.address}
                        </option>
                    ))}
                </select>
            </div>

            <div className="admin-service-schedules-page__field">
                <label className="admin-service-schedules-page__label">
                    Вибір часового слоту
                </label>

                <select
                    className="admin-service-schedules-page__select"
                    name="slotId"
                    value={formData.slotId}
                    onChange={onChange}
                    disabled={!formData.centreId}
                >
                    <option value="">
                        {formData.centreId
                            ? 'Оберіть часовий слот'
                            : 'Спочатку оберіть центр'}
                    </option>

                    {availableTimeSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                            {getSlotLabel(slot)}
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="admin-service-schedules-page__submit"
                type="submit"
                disabled={!isFormValid}
            >
                Створити розклад
            </button>
        </form>
    )
}

export default AdminServiceScheduleForm