// src/components/BookingFormModal.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";
import fi from "date-fns/locale/fi";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingFormModal.css";

registerLocale("fi", fi);

const BookingFormModal = ({ service, onClose }) => {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: null,
    time: "",
  });

  const [warningMessage, setWarningMessage] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "https://digicityoy-223.onrender.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, date }));

    if (date) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setWarningMessage(t("bookingForm.closedWeekend"));
      } else {
        setWarningMessage("");
      }
    }
  };

  const generateTimes = () => {
    const times = [];
    for (let h = 11; h < 20; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return times;
  };

  useEffect(() => {
    if (!form.date) return;

    const fetchBookedTimes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/booking?date=${form.date.toISOString().split("T")[0]}`);
        if (!res.ok) throw new Error("Failed to fetch booked times");

        const data = await res.json();
        const booked = data.map((item) => new Date(item.bookingDate).toISOString().slice(11, 16));
        setBookedTimes(booked);
      } catch (error) {
        console.error(error);
        setBookedTimes([]);
      }
    };

    fetchBookedTimes();
  }, [form.date, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.date || !form.time) {
      alert(t("bookingForm.alertFillAll"));
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const bookingDateISO = new Date(
        `${form.date.toISOString().split("T")[0]}T${form.time}:00`
      ).toISOString();

      const res = await fetch(`${API_URL}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          phone: form.phone,
          service,
          bookingDate: bookingDateISO,
          lang: i18n.language.split("-")[0] || "en",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowSuccess(true);
        setForm({ name: "", phone: "", email: "", date: null, time: "" });
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 6000);
      } else {
        setServerError(data?.error || t("bookingForm.errorMessage"));
      }
    } catch (error) {
      console.error(error);
      setServerError(t("bookingForm.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose} aria-label="Close booking form">
          &times;
        </button>

        <h2>{t("bookingForm.book")}: {service}</h2>

        {warningMessage && <div className="warning-banner">{warningMessage}</div>}
        {serverError && <div className="warning-banner">{serverError}</div>}
        {showSuccess && <div className="success-banner">{t("bookingForm.successMessage")}</div>}

        {!showSuccess && (
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">{t("bookingForm.name")}</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />

            <label htmlFor="phone">{t("bookingForm.phone")}</label>
            <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required />

            <label htmlFor="email">{t("bookingForm.email")}</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="date">{t("bookingForm.date")}</label>
                <DatePicker
                  selected={form.date}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  locale={i18n.language === "fi" ? "fi" : undefined}
                  placeholderText={t("bookingForm.date")}
                  minDate={new Date()}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="time">{t("bookingForm.selectTime")}</label>
                <select id="time" name="time" value={form.time} onChange={handleChange} required>
                  <option value="">{t("bookingForm.selectTime")}</option>
                  {generateTimes().map((time) => (
                    <option key={time} value={time} disabled={bookedTimes.includes(time)}>
                      {time} {bookedTimes.includes(time) ? `(${t("bookingForm.booked")})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? t("bookingForm.sending") : t("bookingForm.confirm")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingFormModal;