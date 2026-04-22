import React, { useState } from "react";
import "./IphoneRepairDetails.css";
import RepairDetailCard from "./RepairDetailCard";
import BookingFormModal from "./BookingFormModal"; // ✅ ADD THIS
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import iphoneImage from "../assets/iphone4.png";

export const iphoneModels = [
  { model: "iPhone 15", screenRepair: [90, 220], batteryReplacement: 109, backRepair: 130, chargingPort: 139, buttons: 149, housing: 219, backCamera: 169, frontCamera: 139, lens: 99, image: iphoneImage },
  // keep your full list...
];

const IphoneRepairDetails = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // ✅ NEW
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ✅ HANDLE BOOK CLICK
  const handleBook = (service) => {
    setSelectedService(service);
  };

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
            onBook={handleBook} // ✅ IMPORTANT
          />
        </div>
      )}

      {/* ✅ MODAL RENDER */}
      {selectedService && (
        <BookingFormModal
          service={selectedService.title} // or service.key
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default IphoneRepairDetails;