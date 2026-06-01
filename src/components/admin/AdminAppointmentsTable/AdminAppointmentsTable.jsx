import {
    formatAppointmentTime,
    getAppointmentStatusText
} from '../../../utils/adminAppointmentUtils'

function AdminAppointmentsTable({ appointments }) {
    return (
        <div className="admin-appointments-page__table-wrapper">
            <table className="admin-appointments-page__table">
                <thead>
                    <tr>
                        <th>Користувач</th>
                        <th>Послуга</th>
                        <th>Центр</th>
                        <th>Дата</th>
                        <th>Час</th>
                        <th>Статус</th>
                    </tr>
                </thead>

                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.userFullName}</td>
                            <td>{appointment.serviceTitle}</td>
                            <td>{appointment.centreAddress}</td>
                            <td>{appointment.date}</td>
                            <td>
                                {formatAppointmentTime(
                                    appointment.startTime,
                                    appointment.endTime
                                )}
                            </td>
                            <td>
                                <span className="admin-appointments-page__status">
                                    {getAppointmentStatusText(appointment.status)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminAppointmentsTable
