import { useState } from "react";
import { useTranslation } from "react-i18next";
import RepairOrderForm from "../components/RepairOrderForm";
import { FaTools } from "react-icons/fa";
import "./Repair.css";

export default function Repair() {
  const { t } = useTranslation();
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="repair-page">

      <h1 className="repair-title">
        {t("homeRepair.title")}
      </h1>

      <button
        className="home-repair-btn"
        onClick={() => setOpenForm(true)}
      >
        <FaTools className="btn-icon" />
        {t("homeRepair.bookNow")}
      </button>

      {openForm && (
        <RepairOrderForm onClose={() => setOpenForm(false)} />
      )}

    </div>
  );
}