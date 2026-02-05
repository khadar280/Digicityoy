import { useState } from "react";
import "./IphoneConditionCalculator.css";

/* ===========================
   iPhone Models (11 → 17)
=========================== */
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
   Base Prices
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

/* ===========================
   Issues (MULTI SELECT)
=========================== */
const ISSUES = [
  { label: "Screen Cracked", value: "screen_cracked", deduct: 120 },
  { label: "Screen Scratches", value: "screen_scratches", deduct: 40 },
  { label: "Back Glass Broken", value: "back_glass", deduct: 100 },
  { label: "Heavy Body Damage", value: "body_heavy", deduct: 100 },
  { label: "Light Body Scratches", value: "body_light", deduct: 40 },
  { label: "Battery 80–89%", value: "battery_80", deduct: 50 },
  { label: "Battery Below 80%", value: "battery_low", deduct: 100 },
  { label: "Camera Not Working", value: "camera_issue", deduct: 120 },
  { label: "Face ID Not Working", value: "faceid_issue", deduct: 150 }
];

export default function IphoneConditionCalculator() {
  const [model, setModel] = useState("iphone13");
  const [issues, setIssues] = useState([]);
  const [price, setPrice] = useState(null);

  const toggleIssue = value => {
    setIssues(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    );
  };

  const calculateFinalPrice = () => {
    let finalPrice = BASE_PRICES[model];

    issues.forEach(issue => {
      const found = ISSUES.find(i => i.value === issue);
      if (found) finalPrice -= found.deduct;
    });

    setPrice(Math.max(finalPrice, 0));
  };

  return (
    <div className="calculator">
      <h1>Check Your iPhone Value</h1>

      {/* Model */}
      <div className="field">
        <label>iPhone Model</label>
        <select value={model} onChange={e => setModel(e.target.value)}>
          {IPHONE_MODELS.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Issues */}
      <div className="issues">
        <label>Phone Issues (Select all that apply)</label>

        {ISSUES.map(issue => (
          <div key={issue.value} className="checkbox">
            <input
              type="checkbox"
              checked={issues.includes(issue.value)}
              onChange={() => toggleIssue(issue.value)}
            />
            <span>
              {issue.label} (-${issue.deduct})
            </span>
          </div>
        ))}
      </div>

      <button className="price-btn" onClick={calculateFinalPrice}>
        Get My Price
      </button>

      {price !== null && <div className="price">${price}</div>}
    </div>
  );
}
