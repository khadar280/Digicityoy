import React, { useState, useEffect } from "react";
import "./BookingFormModal.css";
import { useTranslation } from "react-i18next";

const BookingFormModal = ({ service, onClose }) => {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [fetchError, setFetchError] = useState("");

const API_URL =
process.env.REACT_APP_API_URL || "https://digicityoy-43-1ews.onrender.com";
console.log("API_URL =", API_URL);

const handleChange = (e) => {
const { name, value } = e.target;

if (name === "date") {
  const dayOfWeek = new Date(value).getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    setWarningMessage(t("bookingForm.closedWeekend"));
    return;
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

// Fetch booked times whenever the date changes
useEffect(() => {
if (!form.date) return;

const fetchBookedTimes = async () => {
  try {
    setFetchError("");
    const res = await fetch(`${API_URL}/api/?date=${form.date}`);

    if (res.status === 404) {
      setBookedTimes([]);
      return;
    }

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    const times = Array.isArray(data)
      ? data
          .map((item) => item.bookingDate?.slice(11, 16)) // extract HH:MM from ISO string
          .filter(Boolean)
      : [];

    setBookedTimes(times);
  } catch (error) {
    console.error("Failed to fetch booked times:", error);
    setBookedTimes([]);
    setFetchError(t("bookingForm.fetchError") || "Failed to fetch booked times");
  }
};

fetchBookedTimes();
}, [form.date, API_URL, t]);


const handleSubmit = async (e) => {
e.preventDefault();

if (!form.name || !form.phone || !form.email || !form.date || !form.time) {
  alert(t("bookingForm.fillAllFields"));
  return;
}

setLoading(true);

try {

  const bookingDateISO = new Date(`${form.date}T${form.time}:00`).toISOString();

  const response = await fetch(`${API_URL}/api/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: form.name,
      customerEmail: form.email,
      phone: form.phone,
      service,
      bookingDate: bookingDateISO,
      lang: i18n.language.split("-")[0],
    }),
  });

  const data = await response.json();

  if (response.ok) {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 10000);
  } else {
    alert(data?.error || t("bookingForm.errorMessage"));
  }
} catch (error) {
  console.error("Booking error:", error);
  alert(t("bookingForm.errorMessage"));
} finally {
  setLoading(false);
}
};

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>
          {t("bookingForm.book")}: {service}
        </h2>

        {warningMessage && <div className="warning-banner">{warningMessage}</div>}
        {fetchError && <div className="error-banner">{fetchError}</div>}

        {showSuccess ? (
          <p className="success-message">{t("bookingForm.successMessage")}</p>
        ) : (
          <form onSubmit={handleSubmit}>
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
                <option key={time} value={time} disabled={bookedTimes.includes(time)}>
                  {time} {bookedTimes.includes(time) ? "(busy)" : ""}
                </option>
              ))}
            </select>

            <button type="submit" disabled={loading}>
              {loading ? t("bookingForm.sending") : t("bookingForm.confirm")}
            </button>
          </form>
        )}

        <button className="close-btn" onClick={onClose}>
          ✖ {t("bookingForm.close")}
        </button>
      </div>
    </div>
  );
};

export default BookingFormModal;