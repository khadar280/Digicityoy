












import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoPhonePortrait } from "react-icons/io5";
import { useCart } from "../components/CartContext";
import { MdBatteryCharging20 } from "react-icons/md";
import { useTranslation } from "react-i18next";
import "./RepairDetailCard.css";

const RepairDetailCard = ({ model, prices }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const services = [
    {
      type: "screen",
  
      icon:<IoIosPhonePortrait />,
      title: `${model} ${t("repair.screenTitle")}`,
      price: prices.screenRepair,
      description: t("repair.screenDesc"),
      warranty: "Screens: spare part screens 6 months, OLED screens 12 months.\n\nBatteries: 6 months.\n\nOther work: 12 months.\n\nCovered by warranty:\n- Touch-related issues\n- Screen flickering or other technical problems\n\nNot covered by warranty:\n- Device broken due to dropping or mechanical damage\n- Screen or frame damage\n- Liquid damage\n- Device repaired by third party\n- Screen detachment\n- Self-repaired devices\n- Loss of data during repair (backup required)\n- Software-related issues or compatibility from manufacturer updates\n- New damages unrelated to the original repair\n- Device already damaged when brought in",
      time: "1-2 Hours"
    },
    {
      type: "battery",
      icon: <MdBatteryCharging20 />,
      title: `${model} ${t("repair.batteryTitle")}`,
      price: prices.batteryReplacement,
      description: t("repair.batteryDesc"),
      warranty: " 6 months",
      time: "1-2"
    },
    {
      type: "back",
      icon: <IoPhonePortrait />,
      title: `${model} ${t("repair.backTitle")}`,
      price: prices.backRepair,
      description: t("repair.backDesc"),
      warranty: "6 months",
      time: "1-2 Hours"
    }
  ];

  const [selected, setSelected] = useState(services[0]);

  const handleBook = () => {
    addToCart({
      name: selected.title,
      price: `€${selected.price}`,
      description: selected.description,
      image: prices.image
    });
    navigate("/cart");
  };

  return (
    <div className="repair-detail-container">
      <div className="tab-buttons">
        {services.map((service) => (
          <button
            key={service.type}
            className={`tab-btn ${selected.type === service.type ? "active" : ""}`}
            onClick={() => setSelected(service)}
          >
            <span>{service.icon}</span> {t(`repair.${service.type}`)}
          </button>
        ))}
      </div>

      <div className="detail-card">
        <div className="left">
          <div className="icon">{selected.icon}</div>
          <div className="price">€{selected.price}</div>
          <button className="book-btn" onClick={handleBook}>
            {t("repair.bookBtn")}
          </button>
        </div>
        <div className="right">
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <p><strong>{t("repair.warranty")}:</strong> <span className="highlight">{selected.warranty}</span></p>
          <p><strong>{t("repair.time")}:</strong> <span className="highlight">{selected.time}</span></p>
        </div>
      </div>
    </div>
  );
};

export default RepairDetailCard;

