import { useState } from "react";
import "./RepairAtHome.css";

export default function RepairAtHome({ repair, onClose }) {
  const HOME_FEE = 50;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    city: "",
    service: "home",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalPrice =
    (repair?.price || 0) + (form.service === "home" ? HOME_FEE : 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      repair: repair?.name,
      basePrice: repair?.price,
      total: totalPrice,
    };
//waraa dee
    console.log("ORDER:", orderData);

    alert("Home repair request sent ✅");
    onClose?.();
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

          <input name="name" placeholder="Full Name" required onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
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

          <button type="submit">Confirm Home Repair</button>
        </form>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}