// src/components/IphoneRepairDetails.jsx
import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import your image
import iphoneImage from "../assets/iphone4.png"; // your existing image

// Full iPhone models list 17 → 6
export const iphoneModels = [
  // iPhone 17 Series
  { model: "iPhone 17 Pro Max", screenRepair: 489, batteryReplacement: 139, backRepair: 309, chargingPort: 159, buttons: 169, housing: 289, backCamera: 219, frontCamera: 179, lens: 129, image: iphoneImage },
  { model: "iPhone 17 Pro", screenRepair: 469, batteryReplacement: 139, backRepair: 299, chargingPort: 159, buttons: 169, housing: 279, backCamera: 209, frontCamera: 179, lens: 129, image: iphoneImage },
  { model: "iPhone 17 Plus", screenRepair: 419, batteryReplacement: 139, backRepair: 269, chargingPort: 159, buttons: 169, housing: 259, backCamera: 199, frontCamera: 169, lens: 109, image: iphoneImage },
  { model: "iPhone 17", screenRepair: 399, batteryReplacement: 139, backRepair: 259, chargingPort: 159, buttons: 169, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },

  // iPhone 16 Series
  { model: "iPhone 16 Pro Max", screenRepair: 459, batteryReplacement: 129, backRepair: 289, chargingPort: 149, buttons: 159, housing: 269, backCamera: 199, frontCamera: 169, lens: 119, image: iphoneImage },
  { model: "iPhone 16 Pro", screenRepair: 439, batteryReplacement: 129, backRepair: 279, chargingPort: 149, buttons: 159, housing: 259, backCamera: 189, frontCamera: 169, lens: 119, image: iphoneImage },
  { model: "iPhone 16 Plus", screenRepair: 399, batteryReplacement: 129, backRepair: 259, chargingPort: 149, buttons: 159, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },
  { model: "iPhone 16", screenRepair: 379, batteryReplacement: 129, backRepair: 249, chargingPort: 149, buttons: 159, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },

  // iPhone 15 Series
  { model: "iPhone 15 Pro Max", screenRepair: 429, batteryReplacement: 119, backRepair: 269, chargingPort: 139, buttons: 149, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },
  { model: "iPhone 15 Pro", screenRepair: 409, batteryReplacement: 119, backRepair: 259, chargingPort: 139, buttons: 149, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },
  { model: "iPhone 15 Plus", screenRepair: 369, batteryReplacement: 119, backRepair: 239, chargingPort: 139, buttons: 149, housing: 229, backCamera: 179, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 15", screenRepair: 349, batteryReplacement: 119, backRepair: 229, chargingPort: 139, buttons: 149, housing: 219, backCamera: 169, frontCamera: 139, lens: 99, image: iphoneImage },

  // iPhone 14 Series
  { model: "iPhone 14 Pro Max", screenRepair: 399, batteryReplacement: 109, backRepair: 249, chargingPort: 129, buttons: 139, housing: 229, backCamera: 179, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 14 Pro", screenRepair: 379, batteryReplacement: 109, backRepair: 239, chargingPort: 129, buttons: 139, housing: 219, backCamera: 169, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 14 Plus", screenRepair: 339, batteryReplacement: 109, backRepair: 219, chargingPort: 129, buttons: 139, housing: 209, backCamera: 169, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 14", screenRepair: 319, batteryReplacement: 109, backRepair: 209, chargingPort: 129, buttons: 139, housing: 199, backCamera: 159, frontCamera: 129, lens: 89, image: iphoneImage },

  // iPhone 13 Series
  { model: "iPhone 13 Pro Max", screenRepair: 369, batteryReplacement: 99, backRepair: 229, chargingPort: 119, buttons: 129, housing: 219, backCamera: 169, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 13 Pro", screenRepair: 349, batteryReplacement: 99, backRepair: 219, chargingPort: 119, buttons: 129, housing: 199, backCamera: 159, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 13", screenRepair: 299, batteryReplacement: 99, backRepair: 199, chargingPort: 119, buttons: 129, housing: 189, backCamera: 149, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 13 Mini", screenRepair: 279, batteryReplacement: 99, backRepair: 189, chargingPort: 119, buttons: 129, housing: 179, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  // iPhone 12 Series
  { model: "iPhone 12 Pro Max", screenRepair: 349, batteryReplacement: 89, backRepair: 219, chargingPort: 109, buttons: 119, housing: 199, backCamera: 159, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12 Pro", screenRepair: 329, batteryReplacement: 89, backRepair: 209, chargingPort: 109, buttons: 119, housing: 189, backCamera: 159, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12", screenRepair: 279, batteryReplacement: 89, backRepair: 199, chargingPort: 109, buttons: 119, housing: 179, backCamera: 149, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12 Mini", screenRepair: 249, batteryReplacement: 89, backRepair: 189, chargingPort: 109, buttons: 119, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  // iPhone 11 Series
  { model: "iPhone 11 Pro Max", screenRepair: 299, batteryReplacement: 79, backRepair: 199, chargingPort: 99, buttons: 109, housing: 189, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 11 Pro", screenRepair: 269, batteryReplacement: 79, backRepair: 189, chargingPort: 99, buttons: 109, housing: 179, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 11", screenRepair: 199, batteryReplacement: 79, backRepair: 179, chargingPort: 99, buttons: 109, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  // iPhone X / XS / XR / 8 / 7 / 6
  { model: "iPhone XS Max", screenRepair: 249, batteryReplacement: 79, backRepair: 179, chargingPort: 89, buttons: 99, housing: 169, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
  { model: "iPhone XS", screenRepair: 229, batteryReplacement: 79, backRepair: 169, chargingPort: 89, buttons: 99, housing: 159, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
  { model: "iPhone XR", screenRepair: 199, batteryReplacement: 79, backRepair: 159, chargingPort: 89, buttons: 99, housing: 149, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
  { model: "iPhone X", screenRepair: 199, batteryReplacement: 79, backRepair: 149, chargingPort: 89, buttons: 99, housing: 149, backCamera: 119, frontCamera: 109, lens: 59, image: iphoneImage },

  { model: "iPhone 8 Plus", screenRepair: 169, batteryReplacement: 69, backRepair: 139, chargingPort: 79, buttons: 89, housing: 139, backCamera: 109, frontCamera: 99, lens: 49, image: iphoneImage },
  { model: "iPhone 8", screenRepair: 149, batteryReplacement: 69, backRepair: 129, chargingPort: 79, buttons: 89, housing: 129, backCamera: 109, frontCamera: 99, lens: 49, image: iphoneImage },

  { model: "iPhone 7 Plus", screenRepair: 139, batteryReplacement: 69, backRepair: 119, chargingPort: 79, buttons: 89, housing: 119, backCamera: 99, frontCamera: 89, lens: 49, image: iphoneImage },
  { model: "iPhone 7", screenRepair: 129, batteryReplacement: 69, backRepair: 109, chargingPort: 79, buttons: 89, housing: 109, backCamera: 99, frontCamera: 89, lens: 49, image: iphoneImage },

  { model: "iPhone 6S Plus", screenRepair: 119, batteryReplacement: 59, backRepair: 99, chargingPort: 69, buttons: 79, housing: 99, backCamera: 89, frontCamera: 79, lens: 39, image: iphoneImage },
  { model: "iPhone 6S", screenRepair: 109, batteryReplacement: 59, backRepair: 89, chargingPort: 69, buttons: 79, housing: 89, backCamera: 89, frontCamera: 79, lens: 39, image: iphoneImage },
  { model: "iPhone 6 Plus", screenRepair: 99, batteryReplacement: 59, backRepair: 79, chargingPort: 69, buttons: 79, housing: 79, backCamera: 79, frontCamera: 69, lens: 39, image: iphoneImage },
  { model: "iPhone 6", screenRepair: 89, batteryReplacement: 59, backRepair: 79, chargingPort: 69, buttons: 79, housing: 79, backCamera: 79, frontCamera: 69, lens: 39, image: iphoneImage },
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
              <div key={index} className="iphone-item" onClick={() => setSelectedModel(iphone)}>
                <img src={iphone.image} alt={iphone.model} />
                <p>{iphone.model}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="repair-card">
          <h2>{selectedModel.model} {t("iphone.repairs")}</h2>
          <button className="back-btn" onClick={() => setSelectedModel(null)}>← {t("iphone.backToModels")}</button>
          <RepairDetailCard model={selectedModel.model} prices={selectedModel} deviceType="iphone" />
        </div>
      )}
    </div>
  );
};

export default IphoneRepairDetails;