import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./RepairOrderForm.css";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert(t("homeRepair.sending"));
    onClose?.();
  };

  return (
    <div className="overlay">
      <div className="modal">

        {/* TITLE */}
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
  <option value="iphone">{t("homeRepair.devices.iphone")}</option>
  <option value="android">{t("homeRepair.devices.android")}</option>
  <option value="tablet">{t("homeRepair.devices.tablet")}</option>
  <option value="laptop">{t("homeRepair.devices.laptop")}</option>
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

          <button type="submit">
            {t("homeRepair.submit")}
          </button>

        </form>

        <button onClick={onClose}>
          {t("homeRepair.cancel")}
        </button>

      </div>
    </div>
  );
}