import React, { useState } from "react";
import "./AndroidRepairDetails.css";
import RepairDetailCard from "./RepairDetailCard";

import androidImage from "../assets/S23u.png";
import s23PlusImage from "../assets/s20.png";
import s21Image from "../assets/s21.png";
import s10Image from "../assets/s10.png";
import s9Image from "../assets/s9.png";
import s8Image from "../assets/s8.png";
import s7Image from "../assets/s7.png";
import note20UltraImage from "../assets/note20u.png";
import note20Image from "../assets/note20.png";
import note8Image from "../assets/note8.png";
import note4Image from "../assets/note4.png";


import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const groupedModels = {
  "Galaxy S Series": [
    { model: "Samsung S23 Ultra", screenRepair: 500, batteryReplacement: 99, backRepair: 99, image: androidImage },
    { model: "Samsung S23 Plus", screenRepair: 450, batteryReplacement: 99, backRepair: 99, image: s23PlusImage },
    { model: "Samsung S23", screenRepair: 400, batteryReplacement: 89, backRepair: 89, image: s23PlusImage },
    { model: "Samsung S22 Ultra", screenRepair: 450, batteryReplacement: 99, backRepair: 99, image: androidImage },
    { model: "Samsung S22", screenRepair: 350, batteryReplacement: 79, backRepair: 89, image: s23PlusImage },
    { model: "Samsung S22 Plus", screenRepair: 400, batteryReplacement: 89, backRepair: 79, image: s23PlusImage },
    { model: "Samsung S21 Ultra", screenRepair: 419, batteryReplacement: 80, backRepair: 79, image: s21Image },
    { model: "Samsung S21 Plus", screenRepair: 299, batteryReplacement: 79, backRepair: 79, image: s23PlusImage },
    { model: "Samsung S21", screenRepair: 299, batteryReplacement: 79, backRepair: 79, image: s23PlusImage },
    { model: "Samsung S20 Ultra", screenRepair: 299, batteryReplacement: 79, backRepair: 79, image: s23PlusImage },
    { model: "Samsung S20 Plus", screenRepair: 339, batteryReplacement: 79, backRepair: 79, image: s23PlusImage },
    { model: "Samsung S20 FE 5G", screenRepair: 299, batteryReplacement: 79, backRepair: 79, image: s23PlusImage },
    { model: "Samsung S20", screenRepair: 369, batteryReplacement: 75, backRepair: 75, image: s23PlusImage },
    { model: "Samsung S10 Plus", screenRepair: 309, batteryReplacement: 79, backRepair: 75, image: s23PlusImage },
    { model: "Samsung S10", screenRepair: 299, batteryReplacement: 75, backRepair: 70, image: s10Image },
    { model: "Samsung S10e", screenRepair: 249, batteryReplacement: 75, backRepair: 65, image: s10Image },
    { model: "Samsung S10 Lite", screenRepair: 299, batteryReplacement: 70, backRepair: 75, image: s10Image },
    { model: "Samsung S9 Plus", screenRepair: 289, batteryReplacement: 89, backRepair: 89, image: s9Image },
    { model: "Samsung S9", screenRepair: 319, batteryReplacement: 99, backRepair: 99, image: s9Image },
    { model: "Samsung S8 Plus", screenRepair: 269, batteryReplacement: 65, backRepair: 65, image: s8Image },
    { model: "Samsung S8", screenRepair: 259, batteryReplacement: 65, backRepair: 65, image: s8Image },
    { model: "Samsung S7 Edge", screenRepair: 249, batteryReplacement: 60, backRepair: 60, image: s7Image },
    { model: "Samsung S7", screenRepair: 149, batteryReplacement: 59, backRepair: 59, image: s7Image },
    { model: "Samsung S6", screenRepair: 139, batteryReplacement: 59, backRepair: 59, image: s7Image }
  ],
  "Galaxy Note Series": [
    { model: "Samsung Note 20 Ultra", screenRepair: 429, batteryReplacement: 140, backRepair: 90, image: note20UltraImage },
    { model: "Samsung Note 20", screenRepair: 299, batteryReplacement: 99, backRepair: 99, image: note20Image },
    { model: "Samsung Note 10 Plus", screenRepair: 399, batteryReplacement: 99, backRepair: 99, image: note20Image },
    { model: "Samsung Note 10", screenRepair: 299, batteryReplacement: 99, backRepair: 99, image: note20Image },
    { model: "Samsung Note 9", screenRepair: 299, batteryReplacement: 89, backRepair: 89, image: note8Image },
    { model: "Samsung Note 8", screenRepair: 269, batteryReplacement: 79, backRepair: 79, image: note8Image },
    { model: "Samsung Note 4", screenRepair: 149, batteryReplacement: 69, backRepair: 69, image: note4Image }
  ],
  "Galaxy A Series": [
  { model: "Samsung A3 2015", screenRepair: 99, batteryReplacement: 49, backRepair: 49 },
  { model: "Samsung A5 2015", screenRepair: 109, batteryReplacement: 49, backRepair: 49 },
  { model: "Samsung A7 2015", screenRepair: 119, batteryReplacement: 59, backRepair: 59 },

  { model: "Samsung A3 2016", screenRepair: 109, batteryReplacement: 49, backRepair: 49 },
  { model: "Samsung A5 2016", screenRepair: 119, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A7 2016", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },

  { model: "Samsung A3 2017", screenRepair: 109, batteryReplacement: 49, backRepair: 49 },
  { model: "Samsung A5 2017", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A7 2017", screenRepair: 139, batteryReplacement: 59, backRepair: 59 },

  { model: "Samsung A6", screenRepair: 119, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A6 Plus", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },

  { model: "Samsung A7 2018", screenRepair: 119, batteryReplacement: 60, backRepair: 60 },
  { model: "Samsung A8 2018", screenRepair: 149, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A8 Plus 2018", screenRepair: 159, batteryReplacement: 69, backRepair: 69 },

  { model: "Samsung A10", screenRepair: 99, batteryReplacement: 49, backRepair: 49 },
  { model: "Samsung A10s", screenRepair: 99, batteryReplacement: 49, backRepair: 49 },
  { model: "Samsung A11", screenRepair: 109, batteryReplacement: 49, backRepair: 49 },
  { model: "Samsung A12", screenRepair: 119, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A13", screenRepair: 119, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A14", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },

  { model: "Samsung A20", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A20e", screenRepair: 119, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A21", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A21s", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A22", screenRepair: 139, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A22 5G", screenRepair: 139, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A23", screenRepair: 149, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A23 5G", screenRepair: 149, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A24", screenRepair: 159, batteryReplacement: 69, backRepair: 69 },

  { model: "Samsung A30", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A30s", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A31", screenRepair: 139, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A32", screenRepair: 149, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A32 5G", screenRepair: 149, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A33 5G", screenRepair: 159, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A34 5G", screenRepair: 169, batteryReplacement: 79, backRepair: 79 },

  { model: "Samsung A40", screenRepair: 129, batteryReplacement: 59, backRepair: 59 },
  { model: "Samsung A41", screenRepair: 139, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A42 5G", screenRepair: 159, batteryReplacement: 69, backRepair: 69 },

  { model: "Samsung A50", screenRepair: 139, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A51", screenRepair: 149, batteryReplacement: 69, backRepair: 69 },
  { model: "Samsung A52", screenRepair: 169, batteryReplacement: 79, backRepair: 79 },
  { model: "Samsung A52 5G", screenRepair: 169, batteryReplacement: 79, backRepair: 79 },
  { model: "Samsung A52s 5G", screenRepair: 169, batteryReplacement: 79, backRepair: 79 },
  { model: "Samsung A53 5G", screenRepair: 179, batteryReplacement: 79, backRepair: 79 },
  { model: "Samsung A54 5G", screenRepair: 189, batteryReplacement: 89, backRepair: 89 },

  { model: "Samsung A70", screenRepair: 159, batteryReplacement: 79, backRepair: 79 },
  { model: "Samsung A71", screenRepair: 169, batteryReplacement: 79, backRepair: 79 },
  { model: "Samsung A72", screenRepair: 179, batteryReplacement: 89, backRepair: 89 },
  { model: "Samsung A73 5G", screenRepair: 199, batteryReplacement: 89, backRepair: 89 },

  { model: "Samsung A80", screenRepair: 159, batteryReplacement: 89, backRepair: 89 }
  ]
};

const AndroidRepairDetails = () => {
  const [activeSeries, setActiveSeries] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (selectedModel) {
    return (
      <div className="repair-card">
        <h2>{selectedModel.model} {t('android.repairs', { defaultValue: "Repairs" })}</h2>
        <button className="back-btn" onClick={() => setSelectedModel(null)}>
          ← {t('android.backToModels', { defaultValue: "Back to Models" })}
        </button>
        <RepairDetailCard model={selectedModel.model} prices={selectedModel} />
      </div>
    );
  }

  return (
    <div className="android-repair-container">
      <h2>{t('android.title', { defaultValue: "Samsung Android Repairs" })}</h2>

      <div className="series-selector">
        {Object.keys(groupedModels).map((series) => (
          <button
            key={series}
            className={`series-btn ${activeSeries === series ? "active" : ""}`}
            onClick={() => setActiveSeries(series)}
          >
            {t(`android.series.${series}`, { defaultValue: series })}
          </button>
        ))}
      </div>

      {activeSeries && (
        <div className="android-grid">
          {groupedModels[activeSeries].map((phone, index) => (
            <div
              key={index}
              className="android-item"
              onClick={() => setSelectedModel(phone)}
            >
              <img src={phone.image || androidImage} alt={phone.model} />
              <p>{phone.model}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AndroidRepairDetails;
