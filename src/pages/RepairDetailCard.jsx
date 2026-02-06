import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoPhonePortrait } from "react-icons/io5";
import { MdBatteryCharging20 } from "react-icons/md";
import { FaCamera, FaTools, FaHome } from "react-icons/fa";
import { useCart } from "../components/CartContext";
import { useTranslation } from "react-i18next";
import "./RepairDetailCard.css";

const RepairDetailCard = ({ model, prices }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const services = [
    {
      type: "screen",
      icon: <IoIosPhonePortrait />,
      title: `${model} ${t("repair.screenTitle")}`,
      price: prices.screenRepair,
      description: t("repair.screenDesc"),
    },
    {
      type: "battery",
      icon: <MdBatteryCharging20 />,
      title: `${model} ${t("repair.batteryTitle")}`,
      price: prices.batteryReplacement,
      description: t("repair.batteryDesc"),
    },
    {
      type: "back",
      icon: <IoPhonePortrait />,
      title: `${model} ${t("repair.backTitle")}`,
      price: prices.backRepair,
      description: t("repair.backDesc"),
    },
    {
      type: "buttons",
      icon: <FaTools />,
      title: `${model} ${t("repair.buttonsTitle")}`,
      price: prices.buttons,
      description: t("repair.buttonsDesc"),
    },
    {
      type: "housing",
      icon: <FaHome />,
      title: `${model} ${t("repair.housingTitle")}`,
      price: prices.housing,
      description: t("repair.housingDesc"),
    },
    {
      type: "backCamera",
      icon: <FaCamera />,
      title: `${model} ${t("repair.backCameraTitle")}`,
      price: prices.backCamera,
      description: t("repair.backCameraDesc"),
    },
    {
      type: "frontCamera",
      icon: <FaCamera />,
      title: `${model} ${t("repair.frontCameraTitle")}`,
      price: prices.frontCamera,
      description: t("repair.frontCameraDesc"),
    },
    {
      type: "lens",
      icon: <FaCamera />,
      title: `${model} ${t("repair.lensTitle")}`,
      price: prices.lens,
      description: t("repair.lensDesc"),
    }
  ].filter(service => service.price); // 🔥 auto-hide missing ones

  const [selected, setSelected] = useState(services[0]);

  const handleBook = () => {
    addToCart({
      name: selected.title,
      price: `€${selected.price}`,
      description: selected.description,
      image: prices.image,
    });
    navigate("/cart");
  };

  return (
    <div className="repair-detail-container">
      <div className="tab-buttons">
        {services.map(service => (
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
          <p><strong>{t("repair.warranty")}:</strong> 12 months</p>
          <p><strong>{t("repair.time")}:</strong> 1–3 Hours</p>
        </div>
      </div>
    </div>
  );
};

export default RepairDetailCard;
