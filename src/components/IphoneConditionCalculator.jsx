import { useState, useEffect } from "react";
import ConditionOption from "./ConditionOption";
import "./IphoneConditionCalculator.css";
import { calculatePrice } from "../pages/pricingApi";
export default function IphoneConditionCalculator() {
  const [form, setForm] = useState({
    model: "iphone13",
    screen: "good",
    body: "like_new",
    battery: "above90"
  });

  const [price, setPrice] = useState(null);

  useEffect(() => {
    calculatePrice(form).then(setPrice);
  }, [form]);

  return (
    <div className="calculator">
      <h1>Check Your iPhone Value</h1>

      <ConditionOption
        label="Screen Condition"
        value={form.screen}
        onChange={value => setForm({ ...form, screen: value })}
        options={[
          { label: "No Cracks", value: "good" },
          { label: "Cracked", value: "cracked" }
        ]}
      />

      <ConditionOption
        label="Body Condition"
        value={form.body}
        onChange={value => setForm({ ...form, body: value })}
        options={[
          { label: "Like New", value: "like_new" },
          { label: "Light Scratches", value: "light" },
          { label: "Heavy Damage", value: "heavy" }
        ]}
      />

      <ConditionOption
        label="Battery Health"
        value={form.battery}
        onChange={value => setForm({ ...form, battery: value })}
        options={[
          { label: "90–100%", value: "above90" },
          { label: "80–89%", value: "between80_89" },
          { label: "Below 80%", value: "below80" }
        ]}
      />

      {price !== null && <div className="price">${price}</div>}
    </div>
  );
}
