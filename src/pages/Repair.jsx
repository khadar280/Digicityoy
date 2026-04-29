import { useState } from "react";
import RepairOrderForm from "../components/RepairOrderForm";
import { FaTools } from "react-icons/fa";
import "./Repair.css";

export default function Repair() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="repair-page">

      <h1 className="repair-title">Home Repair Service</h1>

    

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