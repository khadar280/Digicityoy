import { useState } from "react";
import "./RepairOrderForm.css";

export default function RepairAtHome() {
  const HOME_FEE = 50;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    city: "",
    service: "home",
    device: "",
    issue: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalPrice = form.service === "home" ? HOME_FEE : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_URL =
      process.env.REACT_APP_API_URL ||
      "https://digicityoy-223.onrender.com";

    const orderData = {
      type: "home_repair",
      total: totalPrice,
      ...form,
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert("Request sent successfully ✅");
        setForm({
          name: "",
          phone: "",
          email: "",
          address: "",
          postcode: "",
          city: "",
          service: "home",
          device: "",
          issue: "",
        });
      } else {
        alert("Failed to send request ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="repair-page">
      <div className="repair-container">
        <h2>Home Repair Booking</h2>

        <form onSubmit={handleSubmit} className="repair-form">

          <input name="name" placeholder="Full Name" required onChange={handleChange} />
          <input name="phone" type="tel" placeholder="Phone Number" required onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />

          <select name="device" onChange={handleChange} required>
            <option value="">Select Device</option>
            <option value="iPhone">iPhone</option>
            <option value="Android">Android</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptop">Laptop</option>
          </select>

          <textarea
            name="issue"
            placeholder="Describe your issue (screen broken, not charging...)"
            required
            onChange={handleChange}
          />

          <input name="address" placeholder="Street Address" required onChange={handleChange} />
          <input name="postcode" placeholder="Post Code" required onChange={handleChange} />
          <input name="city" placeholder="City" required onChange={handleChange} />

          <select name="service" onChange={handleChange}>
            <option value="home">Home Visit (+€50)</option>
            <option value="shop">Bring to Shop (Free)</option>
          </select>

          <div className="price-box">
            <p>Service Fee: €{totalPrice}</p>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Submit Request"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}