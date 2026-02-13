// src/components/IphoneConditionCalculator.js
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./IphoneConditionCalculator.css";

const IPHONE_MODELS = [
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max", storage: [128, 256, 512, 1024] },
  { label: "iPhone 17 Pro", value: "iphone17_pro", storage: [128, 256, 512] },
  { label: "iPhone 17 Plus", value: "iphone17_plus", storage: [128, 256, 512] },
  { label: "iPhone 17", value: "iphone17", storage: [128, 256] },

  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 16 Pro", value: "iphone16_pro", storage: [128, 256, 512] },
  { label: "iPhone 16 Plus", value: "iphone16_plus", storage: [128, 256] },
  { label: "iPhone 16", value: "iphone16", storage: [128, 256] },

  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 15 Pro", value: "iphone15_pro", storage: [128, 256, 512] },
  { label: "iPhone 15 Plus", value: "iphone15_plus", storage: [128, 256] },
  { label: "iPhone 15", value: "iphone15", storage: [128, 256] }
];

const BASE_PRICES = {
  iphone17_pro_max: 670,
  iphone17_pro: 620,
  iphone17_plus: 590,
  iphone17: 550,

  iphone16_pro_max: 520,
  iphone16_pro: 500,
  iphone16_plus: 460,
  iphone16: 430,

  iphone15_pro_max: 450,
  iphone15_pro: 420,
  iphone15_plus: 390,
  iphone15: 350
};

export default function IphoneConditionCalculator() {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [model, setModel] = useState("iphone17_pro_max");
  const [storage, setStorage] = useState(128);
  const [battery, setBattery] = useState("");
  const [cannotCheckBattery, setCannotCheckBattery] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [price, setPrice] = useState(null);

  const currentModelObj = IPHONE_MODELS.find(m => m.value === model);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const toggleIssue = (issue) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter(i => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const calculatePrice = () => {
    let total = BASE_PRICES[model] || 0;

    // Battery deductions
    if (!cannotCheckBattery && battery) {
      const batteryNum = parseInt(battery);
      if (batteryNum >= 80 && batteryNum <= 89) total -= 40;
      if (batteryNum < 80) total -= 80;
    }

    // Issue deductions
    selectedIssues.forEach(issue => {
      switch (issue) {
        case "screenCracked": total -= 120; break;
        case "screenScratches": total -= 30; break;
        case "speakerIssue": total -= 40; break;
        case "cornerDamage": total -= 60; break;
        case "backDamage": total -= 90; break;
        case "cameraIssue": total -= 120; break;
        case "faceIdIssue": total -= 150; break;
        default: break;
      }
    });

    setPrice(Math.max(total, 0));
    nextStep();
  };

  const resetCalculator = () => {
    setStep(1);
    setBattery("");
    setCannotCheckBattery(false);
    setSelectedIssues([]);
    setPrice(null);
  };

  return (
    <div className="calculator">
      <h2>{t("iphoneCalculator.title")}</h2>

      {/* STEP 1 - MODEL */}
      {step === 1 && (
        <div className="step">
          <label>{t("iphoneCalculator.modelLabel")}</label>
          <select
            value={model}
            onChange={(e) => {
              const selected = e.target.value;
              setModel(selected);
              const firstStorage = IPHONE_MODELS.find(m => m.value === selected).storage[0];
              setStorage(firstStorage);
            }}
          >
            {IPHONE_MODELS.map(m => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <button onClick={nextStep}>{t("continue")}</button>
        </div>
      )}

      {/* STEP 2 - STORAGE */}
      {step === 2 && (
        <div className="step">
          <label>{t("iphoneCalculator.storageStep")}</label>
          <select value={storage} onChange={(e) => setStorage(parseInt(e.target.value))}>
            {currentModelObj.storage.map(s => (
              <option key={s} value={s}>{s} GB</option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "10px" }}>
          
            <button onClick={nextStep}>{t("continue")}</button>
          </div>
        </div>
      )}

      {/* STEP 3 - BATTERY */}
      {step === 3 && (
        <div className="step">
          <label>{t("iphoneCalculator.batteryStep")}</label>

          {!cannotCheckBattery && (
            <input
              type="number"
              placeholder="%"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            />
          )}

          <label>
            <input
              type="checkbox"
              checked={cannotCheckBattery}
              onChange={() => setCannotCheckBattery(!cannotCheckBattery)}
            />
            {t("iphoneCalculator.cannotCheckBattery")}
          </label>

          <div style={{ display: "flex", gap: "10px" }}>
            
            <button onClick={nextStep}>{t("continue")}</button>
          </div>
        </div>
      )}

      {/* STEP 4 - ISSUES (CHECKBOX FIXED) */}
      {step === 4 && (
        <div className="step">
          <label>{t("iphoneCalculator.issuesTitle")}</label>

          <div className="issues-grid">
            {[
              "screenCracked",
              "screenScratches",
              "speakerIssue",
              "cornerDamage",
              "backDamage",
              "cameraIssue",
              "faceIdIssue"
            ].map(issue => (
              <label key={issue} className="issue-item">
                <input
                  type="checkbox"
                  checked={selectedIssues.includes(issue)}
                  onChange={() => toggleIssue(issue)}
                />
                {t(`iphoneCalculator.issues.${issue}`)}
              </label>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
           
            <button onClick={calculatePrice}>
              {t("iphoneCalculator.getPrice")}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 - RESULT */}
      {step === 5 && price !== null && (
        <div className="step result">
          <p>
            {t("iphoneCalculator.estimatedPrice")}: {price} €
          </p>

          <button onClick={resetCalculator}>
            {t("startOver")}
          </button>
        </div>
      )}
    </div>
  );
}
