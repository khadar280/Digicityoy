import { useState } from "react";
import RepairOrderForm from "../components/RepairOrderForm";

export default function Repairs() {
  const [selectedRepair, setSelectedRepair] = useState(null);

  const repairs = [
    { name: "iPhone Screen", price: 80 },
    { name: "Battery Replacement", price: 50 },
  ];

  return (
    <div>
      <h1>Repairs</h1>

      {repairs.map((r, index) => (
        <div key={index}>
          <h3>{r.name}</h3>
          <p>€{r.price}</p>

          <button onClick={() => setSelectedRepair(r)}>
            Order Home Repair
          </button>
        </div>
      ))}

      {selectedRepair && (
        <RepairOrderForm
          repair={selectedRepair}
          onClose={() => setSelectedRepair(null)}
        />
      )}
    </div>
  );
}