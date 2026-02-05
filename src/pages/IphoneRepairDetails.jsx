


import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import iphoneImage from "../assets/iphone4.png";

import seImage from "../assets/iphone3rd.png";
import sImage from "../assets/iphone8.png";

import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const iphoneModels = [
  
  { model: "iPhone 16 Pro Max", screenRepair: 600, batteryReplacement: 330, backRepair: 370, chargingPort: 109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16 Pro", screenRepair: 550, batteryReplacement: 299, backRepair: 350, chargingPort:  109, buttons: 119, housing: 199, backCamera: 180, frontCamera: 159, lens: 89, image: iphoneImage },
  { model: "iPhone 16 Plus", screenRepair: 550, batteryReplacement: 350, backRepair: 299, chargingPort: 109, buttons: 119, housing:  199, backCamera: 180, frontCamera:159, lens: 89, image: iphoneImage },
  { model: "iPhone 16", screenRepair: 500, batteryReplacement: 299, backRepair: 350, chargingPort: 109, buttons: 119, housing:  199, backCamera: 180, frontCamera: 159, lens:  89, image: iphoneImage },

  // iPhone 15 Series
  { model: "iPhone 15 Pro Max", screenRepair: 549, batteryReplacement: 319, backRepair: 149, chargingPort: 109, buttons:119, housing: 199, backCamera: 169, frontCamera: 150, lens: 89, image: iphoneImage },
  { model: "iPhone 15 Pro", screenRepair: 449, batteryReplacement: 139, backRepair: 339, chargingPort:  109, buttons:119 , housing: 199, backCamera: 169, frontCamera: 149, lens: 89, image: iphoneImage },
  { model: "iPhone 15 Plus", screenRepair: 469, batteryReplacement: 129, backRepair: 309, chargingPort:  109, buttons: 119, housing: 199, backCamera: 169, frontCamera: 169, lens: 89, image: iphoneImage },
  { model: "iPhone 15", screenRepair: 449, batteryReplacement: 199, backRepair: 299, chargingPort:  109, buttons: 119, housing: 169, backCamera: 169, frontCamera: 149, lens: 89, image: iphoneImage },

  // iPhone 14 Series
  { model: "iPhone 14 Pro Max", screenRepair: 400, batteryReplacement: 79, backRepair: 299, chargingPort: 109, buttons: 119, housing: 249, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },
  { model: "iPhone 14 Pro", screenRepair: 349, batteryReplacement: 79, backRepair: 249, chargingPort: 109, buttons: 119, housing: 249, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },
  { model: "iPhone 14 Plus", screenRepair: 329, batteryReplacement: 79, backRepair: 239, chargingPort: 109, buttons: 119, housing: 199, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },
  { model: "iPhone 14", screenRepair: 269, batteryReplacement: 79, backRepair: 229, chargingPort:109, buttons:119, housing: 199, backCamera: 159, frontCamera: 139, lens: 79, image: iphoneImage },

  
  { model: "iPhone 13 Pro Max", screenRepair: 339, batteryReplacement: 79, backRepair: 219, chargingPort: 99, buttons: 119, housing: 239, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },
  { model: "iPhone 13 Pro", screenRepair: 299, batteryReplacement: 79, backRepair: 209, chargingPort: 99, buttons: 119, housing:  239, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },
  { model: "iPhone 13 mini", screenRepair: 199, batteryReplacement: 79, backRepair: 199, chargingPort: 99, buttons: 119, housing: 189, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },
  { model: "iPhone 13", screenRepair: 199, batteryReplacement: 79, backRepair: 199, chargingPort: 99, buttons:  119, housing:  189, backCamera: 149, frontCamera: 129, lens: 69, image: iphoneImage },

 
  { model: "iPhone 12 Pro Max", screenRepair: 189, batteryReplacement: 79, backRepair: 199, chargingPort: 89, buttons: 119, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 12 Pro", screenRepair: 169, batteryReplacement: 79, backRepair: 189, chargingPort: 89, buttons: 119, housing: 169, backCamera:  139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 12 mini", screenRepair: 179, batteryReplacement: 79, backRepair: 189, chargingPort: 89, buttons: 119, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 12", screenRepair: 169, batteryReplacement: 79, backRepair: 189, chargingPort: 89, buttons: 119, housing: 169, backCamera:  139, frontCamera: 119, lens:  69, image: iphoneImage },


  { model: "iPhone 11 Pro Max", screenRepair: 149, batteryReplacement: 79, backRepair: 179, chargingPort: 79, buttons: 99, housing: 149, backCamera: 79, frontCamera: 79, lens: 59, image: iphoneImage },
  { model: "iPhone 11 Pro", screenRepair: 139, batteryReplacement: 79, backRepair: 169, chargingPort: 79, buttons:  99, housing: 149, backCamera: 79, frontCamera: 79, lens: 59, image: iphoneImage },
  { model: "iPhone 11", screenRepair: 130, batteryReplacement: 79, backRepair: 150, chargingPort: 79, buttons: 99, housing: 149, backCamera: 79, frontCamera:79, lens: 59, image: iphoneImage },

  
  { model: "iPhone XS Max", screenRepair: 109, batteryReplacement: 60, backRepair: 119, chargingPort:59, buttons: 49, housing: 99, backCamera: 49, frontCamera: 49, lens: 49, image: iphoneImage },
  { model: "iPhone XS", screenRepair: 99, batteryReplacement: 50, backRepair: 120, chargingPort:59, buttons: 59, housing: 99, backCamera: 49, frontCamera: 49, lens: 49, image: iphoneImage },
  { model: "iPhone XR", screenRepair: 90, batteryReplacement: 55, backRepair: 109, chargingPort: 59, buttons: 59, housing: 99, backCamera: 49, frontCamera: 49, lens: 49, image: iphoneImage },
  { model: "iPhone X", screenRepair: 85, batteryReplacement: 55, backRepair: 89, chargingPort: 59, buttons: 59, housing: 99, backCamera: 49, frontCamera: 49, lens: 49, image: iphoneImage },

  
  { model: "iPhone SE(3rd gen)", screenRepair: 80, batteryReplacement: 55, backRepair: 90, chargingPort: 49, buttons: 49, housing: 89, backCamera: 49, frontCamera: 59, lens: 45, image: seImage },
  { model: "iPhone SE(2nd gen)", screenRepair: 75, batteryReplacement: 45, backRepair: 90, chargingPort: 59, buttons: 49, housing: 89, backCamera: 49, frontCamera: 49, lens: 49, image: seImage },
  { model: "iPhone 8 Plus", screenRepair: 80, batteryReplacement: 50, backRepair: 90, chargingPort: 59, buttons: 59, housing: 99, backCamera: 49, frontCamera: 49, lens: 49, image: sImage },
  { model: "iPhone 8", screenRepair: 75, batteryReplacement: 45, backRepair: 90, chargingPort: 49, buttons: 49, housing: 89, backCamera: 49, frontCamera: 49, lens: 45, image: sImage },
  { model: "iPhone 7 Plus", screenRepair: 70, batteryReplacement: 45, backRepair: 90, chargingPort: 35, buttons: 25, housing: 45, backCamera: 50, frontCamera: 49, lens: 45, image: sImage },
  { model: "iPhone 7", screenRepair: 70, batteryReplacement: 45, backRepair: 85, chargingPort: 39, buttons: 39, housing: 89, backCamera: 49, frontCamera: 49, lens: 45, image: sImage },
  { model: "iPhone 6 Plus", screenRepair: 50, batteryReplacement: 40, backRepair: 60, chargingPort: 39, buttons: 39, housing: 89, backCamera: 49, frontCamera: 49, lens: 40, image: sImage },
  { model: "iPhone 6", screenRepair: 50, batteryReplacement: 40, backRepair: 60, chargingPort: 39, buttons: 39, housing: 89, backCamera: 49, frontCamera: 49, lens: 40, image: sImage },
  { model: "iPhone 6s", screenRepair: 60, batteryReplacement: 40, backRepair: 75, chargingPort: 39, buttons: 39, housing: 40, backCamera: 49, frontCamera: 49, lens: 40, image: sImage }
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
          <div style={{ textAlign: "left", marginBottom: "1rem" }}></div>
          <button className="back-btn" onClick={() => navigate("/")}>← {t("iphone.back")}</button>

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
