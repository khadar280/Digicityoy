import React, { useState } from "react";
import "./TabletLaptopRepair.css";
import tabletImg from "../assets/taplet1.png"; 


export const tabletRepairs = {

  "Apple iPad Series": [
    { model: "iPad 6 (2018)", screenRepair: 149, batteryReplacement: 89, backRepair: 99 },
    { model: "iPad 7 (2019)", screenRepair: 159, batteryReplacement: 89, backRepair: 99 },
    { model: "iPad 8 (2020)", screenRepair: 169, batteryReplacement: 89, backRepair: 109 },
    { model: "iPad 9 (2021)", screenRepair: 179, batteryReplacement: 99, backRepair: 119 },
    { model: "iPad 10 (2022)", screenRepair: 219, batteryReplacement: 109, backRepair: 129 }
  ],

  "iPad Air Series": [
    { model: "iPad Air 3", screenRepair: 219, batteryReplacement: 109, backRepair: 129 },
    { model: "iPad Air 4", screenRepair: 249, batteryReplacement: 119, backRepair: 139 },
    { model: "iPad Air 5", screenRepair: 259, batteryReplacement: 129, backRepair: 149 }
  ],

  "iPad Pro Series": [
    { model: "iPad Pro 11 (2018)", screenRepair: 349, batteryReplacement: 149, backRepair: 179 },
    { model: "iPad Pro 11 (2020)", screenRepair: 369, batteryReplacement: 149, backRepair: 179 },
    { model: "iPad Pro 11 (2022)", screenRepair: 389, batteryReplacement: 159, backRepair: 189 },

    { model: "iPad Pro 12.9 (2018)", screenRepair: 399, batteryReplacement: 159, backRepair: 199 },
    { model: "iPad Pro 12.9 (2020)", screenRepair: 429, batteryReplacement: 169, backRepair: 219 },
    { model: "iPad Pro 12.9 (2022)", screenRepair: 459, batteryReplacement: 179, backRepair: 239 }
  ],

  "Samsung Galaxy Tab Series": [
    { model: "Galaxy Tab A7", screenRepair: 159, batteryReplacement: 79, backRepair: 79 },
    { model: "Galaxy Tab A8", screenRepair: 169, batteryReplacement: 79, backRepair: 79 },
    { model: "Galaxy Tab S6", screenRepair: 219, batteryReplacement: 109, backRepair: 119 },
    { model: "Galaxy Tab S7", screenRepair: 249, batteryReplacement: 119, backRepair: 129 },
    { model: "Galaxy Tab S8", screenRepair: 279, batteryReplacement: 129, backRepair: 139 }
  ],

  "Lenovo Tablet Series": [
    { model: "Lenovo Tab M10", screenRepair: 139, batteryReplacement: 69, backRepair: 69 },
    { model: "Lenovo Tab P11", screenRepair: 179, batteryReplacement: 79, backRepair: 79 },
    { model: "Lenovo Tab P12", screenRepair: 199, batteryReplacement: 89, backRepair: 89 }
  ]
};
const API_URL = process.env.REACT_APP_API_URL || "https://digicityoy-223.onrender.com";

const TabletLaptopRepair = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    model: "",
    lang: navigator.language.startsWith("fi") ? "fi" : "en", // auto-detect
  });

  const [message, setMessage] = useState(""); // confirmation message
  const [loading, setLoading] = useState(false); // optional loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/tablets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage(data.message || (formData.lang === "fi" 
          ? "Tilaus vastaanotettu!" 
          : "Request received!"));
        setFormData({
          name: "",
          phone: "",
          email: "",
          model: "",
          lang: formData.lang, 
        });
      } else {
        setMessage(data.error || (formData.lang === "fi" 
          ? "Jokin meni pieleen." 
          : "Something went wrong."));
      }
    } catch (error) {
      setLoading(false);
      setMessage(
        formData.lang === "fi"
          ? "Virhe palvelimella. Yritä myöhemmin uudelleen."
          : "Server error. Please try again later."
      );
    }
  };

  return (
    <div className="tablet-repair-container">
      <div className="tablet-repair-box">
        <img src={tabletImg} alt="Tablet & Laptop Repair" className="tablet-img" />
        <h2>
          {formData.lang === "fi"
            ? "Tablettien ja kannettavien korjaus"
            : "Tablet & Laptop Repair"}
        </h2>
        <p className="desc">
          {formData.lang === "fi"
            ? "Tabletti- ja kannettavaongelmissa suosittelemme tuomaan laitteen liikkeeseemme tai ottamaan suoraan yhteyttä, jotta voimme tarkastaa laitteen ja antaa tarjouksen."
            : "For tablet and laptop issues, we recommend bringing the device to our store or contacting us directly so we can inspect and give you a quote."}
        </p>

        <form className="tablet-form" onSubmit={handleSubmit}>
          <select name="lang" value={formData.lang} onChange={handleChange} required>
            <option value="en">English</option>
            <option value="fi">Suomi</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder={formData.lang === "fi" ? "Nimesi" : "Your Name"}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={formData.lang === "fi" ? "Puhelinnumero" : "Phone Number"}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={formData.lang === "fi" ? "Sähköposti" : "Email"}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="model"
            placeholder={formData.lang === "fi" ? "Laitteen malli (valinnainen)" : "Device Model (optional)"}
            value={formData.model}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading
              ? formData.lang === "fi"
                ? "Lähetetään..."
                : "Submitting..."
              : formData.lang === "fi"
              ? "Ota yhteyttä"
              : "Contact Me"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", color: "green", fontWeight: "bold" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TabletLaptopRepair;