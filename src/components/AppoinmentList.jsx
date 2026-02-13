import React, { useState } from 'react';
import './AppoinmentList.css';
import BookingFormModal from "../components/BookingFormModal";
import { useTranslation } from 'react-i18next';

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { t } = useTranslation();

  const appointments = [
    { id: 1, key: 'phoneRepair', time: 'time1', price: 'price1' },
    { id: 2, key: 'batteryChange', time: 'time2', price: 'price2' },
    { id: 3, key: 'inspection', time: 'time3', price: 'price3' },
    { id: 4, key: 'passport', time: 'time4', price: 'price4' },
  ];

  return (
    <div className="appointment-container">
      <h2 className="appointment-header">{t('booking.title')}</h2>

      <ul className="appointment-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div className="appointment-info">
              <div>
                <h3>{t(`booking.${appointment.key}`)}</h3>
                <p>
                  {t(`booking.${appointment.time}`)} - {t(`booking.${appointment.price}`)}
                </p>
              </div>
            </div>

            <button
              className="book-now-btn"
              onClick={() => setSelectedService(t(`booking.${appointment.key}`))}
            >
              {t('booking.book')}
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
