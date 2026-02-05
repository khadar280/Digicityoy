import { useState, useEffect } from "react";
import ConditionOption from "./ConditionOption";
import "./IphoneConditionCalculator.css";
import { calculatePrice } from "../pages/pricingApi";

/**
 * Professional model list
 * Easy to extend and API-friendly
 */
const IPHONE_MODELS = [
  // iPhone 11 Series
  { label: "iPhone 11", value: "iphone11" },
  { label: "iPhone 11 Pro", value: "iphone11_pro" },
  { label: "iPhone 11 Pro Max", value: "iphone11_pro_max" },

  // iPhone 12 Series
  { label: "iPhone 12", value: "iphone12" },
  { label: "iPhone 12 Mini", value: "iphone12_mini" },
  { label: "iPhone 12 Pro", value: "iphone12_pro" },
  { label: "iPhone 12 Pro Max", value: "iphone12_pro_max" },

  // iPhone 13 Series
  { label: "iPhone 13", value: "iphone13" },
  { label: "iPhone 13 Mini", value: "iphone13_mini" },
  { label: "iPhone 13 Pro", value: "iphone13_pro" },
  { label: "iPhone 13 Pro Max", value: "iphone13_pro_max" },

  // iPhone 14 Series
  { label: "iPhone 14", value: "iphone14" },
  { label: "iPhone 14 Plus", value: "iphone14_plus" },
  { label: "iPhone 14 Pro", value: "iphone14_pro" },
  { label: "iPhone 14 Pro Max", value: "iphone14_pro_max" },

  // iPhone 15 Series
  { label: "iPhone 15", value: "iphone15" },
  { label: "iPhone 15 Plus", value: "iphone15_plus" },
  { label: "iPhone 15 Pro", value: "iphone15_pro" },
  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max" },

  // iPhone 16 Series
  { label: "iPhone 16", value: "iphone16" },
  { label: "iPhone 16 Plus", value: "iphone16_plus" },
  { label: "iPhone 16 Pro", value: "iphone16_pro" },
  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max" },

  // iPhone 17 Series
  { label: "iPhone 17", value: "iphone17" },
  { label: "iPhone 17 Plus", value: "iphone17_plus" },
  { label: "iPhone 17 Pro", value: "iphone17_pro" },
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max" }
];

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

      {/* iPhone Model Selector */}
      <div className="field">
        <label>iPhone Model</label>
        <select
          value={form.model}
          onChange={e =>
            setForm({
              ...form,
              model: e.target.value
            })
          }
        >
          {IPHONE_MODELS.map(model => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

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
