import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import iphoneImage from "../assets/iphone4.png";
import seImage from "../assets/iphone3rd.png";
import sImage from "../assets/iphone8.png";

import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Unified array for all iPhone models
export const iphoneModels = [
  {
    model: "iPhone 16 Pro Max",
    screenRepair: 600,
    batteryReplacement: 149,
    backRepair: 199,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 219,
    BackCamera: 180,
    FrontCamera: 159,
    CAMERALENS: 89,
    image: iphoneImage
  },
  {
    model: "iPhone 16 Pro",
    screenRepair: 549,
    batteryReplacement: 149,
    backRepair: 179,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 219,
    BackCamera: 180,
    FrontCamera: 159,
    CAMERALENS: 89,
    image: iphoneImage
  },
  {
    model: "iPhone 16 Plus",
    screenRepair: 489,
    batteryReplacement: 149,
    backRepair: 159,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 199,
    BackCamera: 180,
    FrontCamera: 159,
    CAMERALENS: 89,
    image: iphoneImage
  },
  {
    model: "iPhone 16",
    screenRepair: 469,
    batteryReplacement: 149,
    backRepair: 149,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 219,
    BackCamera: 180,
    FrontCamera: 159,
    CAMERALENS: 89,
    image: iphoneImage
  },
  // Add all iPhone 15, 14, 13... down to iPhone 6 similarly
  {
    model: "iPhone SE (3rd gen)",
    screenRepair: 80,
    batteryReplacement: 55,
    backRepair: 90,
    buttonsReplacement: 60,
    chargePortRepair: 70,
    housingRepair: 120,
    BackCamera: 49,
    FrontCamera: 49,
    CAMERALENS: 45,
    image: seImage
  },
  {
    model: "iPhone 6",
    screenRepair: 50,
    batteryReplacement: 40,
    backRepair: 60,
    buttonsReplacement: 39,
    chargePortRepair: 49,
    housingRepair: 99,
    BackCamera: 49,
    FrontCamera: 49,
    CAMERALENS: 40,
    image: sImage
  }
  // continue all models as needed
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
          <button className="back-btn" onClick={() => navigate("/")}>
            ← {t("iphone.back")}
          </button>
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
          <h2>
            {selectedModel.model} {t("iphone.repairs")}
          </h2>
          <button className="back-btn" onClick={() => setSelectedModel(null)}>
            ← {t("iphone.backToModels")}
          </button>
          <RepairDetailCard model={selectedModel.model} prices={selectedModel} />
        </div>
      )}
    </div>
  );
};

export default IphoneRepairDetails;
