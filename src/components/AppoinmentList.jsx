import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BookingFormModal from "./BookingFormModal";
import "./Booking.css";

const Booking = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);

  const appointments = [
    { id: 1, key: "phoneRepair", bookKey: "bookPhoneRepair", time: "time1", price: "price1" },
    { id: 2, key: "batteryChange", bookKey: "bookBatteryChange", time: "time2", price: "price2" },
    { id: 3, key: "inspection", bookKey: "bookInspection", time: "time3", price: "price3" },
    { id: 4, key: "passport", bookKey: "bookPassport", time: "time4", price: "price4" },
  ];

  return (
    <div className="appointment-container">
      <h2 className="appointment-header">{t("booking.title")}</h2>

      <ul className="appointment-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div className="appointment-info">
              <div>
                <h3>{t(`booking.${appointment.key}`)}</h3>
                <p>
                  {t(`booking.${appointment.time}`)} – {t(`booking.${appointment.price}`)}
                </p>
              </div>
            </div>

            <button
              className="book-now-btn"
              onClick={() =>
                setSelectedService(t(`booking.${appointment.key}`))
              }
            >
              {t(`booking.${appointment.bookKey}`)}
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