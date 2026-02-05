import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RepairDetailCard from "./RepairDetailCard";
import { useTranslation } from "react-i18next";
import iphoneImage from "../assets/iphone4.png";
import seImage from "../assets/iphone3rd.png";
import sImage from "../assets/iphone8.png";
import "./IphoneRepairDetails.css";

// iPhone Models and their repair prices
export const iphoneModels = [
  { model: "iPhone 16 Pro Max", screenRepair: 600, batteryReplacement: 330, backRepair: 370, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16 Pro", screenRepair: 550, batteryReplacement: 299, backRepair: 350, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16 Plus", screenRepair: 550, batteryReplacement: 350, backRepair: 299, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16", screenRepair: 500, batteryReplacement: 299, backRepair: 350, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },

  { model: "iPhone SE(3rd gen)", screenRepair: 80, batteryReplacement: 55, backRepair: 90, chargingPort: 49, buttons: 49, housing: 89, backCamera: 49, frontCamera: 59, lens: 45, image: seImage },
  { model: "iPhone SE(2nd gen)", screenRepair: 75, batteryReplacement: 45, backRepair: 90, chargingPort: 59, buttons: 49, housing: 89, backCamera: 49, frontCamera: 49, lens: 49, image: seImage },

  { model: "iPhone 8 Plus", screenRepair: 80, batteryReplacement: 50, backRepair: 90, chargingPort: 59, buttons: 59, housing: 99, backCamera: 49, frontCamera: 49, lens: 49, image: sImage },
  { model: "iPhone 8", screenRepair: 75, batteryReplacement: 45, backRepair: 90, chargingPort: 49, buttons: 49, housing: 89, backCamera: 49, frontCamera: 49, lens: 45, image: sImage },
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
          <h2>{selectedModel.model} {t("iphone.repairs")}</h2>
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
