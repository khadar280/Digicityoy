import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import iphoneImage from "../assets/iphone4.png";

import seImage from "../assets/iphone3rd.png";
import sImage from "../assets/iphone8.png";

import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const iphoneModels = [
  { model: "iPhone 16 Pro Max", screenRepair: 600, batteryReplacement: 149, backRepair: 199, image: iphoneImage },
  { model: "iPhone 16 Pro", screenRepair: 549, batteryReplacement: 149, backRepair: 179, image: iphoneImage },
  { model: "iPhone 16 Plus", screenRepair: 489, batteryReplacement: 149, backRepair: 159, image: iphoneImage },
  { model: "iPhone 16", screenRepair: 469, batteryReplacement: 149, backRepair: 149, image: iphoneImage },

  // FIXED HERE ↓↓↓
  { model: "iPhone 15 Pro Max", screenRepair: "195 / 399", batteryReplacement: 149, backRepair: 149, image: iphoneImage },
  { model: "iPhone 15 Pro", screenRepair: "180 / 389", batteryReplacement: 139, backRepair: 149, image: iphoneImage },
  { model: "iPhone 15 Plus", screenRepair: "139 / 349", batteryReplacement: 129, backRepair: 159, image: iphoneImage },
  { model: "iPhone 15", screenRepair: "139 / 329", batteryReplacement: 99, backRepair: 130, image: iphoneImage },

  { model: "iPhone 14 Pro Max", screenRepair: "159 / 339", batteryReplacement: 99, backRepair: 149, image: iphoneImage },
  { model: "iPhone 14 pro", screenRepair: "159 / 319", batteryReplacement: 99, backRepair: 149, image: iphoneImage },
  { model: "iPhone 14 Plus", screenRepair: "139 / 290", batteryReplacement: 99, backRepair: 149, image: iphoneImage },
  { model: "iPhone 14", screenRepair: "139 / 280", batteryReplacement: 99, backRepair: 130, image: iphoneImage },

  { model: "iPhone 13 Pro Max", screenRepair: "139 / 250", batteryReplacement: 79, backRepair: 149, image: iphoneImage },
  { model: "iPhone 13 Pro", screenRepair: "129 / 230", batteryReplacement: 79, backRepair: 149, image: iphoneImage },
  { model: "iPhone 13 mini", screenRepair: 199, batteryReplacement: 79, backRepair: 139, image: iphoneImage },
  { model: "iPhone 13", screenRepair: "129 / 220", batteryReplacement: 79, backRepair: 139, image: iphoneImage },

  { model: "iPhone 12 Pro Max", screenRepair: "139 / 220", batteryReplacement: 79, backRepair: 139, image: iphoneImage },
  { model: "iPhone 12 Pro", screenRepair: "129 / 200", batteryReplacement: 79, backRepair: 129, image: iphoneImage },
  { model: "iPhone 12 mini", screenRepair: "129 / 200", batteryReplacement: 79, backRepair: 129, image: iphoneImage },
  { model: "iPhone 12", screenRepair: "129 / 200", batteryReplacement: 79, backRepair: 129, image: iphoneImage },

  { model: "iPhone 11 Pro Max", screenRepair: "129 / 180", batteryReplacement: 79, backRepair: 129, image: iphoneImage },
  { model: "iPhone 11 Pro", screenRepair: "119 / 150", batteryReplacement: 69, backRepair: 119, image: iphoneImage },
  { model: "iPhone 11", screenRepair: "99 / 150", batteryReplacement: 60, backRepair: 119, image: iphoneImage },

  { model: "iPhone XS Max", screenRepair: "99 / 130", batteryReplacement: 60, backRepair: 119, image: iphoneImage },
  { model: "iPhone XS", screenRepair: "90 / 129", batteryReplacement: 55, backRepair: 120, image: iphoneImage },
  { model: "iPhone XR", screenRepair: "85 / 100", batteryReplacement: 55, backRepair: 100, image: iphoneImage },
  { model: "iPhone X", screenRepair: "85 / 100", batteryReplacement: 55, backRepair: 100, image: iphoneImage },

  { model: "iPhone SE(3rd gen)", screenRepair: 80, batteryReplacement: 55, backRepair: 90, image: seImage },
  { model: "iPhone SE(2nd gen)", screenRepair: 75, batteryReplacement: 45, backRepair: 90, image: iphoneImage },

  { model: "iPhone 8 Plus", screenRepair: 80, batteryReplacement: 50, backRepair: 90, image: sImage },
  { model: "iPhone 8", screenRepair: 80, batteryReplacement: 50, backRepair: 90, image: sImage },

  { model: "iPhone 7 Plus", screenRepair: 70, batteryReplacement: 45, backRepair: 90, image: sImage },
  { model: "iPhone 7", screenRepair: 70, batteryReplacement: 40, backRepair: 85, image: sImage },

  { model: "iPhone 6 Plus", screenRepair: 50, batteryReplacement: 40, backRepair: 60, image: sImage },
  { model: "iPhone 6", screenRepair: 50, batteryReplacement: 40, backRepair: 60, image: sImage },
  { model: "iPhone 6s", screenRepair: 60, batteryReplacement: 40, backRepair: 75, image: sImage }
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
