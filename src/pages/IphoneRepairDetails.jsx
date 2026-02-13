// src/components/IphoneRepairDetails.jsx
import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import your images
import iphoneImage from "../assets/iphone4.png";
import seImage from "../assets/iphone3rd.png";
import sImage from "../assets/iphone8.png";

// Full list of iPhone models with all repair prices
export const iphoneModels = [
  // iPhone 16 Series
  { model: "iPhone 16 Pro Max", screenRepair: 600, batteryReplacement: 330, backRepair: 370, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16 Pro", screenRepair: 550, batteryReplacement: 299, backRepair: 350, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16 Plus", screenRepair: 550, batteryReplacement: 350, backRepair: 299, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16", screenRepair: 500, batteryReplacement: 299, backRepair: 350, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },

  // iPhone 15 Series
  { model: "iPhone 15 Pro Max", screenRepair: 549, batteryReplacement: 319, backRepair: 149, chargingPort: 109, buttons:119, housing: 199, backCamera: 169, frontCamera: 150, lens: 89, image: iphoneImage },
  { model: "iPhone 15 Pro", screenRepair: 449, batteryReplacement: 139, backRepair: 339, chargingPort: 109, buttons:119 , housing: 199, backCamera: 169, frontCamera: 149, lens: 89, image: iphoneImage },
  { model: "iPhone 15 Plus", screenRepair: 469, batteryReplacement: 129, backRepair: 309, chargingPort: 109, buttons: 119, housing: 199, backCamera: 169, frontCamera: 169, lens: 89, image: iphoneImage },
  { model: "iPhone 15", screenRepair: 449, batteryReplacement: 199, backRepair: 299, chargingPort: 109, buttons: 119, housing: 169, backCamera: 169, frontCamera: 149, lens: 89, image: iphoneImage },

  // iPhone 14 Series
  { model: "iPhone 14 Pro Max", screenRepair: 400, batteryReplacement: 79, backRepair: 299, chargingPort: 109, buttons: 119, housing: 249, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },
  { model: "iPhone 14 Pro", screenRepair: 349, batteryReplacement: 79, backRepair: 249, chargingPort: 109, buttons: 119, housing: 249, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },
  { model: "iPhone 14 Plus", screenRepair: 329, batteryReplacement: 79, backRepair: 239, chargingPort: 109, buttons: 119, housing: 199, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },
  { model: "iPhone 14", screenRepair: 269, batteryReplacement: 79, backRepair: 229, chargingPort:109, buttons:119, housing: 199, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },

  // iPhone 13 Series
  { model: "iPhone 13 Pro Max", screenRepair: 339, batteryReplacement: 79, backRepair: 219, chargingPort: 99, buttons: 119, housing: 239, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },
  { model: "iPhone 13 Pro", screenRepair: 299, batteryReplacement: 79, backRepair: 209, chargingPort: 99, buttons: 119, housing: 239, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },
  { model: "iPhone 13 mini", screenRepair: 199, batteryReplacement: 79, backRepair: 199, chargingPort: 99, buttons: 119, housing: 189, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },
  { model: "iPhone 13", screenRepair: 199, batteryReplacement: 79, backRepair: 199, chargingPort: 99, buttons: 119, housing: 189, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },

  // … continue with iPhone 12 → 11 → XS/X → SE/8/7/6 series as you already have
];

const IphoneRepairDetails = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="repair-container">
      {!selectedModel ? (
        <>
          <h2>{t("iphone.title")}</h2>
          <button className="back-btn" onClick={() => navigate("/")}>← {t("back")}</button>

          <div className="iphone-grid">
            {iphoneModels.map((iphone, index) => (
              <div
                key={index}
                className="iphone-item"
                onClick={() => setSelectedModel(iphone)}
              >
                <img src={iphone.image} alt={iphone.model} />
                <p>{iphone.model}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="repair-card">
          <h2>{selectedModel.model} {t("iphone.repairs")}</h2>
          <button className="back-btn" onClick={() => setSelectedModel(null)}>
            ← {t("iphone.backToModels")}
          </button>

          <RepairDetailCard
            model={selectedModel.model}
            prices={selectedModel}
            deviceType="iphone"
          />
        </div>
      )}
    </div>
  );
};

export default IphoneRepairDetails;
