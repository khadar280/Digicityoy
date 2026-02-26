import React, { useState } from 'react';
import './AppoinmentList.css';
import BookingFormModal from "../components/BookingFormModal";
import { useTranslation } from 'react-i18next';

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { t } = useTranslation();

  const appointments = [
    { id: 1, name: t('booking.phoneRepair'), time: t('booking.time1'), price: t('booking.price1') },
    { id: 2, name: t('booking.batteryChange'), time: t('booking.time2'), price: t('booking.price2') },
    { id: 3, name: t('booking.inspection'), time: t('booking.time3'), price: t('booking.price3') },
    { id: 4, name: t('booking.passport'), time: t('booking.time4'), price: t('booking.price4') },
  ];

  return (
    <div className="appointment-container">
      <h2 className="appointment-header">{t('booking.title')}</h2>
      <ul className="appointment-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div className="appointment-info">
              <div>
                <h3>{appointment.name}</h3>
                <p>{appointment.time} - {appointment.price}</p>
              </div>
            </div>
            <button
              className="book-now-btn"
              onClick={() => setSelectedService(appointment.name)}
            >
              {t('booking.bookNow')}
            </button>
          </li>
        ))}
      </ul>

      {selectedService && (
        <BookingFormModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default Booking;