import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoPhonePortrait } from "react-icons/io5";
import { MdBatteryCharging20 } from "react-icons/md";
import { FaChargingStation, FaCamera, FaMobileAlt } from "react-icons/fa";
import { useCart } from "../components/CartContext";
import { useTranslation } from "react-i18next";
import "./RepairDetailCard.css";

const RepairDetailCard = ({ model, prices, deviceType = "phone" }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  /* =========================
     UNIVERSAL REPAIR SERVICES
     - Only iPhones have buttons/housing/cameras/lens
  ========================== */
  const services = [
    {
      key: "screen",
      icon: <IoIosPhonePortrait />,
      title: `${model} ${t("repair.screenTitle")}`,
      price: prices.screenRepair,
      description: t("repair.screenDesc")
    },
    {
      key: "battery",
      icon: <MdBatteryCharging20 />,
      title: `${model} ${t("repair.batteryTitle")}`,
      price: prices.batteryReplacement,
      description: t("repair.batteryDesc")
    },
    {
      key: "back",
      icon: <IoPhonePortrait />,
      title: `${model} ${t("repair.backTitle")}`,
      price: prices.backRepair,
      description: t("repair.backDesc")
    },
    {
      key: "chargingPort",
      icon: <FaChargingStation />,
      title: `${model} ${t("repair.chargingPort")}`,
      price: prices.chargingPort,
      description: t("repair.chargingPortDesc")
    },

    // iPhone-only services
    ...(deviceType === "iphone"
      ? [
          {
            key: "buttons",
            icon: <FaMobileAlt />,
            title: `${model} ${t("repair.buttons")}`,
            price: prices.buttons,
            description: t("repair.buttonsDesc")
          },
          {
            key: "housing",
            icon: <IoPhonePortrait />,
            title: `${model} ${t("repair.housing")}`,
            price: prices.housing,
            description: t("repair.housingDesc")
          },
          {
            key: "backCamera",
            icon: <FaCamera />,
            title: `${model} ${t("repair.backCamera")}`,
            price: prices.backCamera,
            description: t("repair.backCameraDesc")
          },
          {
            key: "frontCamera",
            icon: <FaCamera />,
            title: `${model} ${t("repair.frontCamera")}`,
            price: prices.frontCamera,
            description: t("repair.frontCameraDesc")
          },
          {
            key: "lens",
            icon: <FaCamera />,
            title: `${model} ${t("repair.lens")}`,
            price: prices.lens,
            description: t("repair.lensDesc")
          }
        ]
      : [])
  ].filter(item => item.price); // show only available services

  const handleBook = (service) => {
    addToCart({
      name: service.title,
      price: `€${service.price}`,
      description: service.description,
      image: prices.image,
      deviceType
    });
    navigate("/cart");
  };

  return (
    <div className="repair-list">
      {services.map((service) => (
        <div key={service.key} className="repair-item">
          <div className="repair-icon">{service.icon}</div>

          <h4 className="repair-title">{service.title}</h4>
          <p className="repair-desc">{service.description}</p>

          <div className="repair-meta">
            {t("repair.warranty")}: 12 months · {t("repair.time")}: 1–3h
          </div>

          <div className="repair-price">€{service.price}</div>

          <button
            className="book-btn"
            onClick={() => handleBook(service)}
          >
            {t("repair.bookBtn")}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RepairDetailCard;
