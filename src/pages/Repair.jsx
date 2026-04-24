import { useState } from "react";
import RepairOrderForm from "../components/RepairOrderForm";
import { FaTools, FaHome, FaClock, FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Repair.css";

export default function Repair() {
  const [openForm, setOpenForm] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="repair-page">

      {/* HERO */}
      <div className="repair-hero">
        <h1>{t("repair.title")}</h1>

        <p>{t("repair.subtitle")}</p>

        <button
          className="home-repair-btn"
          onClick={() => setOpenForm(true)}
        >
          <FaTools className="btn-icon" />
          {t("repair.bookBtn")}
        </button>
      </div>

      {/* FEATURES */}
      <div className="repair-features">

        <div className="feature-card">
          <FaHome />
          <h3>{t("repair.feature1Title")}</h3>
          <p>{t("repair.feature1Desc")}</p>
        </div>

        <div className="feature-card">
          <FaClock />
          <h3>{t("repair.feature2Title")}</h3>
          <p>{t("repair.feature2Desc")}</p>
        </div>

        <div className="feature-card">
          <FaShieldAlt />
          <h3>{t("repair.feature3Title")}</h3>
          <p>{t("repair.feature3Desc")}</p>
        </div>

      </div>

      {/* FORM POPUP */}
      {openForm && (
        <RepairOrderForm
          repair={null}
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}