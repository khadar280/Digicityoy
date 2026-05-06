import React, { useState } from "react";
import "./AppoinmentList.css";
import BookingFormModal from "../components/BookingFormModal";
import RepairOrderForm from "../components/RepairOrderForm";
import { useTranslation } from "react-i18next";

const Booking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showRepairForm, setShowRepairForm] = useState(false);

  const { t } = useTranslation();

  const appointments = [
    {
      id: 1,
      key: "booking.phoneRepair",
      name: t("booking.phoneRepair"),
      time: t("booking.time1"),
      price: t("booking.price1"),
    },
    {
      id: 2,
      key: "booking.batteryChange",
      name: t("booking.batteryChange"),
      time: t("booking.time2"),
      price: t("booking.price2"),
    },
    {
      id: 3,
      key: "booking.inspection",
      name: t("booking.inspection"),
      time: t("booking.time3"),
      price: t("booking.price3"),
    },
    {
      id: 4,
      key: "booking.passport",
      name: t("booking.passport"),
      time: t("booking.time4"),
      price: t("booking.price4"),
    },
    {
      id: 5,
      key: "homeRepair",
      name: t("booking.homeRepair"),
      time: "",
      price: "",
      isRepair: true,
    },
  ];

  const handleClick = (appointment) => {
    if (appointment.isRepair) {
      setShowRepairForm(true);
    } else {
      // ✅ IMPORTANT FIX: use KEY not name
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
                <h3>{appointment.name}</h3>

                {!appointment.isRepair && (
                  <p>
                    {appointment.time} - {appointment.price}
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