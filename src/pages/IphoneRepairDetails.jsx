import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import iphoneImage from "../assets/iphone4.png";

/* PRICE FORMAT HELPER */
export const formatPrice = (price) => {
  if (typeof price === "object") {
    return `${price.min}–${price.max} €`;
  }
  return `${price} €`;
};

export const iphoneModels = [
  { model: "iPhone 17 Pro Max", screenRepair: 600, batteryReplacement: 149, backRepair: 300, chargingPort: 159, buttons: 169, housing: 289, backCamera: 350, frontCamera: 179, lens: 60, image: iphoneImage },
  { model: "iPhone 17 Pro", screenRepair: 469, batteryReplacement: 149, backRepair: 349, chargingPort: 159, buttons: 169, housing: 279, backCamera: 209, frontCamera: 179, lens: 129, image: iphoneImage },
  { model: "iPhone 17 Air", screenRepair: 650, batteryReplacement: 149, backRepair: 349, chargingPort: 159, buttons: 169, housing: 259, backCamera: 199, frontCamera: 169, lens: 109, image: iphoneImage },
  { model: "iPhone 17", screenRepair: { min: 250, max: 400 }, batteryReplacement: 149, backRepair: 349, chargingPort: 159, buttons: 169, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },

  { model: "iPhone 16 Pro Max", screenRepair: { min: 220, max: 485 }, batteryReplacement: 149, backRepair: 199, chargingPort: 149, buttons: 159, housing: 269, backCamera: 199, frontCamera: 169, lens: 119, image: iphoneImage },
  { model: "iPhone 16 Pro", screenRepair: { min: 220, max: 455 }, batteryReplacement: 149, backRepair: 179, chargingPort: 149, buttons: 159, housing: 259, backCamera: 189, frontCamera: 169, lens: 119, image: iphoneImage },
  { model: "iPhone 16 Plus", screenRepair: { min: 180, max: 285 }, batteryReplacement: 149, backRepair: 159, chargingPort: 149, buttons: 159, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },
  { model: "iPhone 16e", screenRepair: { min: 180, max: 355 }, batteryReplacement: 149, backRepair: 149, chargingPort: 149, buttons: 159, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },
  { model: "iPhone 16", screenRepair: { min: 180, max: 355 }, batteryReplacement: 149, backRepair: 149, chargingPort: 149, buttons: 159, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },

  { model: "iPhone 15 Pro Max", screenRepair: { min: 140, max: 340 }, batteryReplacement: 109, backRepair: 149, chargingPort: 139, buttons: 149, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },
  { model: "iPhone 15 Pro", screenRepair: { min: 115, max: 334 }, batteryReplacement: 109, backRepair: 149, chargingPort: 139, buttons: 149, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },
  { model: "iPhone 15 Plus", screenRepair: { min: 90, max: 230 }, batteryReplacement: 109, backRepair: 130, chargingPort: 139, buttons: 149, housing: 229, backCamera: 179, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 15", screenRepair: { min: 90, max: 220 }, batteryReplacement: 109, backRepair: 130, chargingPort: 139, buttons: 149, housing: 219, backCamera: 169, frontCamera: 139, lens: 99, image: iphoneImage },

  { model: "iPhone 14 Pro Max", screenRepair: { min: 114, max: 289 }, batteryReplacement: 99, backRepair: 159, chargingPort: 129, buttons: 139, housing: 229, backCamera: 179, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 14 Pro", screenRepair: { min: 109, max: 289 }, batteryReplacement: 99, backRepair: 149, chargingPort: 129, buttons: 139, housing: 219, backCamera: 169, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 14 Plus", screenRepair: { min: 85, max: 189 }, batteryReplacement: 99, backRepair: 149, chargingPort: 129, buttons: 139, housing: 209, backCamera: 169, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 14", screenRepair: { min: 85, max: 169 }, batteryReplacement: 99, backRepair: 130, chargingPort: 129, buttons: 139, housing: 199, backCamera: 159, frontCamera: 129, lens: 89, image: iphoneImage },

  { model: "iPhone 13 Pro Max", screenRepair: { min: 95, max: 189 }, batteryReplacement: 79, backRepair: 149, chargingPort: 119, buttons: 129, housing: 219, backCamera: 169, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 13 Pro", screenRepair: { min: 95, max: 189 }, batteryReplacement: 79, backRepair: 149, chargingPort: 119, buttons: 129, housing: 199, backCamera: 159, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 13", screenRepair: { min: 75, max: 149 }, batteryReplacement: 79, backRepair: 139, chargingPort: 119, buttons: 129, housing: 189, backCamera: 149, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 13 Mini", screenRepair: { min: 75, max: 149 }, batteryReplacement: 79, backRepair: 139, chargingPort: 119, buttons: 129, housing: 179, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  { model: "iPhone 12 Pro Max", screenRepair: 84, batteryReplacement: 79, backRepair: 139, chargingPort: 109, buttons: 119, housing: 199, backCamera: 159, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12 Pro", screenRepair: { min: 75, max: 129 }, batteryReplacement: 79, backRepair: 129, chargingPort: 109, buttons: 119, housing: 189, backCamera: 159, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12", screenRepair: { min: 75, max: 129 }, batteryReplacement: 79, backRepair: 129, chargingPort: 109, buttons: 119, housing: 179, backCamera: 149, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12 Mini", screenRepair: { min: 75, max: 129 }, batteryReplacement: 79, backRepair: 129, chargingPort: 109, buttons: 119, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  { model: "iPhone 11 Pro Max", screenRepair: { min: 75, max: 99 }, batteryReplacement: 79, backRepair: 129, chargingPort: 99, buttons: 109, housing: 189, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 11 Pro", screenRepair: { min: 75, max: 99 }, batteryReplacement: 69, backRepair: 119, chargingPort: 99, buttons: 109, housing: 179, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 11", screenRepair: { min: 65, max: 90 }, batteryReplacement: 79, backRepair: 119, chargingPort: 99, buttons: 109, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  { model: "iPhone XS Max", screenRepair: 80, batteryReplacement: 79, backRepair: 179, chargingPort: 89, buttons: 99, housing: 169, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
  { model: "iPhone XS", screenRepair: 80, batteryReplacement: 79, backRepair: 169, chargingPort: 89, buttons: 99, housing: 159, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
  { model: "iPhone XR", screenRepair: 65, batteryReplacement: 55, backRepair: 90, chargingPort: 89, buttons: 99, housing: 149, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
  { model: "iPhone X", screenRepair: 80, batteryReplacement: 55, backRepair: 90, chargingPort: 89, buttons: 99, housing: 149, backCamera: 119, frontCamera: 109, lens: 59, image: iphoneImage },

  { model: "iPhone 8 Plus", screenRepair: 80, batteryReplacement: 45, backRepair: 90, chargingPort: 79, buttons: 89, housing: 139, backCamera: 109, frontCamera: 99, lens: 49, image: iphoneImage },
  { model: "iPhone 8", screenRepair: 65, batteryReplacement: 45, backRepair: 90, chargingPort: 79, buttons: 89, housing: 129, backCamera: 109, frontCamera: 99, lens: 49, image: iphoneImage },

  { model: "iPhone 7 Plus", screenRepair: 70, batteryReplacement: 45, backRepair: 90, chargingPort: 79, buttons: 89, housing: 119, backCamera: 99, frontCamera: 89, lens: 49, image: iphoneImage },
  { model: "iPhone 7", screenRepair: 65, batteryReplacement: 45, backRepair: 80, chargingPort: 79, buttons: 89, housing: 109, backCamera: 99, frontCamera: 89, lens: 49, image: iphoneImage },

  { model: "iPhone 6S Plus", screenRepair: 55, batteryReplacement: 40, backRepair: 60, chargingPort: 69, buttons: 79, housing: 99, backCamera: 89, frontCamera: 79, lens: 39, image: iphoneImage },
  { model: "iPhone 6S", screenRepair: 55, batteryReplacement: 40, backRepair: 60, chargingPort: 69, buttons: 79, housing: 89, backCamera: 89, frontCamera: 79, lens: 39, image: iphoneImage },
  { model: "iPhone 6 Plus", screenRepair: 50, batteryReplacement: 40, backRepair: 60, chargingPort: 69, buttons: 79, housing: 79, backCamera: 79, frontCamera: 69, lens: 39, image: iphoneImage },
  { model: "iPhone 6", screenRepair: 50, batteryReplacement: 40, backRepair: 60, chargingPort: 69, buttons: 79, housing: 79, backCamera: 79, frontCamera: 69, lens: 39, image: iphoneImage },
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
            ← {t("back")}
          </button>

          <div className="iphone-grid">
            {iphoneModels.map((iphone) => (
              <div
                key={iphone.model}
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
          <button
            className="back-btn"
            onClick={() => setSelectedModel(null)}
          >
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