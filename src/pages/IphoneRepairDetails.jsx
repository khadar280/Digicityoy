import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import iphoneImage from "../assets/iphone4.png";
import seImage from "../assets/iphone3rd.png";
import sImage from "../assets/iphone8.png";

import RepairDetailCard from "./RepairDetailCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const modernCamera = { BackCamera: 180, FrontCamera: 159, CAMERALENS: 89 };
const midCamera = { BackCamera: 149, FrontCamera: 129, CAMERALENS: 69 };
const oldCamera = { BackCamera: 49, FrontCamera: 49, CAMERALENS: 40 };

export const iphoneModels = [
 
  {
    model: "iPhone 16 Pro Max",
    screenRepair: 600,
    batteryReplacement: 149,
    backRepair: 199,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 219,
    ...modernCamera,
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
    ...modernCamera,
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
    ...modernCamera,
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
    ...modernCamera,
    image: iphoneImage
  },

  // iPhone 15 Series
  {
    model: "iPhone 15 Pro Max",
    screenRepair: "195 / 399",
    batteryReplacement: 149,
    backRepair: 149,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 219,
    ...modernCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 15 Pro",
    screenRepair: "180 / 389",
    batteryReplacement: 139,
    backRepair: 149,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 219,
    ...modernCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 15 Plus",
    screenRepair: "139 / 349",
    batteryReplacement: 129,
    backRepair: 159,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 219,
    ...modernCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 15",
    screenRepair: "139 / 329",
    batteryReplacement: 99,
    backRepair: 130,
    buttonsReplacement: 119,
    chargePortRepair: 109,
    housingRepair: 169,
    ...modernCamera,
    image: iphoneImage
  },

  // iPhone 14 Series
  {
    model: "iPhone 14 Pro Max",
    screenRepair: "159 / 339",
    batteryReplacement: 99,
    backRepair: 149,
    buttonsReplacement: 109,
    chargePortRepair: 119,
    housingRepair: 249,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 14 Pro",
    screenRepair: "159 / 319",
    batteryReplacement: 99,
    backRepair: 149,
    buttonsReplacement: 109,
    chargePortRepair: 109,
    housingRepair: 249,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 14 Plus",
    screenRepair: "139 / 290",
    batteryReplacement: 99,
    backRepair: 149,
    buttonsReplacement: 109,
    chargePortRepair: 109,
    housingRepair: 199,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 14",
    screenRepair: "139 / 280",
    batteryReplacement: 99,
    backRepair: 130,
    buttonsReplacement: 109,
    chargePortRepair: 109,
    housingRepair: 169,
    ...midCamera,
    image: iphoneImage
  },

  // iPhone 13 Series
  {
    model: "iPhone 13 Pro Max",
    screenRepair: "139 / 250",
    batteryReplacement: 79,
    backRepair: 149,
    buttonsReplacement: 119,
    chargePortRepair: 99,
    housingRepair: 239,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 13 Pro",
    screenRepair: "129 / 230",
    batteryReplacement: 79,
    backRepair: 149,
    buttonsReplacement: 119,
    chargePortRepair: 99,
    housingRepair: 239,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 13",
    screenRepair: "129 / 220",
    batteryReplacement: 79,
    backRepair: 139,
    buttonsReplacement: 119,
    chargePortRepair: 99,
    housingRepair: 189,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 13 mini",
    screenRepair: 199,
    batteryReplacement: 79,
    backRepair: 139,
    buttonsReplacement: 119,
    chargePortRepair: 99,
    housingRepair: 189,
    ...midCamera,
    image: iphoneImage
  },

  // iPhone 12 Series
  {
    model: "iPhone 12 Pro Max",
    screenRepair: "139 / 220",
    batteryReplacement: 79,
    backRepair: 139,
    buttonsReplacement: 69,
    chargePortRepair: 79,
    housingRepair: 159,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 12 Pro",
    screenRepair: "129 / 200",
    batteryReplacement: 79,
    backRepair: 129,
    buttonsReplacement: 69,
    chargePortRepair: 79,
    housingRepair: 159,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 12 mini",
    screenRepair: "129 / 200",
    batteryReplacement: 79,
    backRepair: 129,
    buttonsReplacement: 69,
    chargePortRepair: 79,
    housingRepair: 159,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 12",
    screenRepair: "129 / 200",
    batteryReplacement: 79,
    backRepair: 129,
    buttonsReplacement: 69,
    chargePortRepair: 79,
    housingRepair: 159,
    ...midCamera,
    image: iphoneImage
  },

  // iPhone 11 Series
  {
    model: "iPhone 11 Pro Max",
    screenRepair: "129 /180",
    batteryReplacement: 79,
    backRepair: 129,
    buttonsReplacement: 99,
    chargePortRepair: 79,
    housingRepair: 149,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 11 Pro",
    screenRepair: "119 / 150",
    batteryReplacement: 69,
    backRepair: 119,
    buttonsReplacement: 99,
    chargePortRepair: 79,
    housingRepair: 149,
    ...midCamera,
    image: iphoneImage
  },
  {
    model: "iPhone 11",
    screenRepair: "99 / 150",
    batteryReplacement: 60,
    backRepair: 119,
    buttonsReplacement: 99,
    chargePortRepair: 79,
    housingRepair: 149,
    ...midCamera,
    image: iphoneImage
  },

  // iPhone X Series
  {
    model: "iPhone XS Max",
    screenRepair: "99 / 130",
    batteryReplacement: 60,
    backRepair: 119,
    buttonsReplacement: 59,
    chargePortRepair: 59,
    housingRepair: 99,
    ...oldCamera,
    image: iphoneImage
  },
  {
    model: "iPhone XS",
    screenRepair: "90 / 129",
    batteryReplacement: 55,
    backRepair: 120,
    buttonsReplacement: 59,
    chargePortRepair: 59,
    housingRepair: 99,
    ...oldCamera,
    image: iphoneImage
  },
  {
    model: "iPhone XR",
    screenRepair: "85 / 100",
    batteryReplacement: 55,
    backRepair: 100,
    buttonsReplacement: 59,
    chargePortRepair: 59,
    housingRepair: 99,
    ...oldCamera,
    image: iphoneImage
  },
  {
    model: "iPhone X",
    screenRepair: "85 / 100",
    batteryReplacement: 55,
    backRepair: 100,
    buttonsReplacement: 59,
    chargePortRepair: 59,
    housingRepair: 99,
    ...oldCamera,
    image: iphoneImage
  },

  // iPhone 8 / 7 / 6 Series
  {
    model: "iPhone 8 Plus",
    screenRepair: 80,
    batteryReplacement: 50,
    backRepair: 90,
    buttonsReplacement: 49,
    chargePortRepair: 59,
    housingRepair: 89,
    ...oldCamera,
    image: sImage
  },
  {
    model: "iPhone 8",
    screenRepair: 80,
    batteryReplacement: 50,
    backRepair: 90,
    buttonsReplacement: 49,
    chargePortRepair: 59,
    housingRepair: 89,
    ...oldCamera,
    image: sImage
  },
  {
    model: "iPhone 7 Plus",
    screenRepair: 70,
    batteryReplacement: 45,
    backRepair: 90,
    buttonsReplacement: 59,
    chargePortRepair: 59,
    housingRepair: 89,
    ...oldCamera,
    image: sImage
  },
  {
    model: "iPhone 7",
    screenRepair: 70,
    batteryReplacement: 40,
    backRepair: 85,
    buttonsReplacement: 39,
    chargePortRepair: 39,
    housingRepair: 85,
    ...oldCamera,
    image: sImage
  },
  {
    model: "iPhone 6 Plus",
    screenRepair: 50,
    batteryReplacement: 40,
    backRepair: 60,
    buttonsReplacement: 39,
    chargePortRepair: 49,
    housingRepair: 99,
    ...oldCamera,
    image: sImage
  },
  {
    model: "iPhone 6",
    screenRepair: 50,
    batteryReplacement: 40,
    backRepair: 60,
    buttonsReplacement: 39,
    chargePortRepair: 49,
    housingRepair: 99,
    ...oldCamera,
    image: sImage
  },
  {
    model: "iPhone 6s Plus",
    screenRepair: 50,
    batteryReplacement: 40,
    backRepair: 60,
    buttonsReplacement: 39,
    chargePortRepair: 49,
    housingRepair: 99,
    ...oldCamera,
    image: sImage
  },
  {
    model: "iPhone 6s",
    screenRepair: 50,
    batteryReplacement: 40,
    backRepair: 60,
    buttonsReplacement: 39,
    chargePortRepair: 49,
    housingRepair: 99,
    ...oldCamera,
    image: sImage
  },

  // iPhone SE Series
  {
    model: "iPhone SE (3rd gen)",
    screenRepair: 80,
    batteryReplacement: 55,
    backRepair: 90,
    buttonsReplacement: 49,
    chargePortRepair: 59,
    housingRepair: 89,
    ...oldCamera,
    image: seImage
  },
  {
    model: "iPhone SE (2nd gen)",
    screenRepair: 75,
    batteryReplacement: 45,
    backRepair: 90,
    buttonsReplacement: 49,
    chargePortRepair: 59,
    housingRepair: 89,
    ...oldCamera,
    image: seImage
  }
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
