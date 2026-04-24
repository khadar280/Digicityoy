import { useState } from "react";
import RepairOrderForm from "../components/RepairOrderForm";

export default function Repairs() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <h1>Repair at Home</h1>

      {/* ONLY BUTTON */}
      <button onClick={() => setOpenForm(true)}>
        Book Home Repair
      </button>

      {/* FORM POPUP */}
       {/* FORM POPUP */}
      {openForm && (
        <RepairOrderForm
          repair={null}   // no fixed repair type
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
}