// src/components/IphoneConditionCalculator.js
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./IphoneConditionCalculator.css";


const IPHONE_MODELS = [
  // 17 Series
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max", storage: [128, 256, 512, 1024] },
  { label: "iPhone 17 Pro", value: "iphone17_pro", storage: [128, 256, 512] },
  { label: "iPhone 17  Air", value: "iphone17_air", storage: [128, 256, 512] },
  { label: "iPhone 17", value: "iphone17", storage: [128, 256] },

  // 16 Series
  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 16 Pro", value: "iphone16_pro", storage: [128, 256, 512] },
  { label: "iPhone 16 Plus", value: "iphone16_plus", storage: [128, 256] },
  { label: "iPhone 16", value: "iphone16", storage: [128, 256] },

  // 15 Series
  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 15 Pro", value: "iphone15_pro", storage: [128, 256, 512] },
  { label: "iPhone 15 Plus", value: "iphone15_plus", storage: [128, 256] },
  { label: "iPhone 15", value: "iphone15", storage: [128, 256] },

  // 14 Series
  { label: "iPhone 14 Pro Max", value: "iphone14_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 14 Pro", value: "iphone14_pro", storage: [128, 256, 512] },
  { label: "iPhone 14 Plus", value: "iphone14_plus", storage: [128, 256] },
  { label: "iPhone 14", value: "iphone14", storage: [128, 256] },

  // 13 Series
  { label: "iPhone 13 Pro Max", value: "iphone13_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 13 Pro", value: "iphone13_pro", storage: [128, 256, 512] },
  { label: "iPhone 13", value: "iphone13", storage: [128, 256] },
  { label: "iPhone 13 mini", value: "iphone13_mini", storage: [128, 256] },

  // 12 Series
  { label: "iPhone 12 Pro Max", value: "iphone12_pro_max", storage: [128, 256, 512] },
  { label: "iPhone 12 Pro", value: "iphone12_pro", storage: [128, 256, 512] },
  { label: "iPhone 12", value: "iphone12", storage: [64, 128, 256] },
  { label: "iPhone 12 mini", value: "iphone12_mini", storage: [64, 128, 256] },

  // 11 Series
  { label: "iPhone 11 Pro Max", value: "iphone11_pro_max", storage: [64, 256, 512] },
  { label: "iPhone 11 Pro", value: "iphone11_pro", storage: [64, 256, 512] },
  { label: "iPhone 11", value: "iphone11", storage: [64, 128, 256] }
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
  iphone15: 350,

  iphone14_pro_max: 380,
  iphone14_pro: 350,
  iphone14_plus: 320,
  iphone14: 300,

  iphone13_pro_max: 280,
  iphone13_pro: 260,
  iphone13: 230,
  iphone13_mini: 210,

  iphone12_pro_max: 200,
  iphone12_pro: 180,
  iphone12: 150,
  iphone12_mini: 130,

  iphone11_pro_max: 160,
  iphone11_pro: 140,
  iphone11: 120
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

  const toggleIssue = (issue) => {
    setSelectedIssues(prev =>
      prev.includes(issue)
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const calculatePrice = () => {
    let total = BASE_PRICES[model] || 0;

    // Battery deduction
    if (!cannotCheckBattery && battery) {
      const batteryNum = parseInt(battery);
      if (batteryNum >= 80 && batteryNum <= 89) total -= 40;
      if (batteryNum < 80) total -= 80;
    }

    // Issue deductions
    const ISSUE_DEDUCTIONS = {
      screenCracked: 120,
      screenScratches: 30,
      speakerIssue: 40,
      cornerDamage: 60,
      backDamage: 90,
      cameraIssue: 120,
      faceIdIssue: 150
    };

    selectedIssues.forEach(issue => {
      total -= ISSUE_DEDUCTIONS[issue] || 0;
    });

    setPrice(Math.max(total, 0));
    setStep(5);
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

      {step === 1 && (
        <div className="step">
          <label>{t("iphoneCalculator.modelLabel")}</label>
          <select
            value={model}
            onChange={(e) => {
              const selected = e.target.value;
              setModel(selected);
              const firstStorage =
                IPHONE_MODELS.find(m => m.value === selected).storage[0];
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

      {step === 2 && (
        <div className="step">
          <label>{t("iphoneCalculator.storageStep")}</label>
          <select
            value={storage}
            onChange={(e) => setStorage(parseInt(e.target.value))}
          >
            {currentModelObj.storage.map(s => (
              <option key={s} value={s}>{s} GB</option>
            ))}
          </select>

          <button onClick={nextStep}>{t("continue")}</button>
        </div>
      )}

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

          <button onClick={nextStep}>{t("continue")}</button>
        </div>
      )}

      {step === 4 && (
        <div className="step">
          <label>{t("iphoneCalculator.issuesTitle")}</label>

          {[
            "screenCracked",
            "screenScratches",
            "speakerIssue",
            "cornerDamage",
            "backDamage",
            "cameraIssue",
            "faceIdIssue"
          ].map(issue => (
            <label key={issue}>
              <input
                type="checkbox"
                checked={selectedIssues.includes(issue)}
                onChange={() => toggleIssue(issue)}
              />
              {t(`iphoneCalculator.issues.${issue}`)}
            </label>
          ))}

          <button onClick={calculatePrice}>
            {t("iphoneCalculator.getPrice")}
          </button>
        </div>
      )}

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
