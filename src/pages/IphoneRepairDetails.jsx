import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import iphoneImage from "../assets/iphone4.png";

export const iphoneModels = [

  // iPhone 17 Series
  { model: "iPhone 17 Pro Max", screenRepair: [250, 500], batteryReplacement: 149, backRepair: 349, chargingPort: 159, buttons: 169, housing: 289, backCamera: 350, frontCamera: 179, lens: 60, image: iphoneImage },
  { model: "iPhone 17 Pro", screenRepair: [300, 450], batteryReplacement: 149, backRepair: 349, chargingPort: 159, buttons: 169, housing: 279, backCamera: 209, frontCamera: 179, lens: 129, image: iphoneImage },
  { model: "iPhone 17 Air", screenRepair: [300, 450], batteryReplacement: 149, backRepair: 349, chargingPort: 159, buttons: 169, housing: 259, backCamera: 199, frontCamera: 169, lens: 109, image: iphoneImage },
  { model: "iPhone 17", screenRepair: [250, 450], batteryReplacement: 149, backRepair: 299, chargingPort: 159, buttons: 169, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },

  // iPhone 16 Series
  { model: "iPhone 16 Pro Max", screenRepair: [220, 485], batteryReplacement: 149, backRepair: 199, chargingPort: 149, buttons: 159, housing: 269, backCamera: 199, frontCamera: 169, lens: 119, image: iphoneImage },
  { model: "iPhone 16 Pro", screenRepair: [220, 455], batteryReplacement: 149, backRepair: 179, chargingPort: 149, buttons: 159, housing: 259, backCamera: 189, frontCamera: 169, lens: 119, image: iphoneImage },
  { model: "iPhone 16 Plus", screenRepair: [180, 285], batteryReplacement: 149, backRepair: 159, chargingPort: 149, buttons: 159, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },
  { model: "iPhone 16e", screenRepair: [180, 355], batteryReplacement: 149, backRepair: 149, chargingPort: 149, buttons: 159, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },
  { model: "iPhone 16", screenRepair: [180, 355], batteryReplacement: 149, backRepair: 149, chargingPort: 149, buttons: 159, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },

  // iPhone 15 Series
  { model: "iPhone 15 Pro Max", screenRepair: [140, 340], batteryReplacement: 109, backRepair: 149, chargingPort: 139, buttons: 149, housing: 249, backCamera: 189, frontCamera: 159, lens: 109, image: iphoneImage },
  { model: "iPhone 15 Pro", screenRepair: [115, 334], batteryReplacement: 109, backRepair: 149, chargingPort: 139, buttons: 149, housing: 239, backCamera: 179, frontCamera: 149, lens: 109, image: iphoneImage },
  { model: "iPhone 15 Plus", screenRepair: [90, 230], batteryReplacement: 109, backRepair: 130, chargingPort: 139, buttons: 149, housing: 229, backCamera: 179, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 15", screenRepair: [90, 220], batteryReplacement: 109, backRepair: 130, chargingPort: 139, buttons: 149, housing: 219, backCamera: 169, frontCamera: 139, lens: 99, image: iphoneImage },

  // iPhone 14 Series
  { model: "iPhone 14 Pro Max", screenRepair: [114, 289], batteryReplacement: 99, backRepair: 159, chargingPort: 129, buttons: 139, housing: 229, backCamera: 179, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 14 Pro", screenRepair: [109, 289], batteryReplacement: 99, backRepair: 149, chargingPort: 129, buttons: 139, housing: 219, backCamera: 169, frontCamera: 149, lens: 99, image: iphoneImage },
  { model: "iPhone 14 Plus", screenRepair: [85, 189], batteryReplacement: 99, backRepair: 149, chargingPort: 129, buttons: 139, housing: 209, backCamera: 169, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 14", screenRepair: [85, 169], batteryReplacement: 99, backRepair: 130, chargingPort: 129, buttons: 139, housing: 199, backCamera: 159, frontCamera: 129, lens: 89, image: iphoneImage },

  // iPhone 13 Series
  { model: "iPhone 13 Pro Max", screenRepair: [95, 189], batteryReplacement: 79, backRepair: 149, chargingPort: 119, buttons: 129, housing: 219, backCamera: 169, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 13 Pro", screenRepair: [95, 189], batteryReplacement: 79, backRepair: 149, chargingPort: 119, buttons: 129, housing: 199, backCamera: 159, frontCamera: 139, lens: 89, image: iphoneImage },
  { model: "iPhone 13", screenRepair: [75, 149], batteryReplacement: 79, backRepair: 139, chargingPort: 119, buttons: 129, housing: 189, backCamera: 149, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 13 Mini", screenRepair: [75, 149], batteryReplacement: 79, backRepair: 139, chargingPort: 119, buttons: 129, housing: 179, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  // iPhone 12 Series
  { model: "iPhone 12 Pro Max", screenRepair: 84, batteryReplacement: 79, backRepair: 139, chargingPort: 109, buttons: 119, housing: 199, backCamera: 159, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12 Pro", screenRepair: [75, 129], batteryReplacement: 79, backRepair: 129, chargingPort: 109, buttons: 119, housing: 189, backCamera: 159, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12", screenRepair: [75, 129], batteryReplacement: 79, backRepair: 129, chargingPort: 109, buttons: 119, housing: 179, backCamera: 149, frontCamera: 129, lens: 79, image: iphoneImage },
  { model: "iPhone 12 Mini", screenRepair: [75, 129], batteryReplacement: 79, backRepair: 129, chargingPort: 109, buttons: 119, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  // iPhone 11 Series
  { model: "iPhone 11 Pro Max", screenRepair: [75, 99], batteryReplacement: 79, backRepair: 129, chargingPort: 99, buttons: 109, housing: 189, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 11 Pro", screenRepair: [75, 99], batteryReplacement: 69, backRepair: 119, chargingPort: 99, buttons: 109, housing: 179, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },
  { model: "iPhone 11", screenRepair: [65, 90], batteryReplacement: 79, backRepair: 119, chargingPort: 99, buttons: 109, housing: 169, backCamera: 139, frontCamera: 119, lens: 69, image: iphoneImage },

  // iPhone 6 Series (end)
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