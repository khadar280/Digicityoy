import { useState } from "react";
import RepairOrderForm from "../components/RepairOrderForm";
import { FaTools } from "react-icons/fa";
import "./Repair.css";

export default function Repair() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="repair-page">


      {/* MODERN BUTTON */}
<button
  className="home-repair-btn"
  onClick={() => setOpenForm(true)}
>
  <FaTools className="btn-icon" />
  <span>{t("homeRepair.button")}</span>
</button>
      {/* POPUP FORM */}
      {openForm && (
        <RepairOrderForm
          repair={null}
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}