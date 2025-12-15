import React from "react";
import "./RepairDetailCard.css";

const RepairDetailCard = ({ model, prices }) => {
  return (
    <div className="repair-details">
      <h3>{model}</h3>

      <div className="repair-item">
        <span>Screen Repair</span>
        <span>{prices.screenRepair} €</span>
      </div>

      <div className="repair-item">
        <span>Battery Replacement</span>
        <span>{prices.batteryReplacement} €</span>
      </div>

      <div className="repair-item">
        <span>Back Glass Repair</span>
        <span>{prices.backRepair} €</span>
      </div>

      {prices.buttonsReplacement && (
        <div className="repair-item">
          <span>Buttons Replacement</span>
          <span>{prices.buttonsReplacement} €</span>
        </div>
      )}

      {prices.chargePortRepair && (
        <div className="repair-item">
          <span>Charging Port Repair</span>
          <span>{prices.chargePortRepair} €</span>
        </div>
      )}

      {prices.housingRepair && (
        <div className="repair-item">
          <span>Housing Replacement</span>
          <span>{prices.housingRepair} €</span>
        </div>
      )}

      {prices.BackCamera && (
        <div className="repair-item">
          <span>Back Camera Repair</span>
          <span>{prices.BackCamera} €</span>
        </div>
      )}
      {prices.FrontCamera && (
        <div className="repair-item">
          <span>Front Camera Repair</span>
          <span>{prices.FrontCamera} €</span>
        </div>
      )}
      {prices.CAMERALENS && (
        <div className="repair-item">
          <span>Camera Lens Repair</span>
          <span>{prices.CAMERALENS} €</span>
        </div>
      )}
    </div>
  );
};

export default RepairDetailCard;
