import { useState } from "react";
import ConditionOption from "./ConditionOption";
import "./IphoneConditionCalculator.css";


const IPHONE_MODELS = [
  { label: "iPhone 11", value: "iphone11" },
  { label: "iPhone 11 Pro", value: "iphone11_pro" },
  { label: "iPhone 11 Pro Max", value: "iphone11_pro_max" },

  { label: "iPhone 12", value: "iphone12" },
  { label: "iPhone 12 Mini", value: "iphone12_mini" },
  { label: "iPhone 12 Pro", value: "iphone12_pro" },
  { label: "iPhone 12 Pro Max", value: "iphone12_pro_max" },

  { label: "iPhone 13", value: "iphone13" },
  { label: "iPhone 13 Mini", value: "iphone13_mini" },
  { label: "iPhone 13 Pro", value: "iphone13_pro" },
  { label: "iPhone 13 Pro Max", value: "iphone13_pro_max" },

  { label: "iPhone 14", value: "iphone14" },
  { label: "iPhone 14 Plus", value: "iphone14_plus" },
  { label: "iPhone 14 Pro", value: "iphone14_pro" },
  { label: "iPhone 14 Pro Max", value: "iphone14_pro_max" },

  { label: "iPhone 15", value: "iphone15" },
  { label: "iPhone 15 Plus", value: "iphone15_plus" },
  { label: "iPhone 15 Pro", value: "iphone15_pro" },
  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max" },

  { label: "iPhone 16", value: "iphone16" },
  { label: "iPhone 16 Plus", value: "iphone16_plus" },
  { label: "iPhone 16 Pro", value: "iphone16_pro" },
  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max" },

  { label: "iPhone 17", value: "iphone17" },
  { label: "iPhone 17 Plus", value: "iphone17_plus" },
  { label: "iPhone 17 Pro", value: "iphone17_pro" },
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max" }
];

/* ===========================
   Base Prices (Auto)
=========================== */
const BASE_PRICES = {
  iphone11: 250,
  iphone11_pro: 320,
  iphone11_pro_max: 360,

  iphone12: 350,
  iphone12_mini: 330,
  iphone12_pro: 420,
  iphone12_pro_max: 470,

  iphone13: 450,
  iphone13_mini: 430,
  iphone13_pro: 520,
  iphone13_pro_max: 580,

  iphone14: 550,
  iphone14_plus: 580,
  iphone14_pro: 650,
  iphone14_pro_max: 720,

  iphone15: 650,
  iphone15_plus: 690,
  iphone15_pro: 780,
  iphone15_pro_max: 850,

  iphone16: 750,
  iphone16_plus: 790,
  iphone16_pro: 880,
  iphone16_pro_max: 950,

  iphone17: 850,
  iphone17_plus: 890,
  iphone17_pro: 980,
  iphone17_pro_max: 1050
};

export default function IphoneConditionCalculator() {
  const [form, setForm] = useState({
    model: "iphone13",
    screen: "good",
    body: "like_new",
    battery: "above90"
  });

  const [price, setPrice] = useState(null);

  const calculateFinalPrice = () => {
    let finalPrice = BASE_PRICES[form.model];

    if (form.screen === "cracked") finalPrice -= 120;

    if (form.body === "light") finalPrice -= 40;
    if (form.body === "heavy") finalPrice -= 100;

    if (form.battery === "between80_89") finalPrice -= 50;
    if (form.battery === "below80") finalPrice -= 100;

    setPrice(Math.max(finalPrice, 0));
  };

  return (
    <div className="calculator">
      <h1>Check Your iPhone Value</h1>

      {/* Model Selector */}
      <div className="field">
        <label>iPhone Model</label>
        <select
          value={form.model}
          onChange={e => setForm({ ...form, model: e.target.value })}
        >
          {IPHONE_MODELS.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <ConditionOption
        label="Screen Condition"
        value={form.screen}
        onChange={v => setForm({ ...form, screen: v })}
        options={[
          { label: "No Cracks", value: "good" },
          { label: "Cracked", value: "cracked" }
        ]}
      />

      <ConditionOption
        label="Body Condition"
        value={form.body}
        onChange={v => setForm({ ...form, body: v })}
        options={[
          { label: "Like New", value: "like_new" },
          { label: "Light Scratches", value: "light" },
          { label: "Heavy Damage", value: "heavy" }
        ]}
      />

      <ConditionOption
        label="Battery Health"
        value={form.battery}
        onChange={v => setForm({ ...form, battery: v })}
        options={[
          { label: "90–100%", value: "above90" },
          { label: "80–89%", value: "between80_89" },
          { label: "Below 80%", value: "below80" }
        ]}
      />

      {/* Final Step */}
      <button className="price-btn" onClick={calculateFinalPrice}>
        Get My Price
      </button>

      {price !== null && <div className="price">${price}</div>}
    </div>
  );
}
