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
// iPhone 11 Series
{ model: "iPhone 11 Pro Max", screenRepair: 299, batteryReplacement: 79, backRepair: 199, chargingPort: 99, buttons: 109, housing: 189, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
{ model: "iPhone 11 Pro", screenRepair: 269, batteryReplacement: 79, backRepair: 189, chargingPort: 99, buttons: 109, housing: 179, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
{ model: "iPhone 11", screenRepair: 199, batteryReplacement: 79, backRepair: 179, chargingPort: 99, buttons: 109, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

// iPhone XS / XR Series
{ model: "iPhone XS Max", screenRepair: 249, batteryReplacement: 79, backRepair: 179, chargingPort: 89, buttons: 99, housing: 169, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
{ model: "iPhone XS", screenRepair: 229, batteryReplacement: 79, backRepair: 169, chargingPort: 89, buttons: 99, housing: 159, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },
{ model: "iPhone XR", screenRepair: 199, batteryReplacement: 79, backRepair: 159, chargingPort: 89, buttons: 99, housing: 149, backCamera: 129, frontCamera: 109, lens: 59, image: iphoneImage },

// iPhone X
{ model: "iPhone X", screenRepair: 199, batteryReplacement: 79, backRepair: 149, chargingPort: 89, buttons: 99, housing: 149, backCamera: 119, frontCamera: 109, lens: 59, image: iphoneImage },

// iPhone 8 Series
{ model: "iPhone 8 Plus", screenRepair: 169, batteryReplacement: 69, backRepair: 139, chargingPort: 79, buttons: 89, housing: 139, backCamera: 109, frontCamera: 99, lens: 49, image: iphoneImage },
{ model: "iPhone 8", screenRepair: 149, batteryReplacement: 69, backRepair: 129, chargingPort: 79, buttons: 89, housing: 129, backCamera: 109, frontCamera: 99, lens: 49, image: iphoneImage },

// iPhone 7 Series
{ model: "iPhone 7 Plus", screenRepair: 139, batteryReplacement: 69, backRepair: 119, chargingPort: 79, buttons: 89, housing: 119, backCamera: 99, frontCamera: 89, lens: 49, image: iphoneImage },
{ model: "iPhone 7", screenRepair: 129, batteryReplacement: 69, backRepair: 109, chargingPort: 79, buttons: 89, housing: 109, backCamera: 99, frontCamera: 89, lens: 49, image: iphoneImage },

// iPhone 6S Series
{ model: "iPhone 6S Plus", screenRepair: 119, batteryReplacement: 59, backRepair: 99, chargingPort: 69, buttons: 79, housing: 99, backCamera: 89, frontCamera: 79, lens: 39, image: iphoneImage },
{ model: "iPhone 6S", screenRepair: 109, batteryReplacement: 59, backRepair: 89, chargingPort: 69, buttons: 79, housing: 89, backCamera: 89, frontCamera: 79, lens: 39, image: iphoneImage },

// iPhone 6 Series
{ model: "iPhone 6 Plus", screenRepair: 99, batteryReplacement: 59, backRepair: 79, chargingPort: 69, buttons: 79, housing: 79, backCamera: 79, frontCamera: 69, lens: 39, image: iphoneImage },
{ model: "iPhone 6", screenRepair: 89, batteryReplacement: 59, backRepair: 79, chargingPort: 69, buttons: 79, housing: 79, backCamera: 79, frontCamera: 69, lens: 39, image: iphoneImage },

// iPhone SE Series
{ model: "iPhone SE (3rd Gen)", screenRepair: 149, batteryReplacement: 69, backRepair: 119, chargingPort: 79, buttons: 89, housing: 119, backCamera: 109, frontCamera: 99, lens: 49, image: iphoneImage },
{ model: "iPhone SE (2nd Gen)", screenRepair: 139, batteryReplacement: 69, backRepair: 109, chargingPort: 79, buttons: 89, housing: 109, backCamera: 99, frontCamera: 89, lens: 49, image: iphoneImage },
{ model: "iPhone SE (1st Gen)", screenRepair: 99, batteryReplacement: 59, backRepair: 79, chargingPort: 69, buttons: 79, housing: 79, backCamera: 79, frontCamera: 69, lens: 39, image: iphoneImage },

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
