import React, { useState } from "react";
import "./TabletLaptopRepair.css";
import tabletImg from "../assets/taplet1.png"; 

const TabletLaptopRepair = () => {
 const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  model: "",
  lang: navigator.language.startsWith("fi") ? "fi" : "en",  // auto-detect
});

  const [message, setMessage] = useState("");  // confirmation message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();  

  try {
    const res = await fetch("http://localhost:3000/api/laptop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);  
      setFormData({
        name: "",
        phone: "",
        email: "",
        model: "",
        lang: formData.lang, // retain language
      });
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  } catch (error) {
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
        <img
          src={tabletImg}
          alt="Tablet & Laptop Repair"
          className="tablet-img"
        />
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
          <select
            name="lang"
            value={formData.lang}
            onChange={handleChange}
            required
          >
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
            placeholder={
              formData.lang === "fi" ? "Puhelinnumero" : "Phone Number"
            }
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
            placeholder={
              formData.lang === "fi"
                ? "Laitteen malli (valinnainen)"
                : "Device Model (optional)"
            }
            value={formData.model}
            onChange={handleChange}
          />
          <button type="submit">
            {formData.lang === "fi" ? "Ota yhteyttä" : "Contact Me"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: "green",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TabletLaptopRepair;
