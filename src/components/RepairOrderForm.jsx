import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./RepairOrderForm.css";

const API_URL =
  process.env.REACT_APP_API_URL || "https://digicityoy-223.onrender.com";

export default function RepairOrderForm({ onClose }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    device: "",
    issue: "",
    address: "",
    postcode: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/repair`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      alert(t("homeRepair.sending"));

      console.log("Success:", data);

      onClose?.();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">

        <h2>{t("homeRepair.title")}</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder={t("homeRepair.fullName")}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder={t("homeRepair.phone")}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder={t("homeRepair.email")}
            onChange={handleChange}
          />

          <select name="device" onChange={handleChange}>
            <option value="">{t("homeRepair.selectDevice")}</option>
            <option value="iPhone">{t("homeRepair.devices.iphone")}</option>
            <option value="Android">{t("homeRepair.devices.android")}</option>
            <option value="Tablet">{t("homeRepair.devices.tablet")}</option>
            <option value="Laptop">{t("homeRepair.devices.laptop")}</option>
          </select>

          <textarea
            name="issue"
            placeholder={t("homeRepair.issue")}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder={t("homeRepair.address")}
            onChange={handleChange}
          />

          <input
            name="postcode"
            placeholder={t("homeRepair.postcode")}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder={t("homeRepair.city")}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : t("homeRepair.submit")}
          </button>

        </form>

        <button onClick={onClose}>
          {t("homeRepair.cancel")}
        </button>

      </div>
    </div>
  );
}