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
    alert("Sent!");
    onClose?.();
  };

  return (
    <div className="overlay">
      <div className="modal">

        <h2>{t("Submit Request")}</h2>

        <form onSubmit={handleSubmit}>

          <input name="name" placeholder={t("Full Name")} onChange={handleChange} />
          <input name="phone" placeholder={t("Phone Number")} onChange={handleChange} />
          <input name="email" placeholder={t("Email")} onChange={handleChange} />

          <select name="device" onChange={handleChange}>
            <option value="">{t("Select Device")}</option>
            <option value="iPhone">iPhone</option>
            <option value="Android">Android</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptop">Laptop</option>
          </select>

          <textarea name="issue" placeholder={t("Describe your issue")} onChange={handleChange} />

          <input name="address" placeholder={t("Address")} onChange={handleChange} />
          <input name="postcode" placeholder={t("Post Code")} onChange={handleChange} />
          <input name="city" placeholder={t("City")} onChange={handleChange} />

          <button type="submit">
            {t("Submit Request")}
          </button>

        </form>

        <button onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  );
}