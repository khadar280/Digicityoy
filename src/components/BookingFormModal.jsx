import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./BookingFormModal.css";

const BookingFormModal = ({ service, onClose }) => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });
  const [warningMessage, setWarningMessage] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "https://digicityoy63.onrender.com";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const dayOfWeek = new Date(value).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setWarningMessage(t("bookingForm.closedWeekend"));
      } else {
        setWarningMessage("");
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
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
        const res = await fetch(`${API_URL}/api/booking?date=${form.date}`);
        if (!res.ok) throw new Error("Failed to fetch booked times");

        const data = await res.json();
        const booked = Array.isArray(data)
          ? data.map((item) => new Date(item.bookingDate).toISOString().slice(11, 16))
          : [];
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
      alert(t("bookingForm.errorMessage"));
      return;
    }

    setLoading(true);
    try {
      const lang = i18n?.language?.split("-")[0] || "en";

      const response = await fetch(`${API_URL}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          phone: form.phone,
          service,
          bookingDate: `${form.date}T${form.time}`,
          lang,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setForm({ name: "", phone: "", email: "", date: "", time: "" });
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 6000);
      } else {
        setServerError(data?.error || t("bookingForm.errorMessage"));
      }
    } catch (error) {
      setServerError(t("bookingForm.errorMessage"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{t("bookingForm.book")}: {service}</h2>

        {warningMessage && <div className="warning-banner">{warningMessage}</div>}
        {serverError && <div className="warning-banner">{serverError}</div>}
        {showSuccess && <div className="success-banner">{t("bookingForm.successMessage")}</div>}

        {!showSuccess && (
          <form className="booking-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t("bookingForm.name")}
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder={t("bookingForm.phone")}
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("bookingForm.email")}
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="input-row">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              >
                <option value="">{t("bookingForm.selectTime")}</option>
                {generateTimes().map((time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={bookedTimes.includes(time)}
                  >
                    {time} {bookedTimes.includes(time) ? t("bookingForm.booked") : ""}
                  </option>
                ))}
              </select>
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
