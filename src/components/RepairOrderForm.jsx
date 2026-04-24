import { useState } from "react";

export default function RepairAtHome({ repair, onClose }) {
  const HOME_FEE = 50;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    service: "home",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice =
    repair.price + (form.service === "home" ? HOME_FEE : 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      repair: repair.name,
      total: totalPrice,
    };

    console.log("ORDER:", orderData);

    alert("Order placed ✅");
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Order Repair</h2>

        <p><strong>{repair.name}</strong></p>
        <p>Repair: €{repair.price}</p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
          />

          <select name="service" onChange={handleChange}>
            <option value="home">Home Visit (+€50)</option>
            <option value="shop">Bring to Shop (Free)</option>
          </select>

          <hr />

          <p>Home Service Fee: €{form.service === "home" ? 50 : 0}</p>
          <h3>Total: €{totalPrice}</h3>

          <button type="submit">Confirm Order</button>
        </form>

        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
