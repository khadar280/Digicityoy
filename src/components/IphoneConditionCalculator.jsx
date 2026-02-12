// src/components/IphoneConditionCalculator.js
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./IphoneConditionCalculator.css";

const IPHONE_MODELS = [
  // iPhone 17
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max", storage: [128, 256, 512, 1024] },
  { label: "iPhone 17 Pro", value: "iphone17_pro", storage: [128, 256, 512] },
  { label: "iPhone 17 Plus", value: "iphone17_plus", storage: [128, 256, 512] },
  { label: "iPhone 17", value: "iphone17", storage: [128, 256] },
  // iPhone 16
  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 16 Pro", value: "iphone16_pro", storage: [128, 256, 512] },
  { label: "iPhone 16 Plus", value: "iphone16_plus", storage: [128, 256] },
  { label: "iPhone 16", value: "iphone16", storage: [128, 256] },
  // iPhone 15
  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 15 Pro", value: "iphone15_pro", storage: [128, 256, 512] },
  { label: "iPhone 15 Plus", value: "iphone15_plus", storage: [128, 256] },
  { label: "iPhone 15", value: "iphone15", storage: [128, 256] },
  // iPhone 14
  { label: "iPhone 14 Pro Max", value: "iphone14_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 14 Pro", value: "iphone14_pro", storage: [128, 256, 512] },
  { label: "iPhone 14 Plus", value: "iphone14_plus", storage: [128, 256] },
  { label: "iPhone 14", value: "iphone14", storage: [128, 256] },
  // iPhone 13
  { label: "iPhone 13 Pro Max", value: "iphone13_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 13 Pro", value: "iphone13_pro", storage: [128, 256, 512] },
  { label: "iPhone 13 Mini", value: "iphone13_mini", storage: [128, 256] },
  { label: "iPhone 13", value: "iphone13", storage: [128, 256] },
  // iPhone 12
  { label: "iPhone 12 Pro Max", value: "iphone12_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 12 Pro", value: "iphone12_pro", storage: [128, 256, 512] },
  { label: "iPhone 12 Mini", value: "iphone12_mini", storage: [128, 256] },
  { label: "iPhone 12", value: "iphone12", storage: [128, 256] },
  // iPhone 11
  { label: "iPhone 11 Pro Max", value: "iphone11_pro_max", storage: [64, 256, 512] },
  { label: "iPhone 11 Pro", value: "iphone11_pro", storage: [64, 256, 512] },
  { label: "iPhone 11", value: "iphone11", storage: [64, 128, 256] }
];

const BASE_PRICES = {
  iphone17_pro_max: 1050,
  iphone17_pro: 980,
  iphone17_plus: 890,
  iphone17: 600,
  iphone16_pro_max: 950,
  iphone16_pro: 880,
  iphone16_plus: 790,
  iphone16: 750,
  iphone15_pro_max: 850,
  iphone15_pro: 780,
  iphone15_plus: 690,
  iphone15: 650,
  iphone14_pro_max: 800,
  iphone14_pro: 750,
  iphone14_plus: 700,
  iphone14: 650,
  iphone13_pro_max: 750,
  iphone13_pro: 700,
  iphone13_mini: 650,
  iphone13: 600,
  iphone12_pro_max: 700,
  iphone12_pro: 650,
  iphone12_mini: 600,
  iphone12: 550,
  iphone11_pro_max: 600,
  iphone11_pro: 550,
  iphone11: 500
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

  const handleIssueChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedIssues(options);
  };

  const calculatePrice = () => {
    let total = BASE_PRICES[model];

    if (storage > 128) total += (storage - 128) * 2;

    if (!cannotCheckBattery && battery) {
      const batteryNum = parseInt(battery);
      if (batteryNum >= 80 && batteryNum <= 89) total -= 50;
      if (batteryNum < 80) total -= 100;
    }

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

      {step === 4 && (
        <div className="step">
          <label>{t("iphoneCalculator.issuesTitle")}</label>
          <select
            multiple
            value={selectedIssues}
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
