


import React, { useState } from "react";
import "./AndroidRepairDetails.css";
import RepairDetailCard from "./RepairDetailCard";





import androidImage from "../assets/S23u.png";
import andImage from "../assets/s20.png";
import s21Image from "../assets/s21.png";
import s9Image from "../assets/s9.png";
import s10Image from "../assets/s10.png";
import s7Image from "../assets/s7.png";
import s8Image from "../assets/s8.png";
import noteImage from "../assets/note20u.png";
import notImage from "../assets/note20.png";
import note8Image from "../assets/note8.png"
import note4Image from "../assets/note4.png"
import aImage from "../assets/a80.png"
import a20Image from "../assets/a20.png"
import a3Image from "../assets/a3.png"
import a7Image from "../assets/a7.png"

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const groupedModels = {
  "Galaxy S Series": [
    { model: "Samsung S23 Ultra", screenRepair: 500, batteryReplacement: 99, backRepair: 99, image: androidImage },
    { model: "Samsung S23 Plus", screenRepair: 450, batteryReplacement: 99, backRepair: 99, image: andImage },
    { model: "Samsung S23", screenRepair: 400, batteryReplacement: 89, backRepair: 89, image: andImage  },
    { model: "Samsung S22 Ultra", screenRepair: 459, batteryReplacement: 99, backRepair: 99, image: androidImage  },
    { model: "Samsung S22", screenRepair: 350, batteryReplacement: 79, backRepair: 79,image: andImage },
    { model: "Samsung S22 Plus", screenRepair: 400, batteryReplacement: 89, backRepair: 89,image: andImage },
    { model: "Samsung S21 Ultra", screenRepair: 419, batteryReplacement: 80, backRepair: 80, image:s21Image },
    { model: "Samsung S21 Plus", screenRepair: 299, batteryReplacement: 79, backRepair: 79,image:andImage },
    { model: "Samsung S21", screenRepair: 299, batteryReplacement: 79, backRepair: 75,image:andImage },
    { model: "Samsung S20 Ulrta", screenRepair: 369, batteryReplacement: 70, backRepair: 70,image:andImage },
    { model: "Samsung S20 Plus", screenRepair: 339, batteryReplacement: 79, backRepair: 79 ,image:andImage},
    { model: "Samsung S20 FE 5G", screenRepair: 299, batteryReplacement: 70, backRepair: 79,image:andImage },
    { model: "Samsung S20", screenRepair: 320, batteryReplacement: 79, backRepair: 70,image:andImage },
    { model: "Samsung S10 Plus", screenRepair: 329, batteryReplacement: 79, backRepair: 70,image:andImage },
    { model: "Samsung S10", screenRepair: 299, batteryReplacement: 75, backRepair: 75,image: s10Image   },
    { model: "Samsung S10e", screenRepair: 249, batteryReplacement: 75, backRepair: 69, image: s10Image  },
    { model: "Samsung S10 Lite", screenRepair: 219, batteryReplacement: 75, backRepair: 75, image: s10Image  },
    { model: "Samsung S9 Plus", screenRepair: 400, batteryReplacement: 89, backRepair: 89 ,image: s9Image },
    { model: "Samsung S9", screenRepair: 500, batteryReplacement: 99, backRepair: 99, image: s9Image },
    { model: "Samsung S8 Plus", screenRepair: 269, batteryReplacement: 65, backRepair: 65, image: s8Image  },
    { model: "Samsung S8", screenRepair: 259, batteryReplacement: 65, backRepair: 65 , image: s8Image },
    { model: "Samsung S7 Edge", screenRepair: 249, batteryReplacement: 60, backRepair: 60 , image: s7Image},
    { model: "Samsung S7", screenRepair: 149, batteryReplacement: 59, backRepair: 59 ,  image: s7Image},
    { model: "Samsung S6", screenRepair: 139, batteryReplacement: 59, backRepair: 59,  image: s7Image }
  ],
  "Galaxy Note Series": [
    { model: "Samsung Note 20 Ultra", screenRepair: 429, batteryReplacement: 140, backRepair: 90, image:noteImage },
    { model: "Samsung Note 20", screenRepair: 299, batteryReplacement: 99, backRepair: 99,image:noteImage },
    { model: "Samsung Note 10 Plus", screenRepair: 399, batteryReplacement: 99, backRepair: 99, image:notImage },
    { model: "Samsung Note 10", screenRepair: 299, batteryReplacement: 99, backRepair: 99 ,  image:notImage},
    { model: "Samsung Note 9", screenRepair: 299, batteryReplacement: 89, backRepair: 89, image:note8Image },
    { model: "Samsung Note 8", screenRepair: 269, batteryReplacement: 79, backRepair: 79 , image:note8Image},
    { model: "Samsung Note 4", screenRepair: 149, batteryReplacement: 69, backRepair: 69,image:note4Image }
  ],
  "Galaxy A Series": [
    { model: "Samsung A80", screenRepair: 159, batteryReplacement: 89, backRepair: 89 ,image:aImage},
    { model: "Samsung A72", screenRepair: 169, batteryReplacement: 89, backRepair: 89, image:aImage },
    { model: "Samsung A71", screenRepair: 169, batteryReplacement: 69, backRepair: 79 , image:aImage},
    { model: "Samsung A70", screenRepair: 199, batteryReplacement: 69, backRepair: 79 ,image:aImage},
    { model: "Samsung A51 5G", screenRepair: 169, batteryReplacement: 79, backRepair: 79,image:aImage },
    { model: "Samsung A51", screenRepair: 159, batteryReplacement: 59, backRepair: 59 ,image:aImage},
    { model: "Samsung A50", screenRepair: 119, batteryReplacement: 49, backRepair: 49 ,image:aImage},
    { model: "Samsung A40", screenRepair: 109, batteryReplacement: 69, backRepair: 69,image:aImage },
    { model: "Samsung A30", screenRepair: 129, batteryReplacement: 59, backRepair: 69,image:aImage },
    { model: "Samsung A21S", screenRepair: 89, batteryReplacement: 59, backRepair: 59,image:aImage },
    { model: "Samsung A30 (SM A305)", screenRepair: 129, batteryReplacement: 59, backRepair: 69,image:a20Image },
    { model: "Samsung A20", screenRepair: 129, batteryReplacement: 59, backRepair: 59 ,image:a20Image},
    { model: "Samsung A20e", screenRepair: 89, batteryReplacement: 49, backRepair: 49,image:a20Image },
    { model: "Samsung A13 4G/5G", screenRepair: 99, batteryReplacement: 59, backRepair: 59,image:a20Image },
    { model: "Samsung A12", screenRepair: 99, batteryReplacement: 59, backRepair: 59,image:a20Image },
    { model: "Samsung A10", screenRepair: 99, batteryReplacement: 59, backRepair: 59 ,image:a20Image},
    { model: "Samsung A3 2015", screenRepair: 99, batteryReplacement: 49, backRepair: 49,image:a3Image },
    { model: "Samsung A3 2016", screenRepair: 99, batteryReplacement: 49, backRepair: 49,image:a3Image  },
    { model: "Samsung A3 2017", screenRepair: 109, batteryReplacement: 49, backRepair: 49,image:a3Image  },
    { model: "Samsung A5 2017", screenRepair: 129, batteryReplacement: 59, backRepair: 59 ,image:a3Image },
    { model: "Samsung A7 2018", screenRepair: 119, batteryReplacement: 60, backRepair: 60 , image:a7Image},
    { model: "Samsung A8 2018", screenRepair: 139, batteryReplacement: 70, backRepair: 70,image:a7Image }
  ]
};





const AndroidRepairDetails = () => {
  const [activeSeries, setActiveSeries] = useState(null);
    const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState(null);
  const { t } = useTranslation();

  if (selectedModel) {
    return (
      <div className="repair-card">
        <h2>{selectedModel.model} {t('android.repairs')}</h2>
        <button className="back-btn" onClick={() => setSelectedModel(null)}>
          ← {t('android.backToModels')}
        </button>
        <RepairDetailCard model={selectedModel.model} prices={selectedModel} />
      </div>
    );
  }

  return (
    <div className="android-repair-container">
      <h2>{t('android.title')}</h2>

      <div className="series-selector">
        {Object.keys(groupedModels).map((series) => (
          <button
            key={series}
            className={`series-btn ${activeSeries === series ? "active" : ""}`}
            onClick={() => setActiveSeries(series)}
          >
            {t(`android.series.${series}`)}
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


