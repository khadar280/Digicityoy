import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";
import fi from "date-fns/locale/fi";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingFormModal.css";

registerLocale("fi", fi);

const OPEN_HOUR = 11;
const CLOSE_HOUR = 20;

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
  const [timesLoading, setTimesLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const API_URL =
    process.env.REACT_APP_API_URL || "https://digicityoy-223.onrender.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (!date) return;

    const day = date.getDay();

    if (day === 0 || day === 6) {
      setWarningMessage(t("bookingForm.closedWeekend"));
      return;
    }

    setWarningMessage("");
    setForm((prev) => ({ ...prev, date, time: "" }));
  };

  const generateTimes = () => {
    const times = [];

    const today = new Date();
    const isToday =
      form.date &&
      today.toDateString() === form.date.toDateString();

    for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
      const time = `${h.toString().padStart(2, "0")}:00`;

      if (isToday && h <= today.getHours()) continue;

      times.push(time);
    }

    return times;
  };

  useEffect(() => {
    if (!form.date) return;

    const controller = new AbortController();

    const fetchBookedTimes = async () => {
      setTimesLoading(true);

      try {
        const res = await fetch(
          `${API_URL}/api/booking?date=${
            form.date.toISOString().split("T")[0]
          }`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed fetch");

        const data = await res.json();

        const booked = data.map((item) =>
          new Date(item.bookingDate).toISOString().slice(11, 16)
        );

        setBookedTimes(booked);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setTimesLoading(false);
      }
    };

    fetchBookedTimes();

    return () => controller.abort();
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
      const bookingDate = new Date(form.date);
      const [hours, minutes] = form.time.split(":");

      bookingDate.setHours(hours, minutes, 0, 0);

      const res = await fetch(`${API_URL}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          phone: form.phone,
          service,
          bookingDate: bookingDate.toISOString(),
          lang: i18n.language.split("-")[0] || "en",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowSuccess(true);

        setForm({
          name: "",
          phone: "",
          email: "",
          date: null,
          time: "",
        });

        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 5000);
      } else {
        setServerError(data?.error || t("bookingForm.errorMessage"));
      }
    } catch (err) {
      console.error(err);
      setServerError(t("bookingForm.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>
          {t("bookingForm.book")}: {service}
        </h2>

        {warningMessage && (
          <div className="warning-banner">{warningMessage}</div>
        )}

        {serverError && (
          <div className="warning-banner">{serverError}</div>
        )}

        {showSuccess && (
          <div className="success-banner">
            {t("bookingForm.successMessage")}
          </div>
        )}

        {!showSuccess && (
          <form className="booking-form" onSubmit={handleSubmit}>
            <label>{t("bookingForm.name")}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>{t("bookingForm.phone")}</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9+\s()-]{6,20}"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <label>{t("bookingForm.email")}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="input-row">
              <div className="input-group">
                <label>{t("bookingForm.date")}</label>

                <DatePicker
                  selected={form.date}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  locale={i18n.language === "fi" ? "fi" : undefined}
                  placeholderText={t("bookingForm.date")}
                  minDate={new Date()}
                  filterDate={(date) => {
                    const day = date.getDay();
                    return day !== 0 && day !== 6;
                  }}
                />
              </div>

              <div className="input-group">
                <label>{t("bookingForm.selectTime")}</label>

                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  disabled={!form.date || timesLoading}
                  required
                >
                  <option value="">
                    {t("bookingForm.selectTime")}
                  </option>

                  {generateTimes().map((time) => (
                    <option
                      key={time}
                      value={time}
                      disabled={bookedTimes.includes(time)}
                    >
                      {time}{" "}
                      {bookedTimes.includes(time)
                        ? `(${t("bookingForm.booked")})`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading
                ? t("bookingForm.sending")
                : t("bookingForm.confirm")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingFormModal;