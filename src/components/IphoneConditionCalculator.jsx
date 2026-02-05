import { useState } from "react";
import { useTranslation } from "react-i18next";
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

const ISSUES = [
  { key: "screenCracked", value: "screen_cracked", deduct: 120 },
  { key: "screenScratches", value: "screen_scratches", deduct: 40 },
  { key: "backGlass", value: "back_glass", deduct: 100 },
  { key: "bodyHeavy", value: "body_heavy", deduct: 100 },
  { key: "bodyLight", value: "body_light", deduct: 40 },
  { key: "battery80", value: "battery_80", deduct: 50 },
  { key: "batteryLow", value: "battery_low", deduct: 100 },
  { key: "cameraIssue", value: "camera_issue", deduct: 120 },
  { key: "faceIdIssue", value: "faceid_issue", deduct: 150 }
];

export default function IphoneConditionCalculator() {
  const { t } = useTranslation();
  const [model, setModel] = useState("iphone13");
  const [issues, setIssues] = useState([]);
  const [price, setPrice] = useState(null);

  const toggleIssue = val => {
    setIssues(prev =>
      prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
    );
  };

  const calculateFinalPrice = () => {
    let total = BASE_PRICES[model];
    issues.forEach(val => {
      const issue = ISSUES.find(i => i.value === val);
      if (issue) total -= issue.deduct;
    });
    setPrice(Math.max(total, 0));
  };

  return (
    <div className="calculator">
      <h1>{t("iphoneCalculator.title")}</h1>

      <div className="field">
        <label>{t("iphoneCalculator.modelLabel")}</label>
        <select value={model} onChange={e => setModel(e.target.value)}>
          {IPHONE_MODELS.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="issues">
        <label>{t("iphoneCalculator.issuesTitle")}</label>

        {ISSUES.map(issue => (
          <div key={issue.value} className="checkbox">
            <input
              type="checkbox"
              checked={issues.includes(issue.value)}
              onChange={() => toggleIssue(issue.value)}
            />
            <span>
              {t(`iphoneCalculator.issues.${issue.key}`)} (-${issue.deduct})
            </span>
          </div>
        ))}
      </div>

      <button className="price-btn" onClick={calculateFinalPrice}>
        {t("iphoneCalculator.getPrice")}
      </button>

      {price !== null && (
        <div className="price">
          {t("iphoneCalculator.estimatedPrice")}:{" "}
          {t("iphoneCalculator.currency")}
          {price}
        </div>
      )}
    </div>
  );
}
