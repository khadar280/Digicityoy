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
  iphone15: 650,
  iphone15_plus: 690,
  iphone15_pro: 780,
  iphone15_pro_max: 850,
  iphone16: 750,
  iphone16_plus: 790,
  iphone16_pro: 880,
  iphone16_pro_max: 950,
  iphone17: 600,
  iphone17_plus: 890,
  iphone17_pro: 980,
  iphone17_pro_max: 1050
};

export default function IphoneConditionCalculator() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const [model, setModel] = useState("iphone15");
  const [storage, setStorage] = useState(IPHONE_MODELS[0].storage[0]);
  const [battery, setBattery] = useState("");
  const [cannotCheckBattery, setCannotCheckBattery] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [price, setPrice] = useState(null);

  const nextStep = () => setStep(step + 1);

  const currentModelObj = IPHONE_MODELS.find((m) => m.value === model);

  const getSelectedIssues = () => selectedIssues;

  const handleIssueChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedIssues(options);
  };

  const calculatePrice = () => {
    let total = BASE_PRICES[model];

    // Storage increment
    if (storage > 128) total += (storage - 128) * 2;

    // Battery deduction
    if (!cannotCheckBattery && battery) {
      const batteryNum = parseInt(battery);
      if (batteryNum >= 80 && batteryNum <= 89) total -= 50;
      if (batteryNum < 80) total -= 100;
    }

    // Issue deductions
    selectedIssues.forEach(issue => {
      switch(issue) {
        case "screenCracked": total -= 120; break;
        case "screenScratches": total -= 40; break;
        case "cameraIssue": total -= 120; break;
        case "faceIdIssue": total -= 150; break;
        case "speakerIssue": total -= 50; break;
        case "cornerDamage": total -= 80; break;
        case "backDamage": total -= 100; break;
        default: break;
      }
    });

    setPrice(Math.max(total, 0));
    nextStep();
  };

  return (
    <div className="calculator">
      <h2>{t("iphoneCalculator.title")}</h2>

      {/* Step 1: Select model */}
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
            {IPHONE_MODELS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <button className="see-more-btn" onClick={nextStep}>{t("continue")}</button>
        </div>
      )}

      {/* Step 2: Storage */}
      {step === 2 && (
        <div className="step">
          <label>{t("iphoneCalculator.storageStep", "Select Storage")}</label>
          <select value={storage} onChange={(e) => setStorage(parseInt(e.target.value))}>
            {currentModelObj.storage.map((s) => (
              <option key={s} value={s}>{s} GB</option>
            ))}
          </select>
          <button className="see-more-btn" onClick={nextStep}>{t("continue")}</button>
        </div>
      )}

      {/* Step 3: Battery */}
      {step === 3 && (
        <div className="step">
          <label>{t("iphoneCalculator.batteryStep", "Battery condition")}</label>
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
            {t("iphoneCalculator.cannotCheckBattery", "Cannot check")}
          </label>
          <button className="see-more-btn" onClick={nextStep}>{t("continue")}</button>
        </div>
      )}

      {/* Step 4: Issues dropdown */}
      {step === 4 && (
        <div className="step">
          <label>{t("iphoneCalculator.issuesTitle")}</label>
          <select
            multiple
            value={getSelectedIssues()}
            onChange={handleIssueChange}
            style={{ width: "100%", minHeight: "150px" }}
          >
            <option value="screenCracked">{t("iphoneCalculator.issues.screenCracked")}</option>
            <option value="screenScratches">{t("iphoneCalculator.issues.screenScratches")}</option>
            <option value="speakerIssue">{t("iphoneCalculator.issues.speakerIssue")}</option>
            <option value="cornerDamage">{t("iphoneCalculator.issues.cornerDamage")}</option>
            <option value="backDamage">{t("iphoneCalculator.issues.backDamage")}</option>
            <option value="cameraIssue">{t("iphoneCalculator.issues.cameraIssue")}</option>
            <option value="faceIdIssue">{t("iphoneCalculator.issues.faceIdIssue")}</option>
          </select>
          <button className="see-more-btn" onClick={calculatePrice}>{t("iphoneCalculator.getPrice")}</button>
        </div>
      )}

      {/* Step 5: Result */}
      {step === 5 && price !== null && (
        <div className="step result">
          <p>{t("iphoneCalculator.estimatedPrice")}: {price} {t("iphoneCalculator.currency")}</p>
          <button className="see-more-btn" onClick={() => {
            setStep(1);
            setSelectedIssues([]);
            setBattery("");
            setCannotCheckBattery(false);
            setPrice(null);
          }}>{t("startOver", "Start Over")}</button>
        </div>
      )}
    </div>
  );
}
