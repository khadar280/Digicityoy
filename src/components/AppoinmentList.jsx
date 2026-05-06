import React, { useState } from "react";
import "./AppoinmentList.css";
import BookingFormModal from "../components/BookingFormModal";
import RepairOrderForm from "../components/RepairOrderForm";
import { useTranslation } from "react-i18next";

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showRepairForm, setShowRepairForm] = useState(false);

  const { t } = useTranslation();

  // ✅ CLEAN DATA (NO t() HERE)
  const appointments = [
    {
      id: 1,
      key: "booking.phoneRepair",
      time: "booking.time1",
      price: "booking.price1",
    },
    {
      id: 2,
      key: "booking.batteryChange",
      time: "booking.time2",
      price: "booking.price2",
    },
    {
      id: 3,
      key: "booking.inspection",
      time: "booking.time3",
      price: "booking.price3",
    },
    {
      id: 4,
      key: "booking.passport",
      time: "booking.time4",
      price: "booking.price4",
    },
    {
      id: 5,
      key: "booking.homeRepair",
      isRepair: true,
    },
  ];

  const handleClick = (appointment) => {
    if (appointment.isRepair) {
      setShowRepairForm(true);
    } else {
      // ✅ send translation KEY only
      setSelectedService(appointment.key);
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-header">{t("booking.title")}</h2>

      <ul className="appointment-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div className="appointment-info">
              <div>
                {/* ✅ translate here */}
                <h3>{t(appointment.key)}</h3>

                {!appointment.isRepair && (
                  <p>
                    {t(appointment.time)} - {t(appointment.price)}
                  </p>
                )}
              </div>
            </div>

            <button
              className="book-now-btn"
              onClick={() => handleClick(appointment)}
            >
              {t("booking.bookNow")}
            </button>
          </li>
        ))}
      </ul>

      {/* Booking modal */}
      {selectedService && (
        <BookingFormModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      {/* Repair modal */}
      {showRepairForm && (
        <RepairOrderForm onClose={() => setShowRepairForm(false)} />
      )}
    </div>
  );
};

export default Booking;