import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'
import BookingSelectBlock from '../../components/booking/BookingSelectBlock/BookingSelectBlock'
import BookingDateBlock from '../../components/booking/BookingDateBlock/BookingDateBlock'
import BookingTimeBlock from '../../components/booking/BookingTimeBlock/BookingTimeBlock'
import BookingDetails from '../../components/booking/BookingDetails/BookingDetails'

import { appointmentsApi } from '../../api/appointmentsApi'
import { useBookingSchedules } from '../../hooks/useBookingSchedules'
import {
    getAvailableDates,
    getAvailableSchedules,
    getScheduleStartTime,
    getServiceTitle,
    getUniqueCentres,
} from '../../utils/bookingUtils'

import './BookingPage.css'

function BookingPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [selectedScheduleId, setSelectedScheduleId] = useState('')
    const [selectedCentreId, setSelectedCentreId] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        schedules,
        isLoading,
        error,
        setError,
    } = useBookingSchedules(id)

    const centres = useMemo(() => {
        return getUniqueCentres(schedules)
    }, [schedules])

    const selectedCentre = centres.find(
        (centre) => centre.id === selectedCentreId
    )

    const selectedSchedule = schedules.find(
        (schedule) => schedule.id === selectedScheduleId
    )

    const selectedServiceTitle = getServiceTitle(
        schedules,
        selectedSchedule
    )

    const availableDates = useMemo(() => {
        return getAvailableDates(schedules, selectedCentreId)
    }, [schedules, selectedCentreId])

    const availableSchedules = useMemo(() => {
        return getAvailableSchedules(
            schedules,
            selectedCentreId,
            selectedDate
        )
    }, [schedules, selectedCentreId, selectedDate])

    const handleCentreChange = (event) => {
        setSelectedCentreId(event.target.value)
        setSelectedDate('')
        setSelectedTime('')
        setSelectedScheduleId('')
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
        setSelectedTime('')
        setSelectedScheduleId('')
    }

    const handleTimeChange = (schedule) => {
        setSelectedScheduleId(schedule.id)
        setSelectedTime(getScheduleStartTime(schedule))
    }

    const handleBooking = async () => {
        if (!selectedScheduleId) {
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            await appointmentsApi.create(selectedScheduleId)
            navigate('/booking-success')
        } catch (error) {
            setError('Не вдалося створити запис')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="booking-page">
            <Header />

            <main className="booking-page__main">
                <div className="booking-page__header">
                    <h1 className="booking-page__title">
                        Створити запис
                    </h1>

                    <p className="booking-page__subtitle">
                        Оберіть зручний центр, дату та час
                    </p>
                </div>

                {isLoading && (
                    <p className="booking-page__message">
                        Завантаження розкладу...
                    </p>
                )}

                {error && (
                    <p className="booking-page__message booking-page__message--error">
                        {error}
                    </p>
                )}

                {!isLoading && schedules.length === 0 && (
                    <p className="booking-page__message">
                        Для цієї послуги поки немає доступного розкладу
                    </p>
                )}

                {!isLoading && schedules.length > 0 && (
                    <div className="booking-page__content">
                        <div className="booking-page__left">
                            <BookingSelectBlock
                                centres={centres}
                                selectedCentreId={selectedCentreId}
                                onCentreChange={handleCentreChange}
                            />

                            <BookingDateBlock
                                availableDates={availableDates}
                                selectedDate={selectedDate}
                                onDateChange={handleDateChange}
                            />

                            <BookingTimeBlock
                                availableSchedules={availableSchedules}
                                selectedScheduleId={selectedScheduleId}
                                onTimeChange={handleTimeChange}
                            />
                        </div>

                        <BookingDetails
                            serviceTitle={selectedServiceTitle}
                            selectedCentre={selectedCentre}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            selectedScheduleId={selectedScheduleId}
                            isSubmitting={isSubmitting}
                            onSubmit={handleBooking}
                        />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default BookingPage
