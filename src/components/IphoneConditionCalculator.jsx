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
  const [screenCracked, setScreenCracked] = useState(false);
  const [screenScratches, setScreenScratches] = useState(false);
  const [cameraOk, setCameraOk] = useState(true);
  const [faceIdOk, setFaceIdOk] = useState(true);
  const [price, setPrice] = useState(null);

  const nextStep = () => setStep(step + 1);

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

    if (screenCracked) total -= 120;
    if (screenScratches) total -= 40;
    if (!cameraOk) total -= 120;
    if (!faceIdOk) total -= 150;

    setPrice(Math.max(total, 0));
    nextStep();
  };

  const currentModelObj = IPHONE_MODELS.find((m) => m.value === model);

  return (
    <div className="calculator">
      <h2>{t("iphoneCalculator.title", "iPhone Price Calculator")}</h2>

      {step === 1 && (
        <div className="step">
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
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <select value={storage} onChange={(e) => setStorage(parseInt(e.target.value))}>
            {currentModelObj.storage.map((s) => (
              <option key={s} value={s}>{s} GB</option>
            ))}
          </select>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <input type="number" placeholder="Battery %" value={battery} onChange={(e) => setBattery(e.target.value)} />
          <label>
            <input type="checkbox" checked={cannotCheckBattery} onChange={() => setCannotCheckBattery(!cannotCheckBattery)} />
            I cannot check
          </label>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {step === 4 && (
        <div className="step">
          <label>
            <input type="checkbox" checked={screenCracked} onChange={() => setScreenCracked(!screenCracked)} />
            Screen cracked
          </label>
          <label>
            <input type="checkbox" checked={screenScratches} onChange={() => setScreenScratches(!screenScratches)} />
            Screen scratches
          </label>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {step === 5 && (
        <div className="step">
          <label>
            <input type="checkbox" checked={!cameraOk} onChange={() => setCameraOk(!cameraOk)} />
            Camera not working
          </label>
          <label>
            <input type="checkbox" checked={!faceIdOk} onChange={() => setFaceIdOk(!faceIdOk)} />
            Face ID not working
          </label>
          <button onClick={calculatePrice}>Get Price</button>
        </div>
      )}

      {step === 6 && price !== null && (
        <div className="step result">
          <p>Estimated Price: {price} €</p>
          <button onClick={() => setStep(1)}>Start Over</button>
        </div>
      )}
    </div>
  );
}
