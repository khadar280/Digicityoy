import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./IphoneConditionCalculator.css";

const IPHONE_MODELS = [
  { label: "iPhone 17 Pro Max", value: "iphone17_pro_max" },
  { label: "iPhone 17 Pro", value: "iphone17_pro" },
  { label: "iPhone 17 Plus", value: "iphone17_plus" },
  { label: "iPhone 17", value: "iphone17" },
  { label: "iPhone 16 Pro Max", value: "iphone16_pro_max" },
  { label: "iPhone 16 Pro", value: "iphone16_pro" },
  { label: "iPhone 16 Plus", value: "iphone16_plus" },
  { label: "iPhone 16", value: "iphone16" },
  { label: "iPhone 15 Pro Max", value: "iphone15_pro_max" },
  { label: "iPhone 15 Pro", value: "iphone15_pro" },
  { label: "iPhone 15 Plus", value: "iphone15_plus" },
  { label: "iPhone 15", value: "iphone15" },
  { label: "iPhone 14 Pro Max", value: "iphone14_pro_max" },
  { label: "iPhone 14 Pro", value: "iphone14_pro" },
  { label: "iPhone 14 Plus", value: "iphone14_plus" },
  { label: "iPhone 14", value: "iphone14" },
  { label: "iPhone 13 Pro Max", value: "iphone13_pro_max" },
  { label: "iPhone 13 Pro", value: "iphone13_pro" },
  { label: "iPhone 13 Mini", value: "iphone13_mini" },
  { label: "iPhone 13", value: "iphone13" },
  { label: "iPhone 12 Pro Max", value: "iphone12_pro_max" },
  { label: "iPhone 12 Pro", value: "iphone12_pro" },
  { label: "iPhone 12 Mini", value: "iphone12_mini" },
  { label: "iPhone 12", value: "iphone12" },
  { label: "iPhone 11 Pro Max", value: "iphone11_pro_max" },
  { label: "iPhone 11 Pro", value: "iphone11_pro" },
  { label: "iPhone 11", value: "iphone11" }
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
  iphone17: 600,
  iphone17_plus: 890,
  iphone17_pro: 980,
  iphone17_pro_max: 1050
};

export default function IphoneConditionCalculator() {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);

  const [model, setModel] = useState("iphone13");
  const [battery, setBattery] = useState(""); // battery %
  const [cannotCheckBattery, setCannotCheckBattery] = useState(false);

  const [screenCracked, setScreenCracked] = useState(false);
  const [screenScratches, setScreenScratches] = useState(false);
  const [cameraOk, setCameraOk] = useState(true);
  const [faceIdOk, setFaceIdOk] = useState(true);
  const [memoryOk, setMemoryOk] = useState(true); // Example extra question

  const [price, setPrice] = useState(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const calculatePrice = () => {
    let total = BASE_PRICES[model];

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
    if (!memoryOk) total -= 50; // Example memory deduction

    setPrice(Math.max(total, 0));
    nextStep();
  };

  return (
    <div className="calculator">
      <h1>{t("iphoneCalculator.title")}</h1>

      {/* Step 1: Model */}
      {step === 1 && (
        <div>
          <h3>Step 1: Select your iPhone model</h3>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {IPHONE_MODELS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {/* Step 2: Battery */}
      {step === 2 && (
        <div>
          <h3>Step 2: Battery condition</h3>
          <p>Check battery max capacity: Settings → Battery → Battery Health</p>
          {!cannotCheckBattery && (
            <input
              type="number"
              placeholder="%"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            />
          )}
          <div>
            <label>
              <input
                type="checkbox"
                checked={cannotCheckBattery}
                onChange={() => setCannotCheckBattery(!cannotCheckBattery)}
              />
              I cannot check
            </label>
          </div>
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {/* Step 3: Screen */}
      {step === 3 && (
        <div>
          <h3>Step 3: Screen condition</h3>
          <label>
            <input
              type="checkbox"
              checked={screenCracked}
              onChange={() => setScreenCracked(!screenCracked)}
            />
            Screen cracked
          </label>
          <label>
            <input
              type="checkbox"
              checked={screenScratches}
              onChange={() => setScreenScratches(!screenScratches)}
            />
            Screen scratches
          </label>
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {/* Step 4: Camera & Face ID */}
      {step === 4 && (
        <div>
          <h3>Step 4: Camera & Face ID</h3>
          <label>
            <input
              type="checkbox"
              checked={!cameraOk}
              onChange={() => setCameraOk(!cameraOk)}
            />
            Camera not working
          </label>
          <label>
            <input
              type="checkbox"
              checked={!faceIdOk}
              onChange={() => setFaceIdOk(!faceIdOk)}
            />
            Face ID not working
          </label>
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {/* Step 5: Memory (example) */}
      {step === 5 && (
        <div>
          <h3>Step 5: Memory</h3>
          <label>
            <input
              type="checkbox"
              checked={!memoryOk}
              onChange={() => setMemoryOk(!memoryOk)}
            />
            Memory issue
          </label>
          <button onClick={prevStep}>Back</button>
          <button onClick={calculatePrice}>Get Price</button>
        </div>
      )}

      {/* Step 6: Result */}
      {step === 6 && price !== null && (
        <div>
          <h3>Estimated Price</h3>
          <p>{price} €</p>
          <button onClick={() => setStep(1)}>Start Over</button>
        </div>
      )}
    </div>
  );
}
