import React from "react";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoPhonePortrait } from "react-icons/io5";
import { MdBatteryCharging20 } from "react-icons/md";
import { FaChargingStation, FaCamera, FaMobileAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./RepairDetailCard.css";

const RepairDetailCard = ({
  model,
  prices = {},
  deviceType = "phone",
  onBook,
}) => {
  const { t } = useTranslation();

  const formatPrice = (price) => {
    if (!price && price !== 0) return null;
    if (Array.isArray(price)) return `€${price[0]} - €${price[1]}`;
    return `€${price}`;
  };

  const services = [
    {
      key: "screen",
      icon: <IoIosPhonePortrait />,
      title: `${model} ${t("repair.screenTitle")}`,
      price: prices.screenRepair,
      description: t("repair.screenDesc"),
    },
    {
      key: "battery",
      icon: <MdBatteryCharging20 />,
      title: `${model} ${t("repair.batteryTitle")}`,
      price: prices.batteryReplacement,
      description: t("repair.batteryDesc"),
    },
    {
      key: "back",
      icon: <IoPhonePortrait />,
      title: `${model} ${t("repair.backTitle")}`,
      price: prices.backRepair,
      description: t("repair.backDesc"),
    },
    {
      key: "chargingPort",
      icon: <FaChargingStation />,
      title: `${model} ${t("repair.chargingPort")}`,
      price: prices.chargingPort,
      description: t("repair.chargingPortDesc"),
    },

    ...(deviceType === "iphone"
      ? [
          {
            key: "buttons",
            icon: <FaMobileAlt />,
            title: `${model} ${t("repair.buttons")}`,
            price: prices.buttons,
            description: t("repair.buttonsDesc"),
          },
          {
            key: "housing",
            icon: <IoPhonePortrait />,
            title: `${model} ${t("repair.housing")}`,
            price: prices.housing,
            description: t("repair.housingDesc"),
          },
          {
            key: "backCamera",
            icon: <FaCamera />,
            title: `${model} ${t("repair.backCamera")}`,
            price: prices.backCamera,
            description: t("repair.backCameraDesc"),
          },
          {
            key: "frontCamera",
            icon: <FaCamera />,
            title: `${model} ${t("repair.frontCamera")}`,
            price: prices.frontCamera,
            description: t("repair.frontCameraDesc"),
          },
        ]
      : []),
  ].filter((item) => item.price !== undefined && item.price !== null);

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

          <div className="repair-price">
            {formatPrice(service.price)}
          </div>

          {/* ✅ FIXED BOOK BUTTON */}
          <button
            className="book-btn"
            onClick={() => {
              if (!onBook) return;

              onBook({
                key: service.key,
                title: service.title,
                price: Array.isArray(service.price)
                  ? service.price[0]
                  : service.price,
              });
            }}
          >
            {t("repair.bookBtn")}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RepairDetailCard;