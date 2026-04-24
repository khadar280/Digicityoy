import { useState } from "react";
import "./RepairOrderForm.css";

export default function RepairAtHome({ repair, onClose }) {
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
    device: "iPhone",
    issue: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalPrice =
    (repair?.price || 0) + (form.service === "home" ? HOME_FEE : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const API_URL =
      process.env.REACT_APP_API_URL ||
      "https://digicityoy-223.onrender.com";

    const orderData = {
      type: "home_repair",
      repair: repair?.name || "General Repair",
      basePrice: repair?.price || 0,
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
        alert("Home repair request sent ✅");
        onClose?.();
      } else {
        alert("Failed to send request ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Home Repair Booking</h2>

        {repair && (
          <p>
            <strong>{repair.name}</strong> — €{repair.price}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Device type */}
          <select name="device" onChange={handleChange} required>
            <option value="iPhone">iPhone</option>
            <option value="Android">Android</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptop">Laptop</option>
          </select>

          <input name="name" placeholder="Full Name" required onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />

          {/* Customer issue description */}
          <textarea
            name="issue"
            placeholder="Describe your issue (e.g. screen broken, not charging...)"
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

          <hr />

          <p>Home Service Fee: €{form.service === "home" ? 50 : 0}</p>
          <h3>Total: €{totalPrice}</h3>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Confirm Home Repair"}
          </button>
        </form>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}