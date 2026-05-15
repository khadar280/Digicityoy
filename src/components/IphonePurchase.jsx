// src/components/IphonePurchase.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./IphonePurchase.css";

/*
  Every iPhone now has REALISTIC memory sizes
  and pricing based on storage size.
*/

const IPHONE_MODELS = [
  {
    label: "iPhone 17 Pro Max",
    value: "iphone17_pro_max",
    storage: [256, 512, 1024, 2048],
  },
  {
    label: "iPhone 17 Pro",
    value: "iphone17_pro",
    storage: [256, 512, 1024],
  },
  {
    label: "iPhone 17",
    value: "iphone17",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 17 Air",
    value: "iphone17_air",
    storage: [128, 256, 512],
  },

  {
    label: "iPhone 16 Pro Max",
    value: "iphone16_pro_max",
    storage: [256, 512, 1024],
  },
  {
    label: "iPhone 16 Pro",
    value: "iphone16_pro",
    storage: [128, 256, 512, 1024],
  },
  {
    label: "iPhone 16 Plus",
    value: "iphone16_plus",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 16e",
    value: "iphone16e",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 16",
    value: "iphone16",
    storage: [128, 256, 512],
  },

  {
    label: "iPhone 15 Pro Max",
    value: "iphone15_pro_max",
    storage: [256, 512, 1024],
  },
  {
    label: "iPhone 15 Pro",
    value: "iphone15_pro",
    storage: [128, 256, 512, 1024],
  },
  {
    label: "iPhone 15 Plus",
    value: "iphone15_plus",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 15",
    value: "iphone15",
    storage: [128, 256, 512],
  },

  {
    label: "iPhone 14 Pro Max",
    value: "iphone14_pro_max",
    storage: [128, 256, 512, 1024],
  },
  {
    label: "iPhone 14 Pro",
    value: "iphone14_pro",
    storage: [128, 256, 512, 1024],
  },
  {
    label: "iPhone 14 Plus",
    value: "iphone14_plus",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 14",
    value: "iphone14",
    storage: [128, 256, 512],
  },

  {
    label: "iPhone 13 Pro Max",
    value: "iphone13_pro_max",
    storage: [128, 256, 512, 1024],
  },
  {
    label: "iPhone 13 Pro",
    value: "iphone13_pro",
    storage: [128, 256, 512, 1024],
  },
  {
    label: "iPhone 13",
    value: "iphone13",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 13 Mini",
    value: "iphone13_mini",
    storage: [128, 256, 512],
  },

  {
    label: "iPhone 12 Pro Max",
    value: "iphone12_pro_max",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 12 Pro",
    value: "iphone12_pro",
    storage: [128, 256, 512],
  },
  {
    label: "iPhone 12",
    value: "iphone12",
    storage: [64, 128, 256],
  },
  {
    label: "iPhone 12 Mini",
    value: "iphone12_mini",
    storage: [64, 128, 256],
  },

  {
    label: "iPhone 11 Pro Max",
    value: "iphone11_pro_max",
    storage: [64, 256, 512],
  },
  {
    label: "iPhone 11 Pro",
    value: "iphone11_pro",
    storage: [64, 256, 512],
  },
  {
    label: "iPhone 11",
    value: "iphone11",
    storage: [64, 128, 256],
  },
];

/*
  Base price = lowest storage model
*/

const BASE_PRICES = {
  iphone17_pro_max: 950,
  iphone17_pro: 880,
  iphone17: 820,
  iphone17_air: 790,

  iphone16_pro_max: 820,
  iphone16_pro: 780,
  iphone16_plus: 730,
  iphone16e: 680,
  iphone16: 700,

  iphone15_pro_max: 720,
  iphone15_pro: 680,
  iphone15_plus: 630,
  iphone15: 600,

  iphone14_pro_max: 550,
  iphone14_pro: 520,
  iphone14_plus: 500,
  iphone14: 470,

  iphone13_pro_max: 450,
  iphone13_pro: 430,
  iphone13: 400,
  iphone13_mini: 380,

  iphone12_pro_max: 340,
  iphone12_pro: 320,
  iphone12: 280,
  iphone12_mini: 250,

  iphone11_pro_max: 290,
  iphone11_pro: 270,
  iphone11: 230,
};

/*
  Realistic storage value increases
*/

const STORAGE_PRICE_ADJUSTMENTS = {
  64: 0,
  128: 40,
  256: 90,
  512: 170,
  1024: 300,
  2048: 450,
};

const CONDITION_ADJUSTMENTS = {
  excellent: 100,
  good: 0,
  fair: -120,
  poor: -220,
};

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://digicityoy-223.onrender.com";

export default function IphonePurchase() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialModel = params.get("model")
    ? IPHONE_MODELS.find(
        (m) => m.label === params.get("model")
      )?.value
    : "iphone17_pro_max";

  const currentInitialModel =
    IPHONE_MODELS.find(
      (m) => m.value === initialModel
    ) || IPHONE_MODELS[0];

  const [model, setModel] = useState(initialModel);

  const [storage, setStorage] = useState(
    currentInitialModel.storage[0]
  );

  const [condition, setCondition] =
    useState("good");

  const [price, setPrice] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] =
    useState(false);

  const currentModel =
    IPHONE_MODELS.find(
      (m) => m.value === model
    ) || IPHONE_MODELS[0];

  // PRICE CALCULATOR

  const calculatePrice = () => {
    let total = BASE_PRICES[model] || 0;

    total +=
      STORAGE_PRICE_ADJUSTMENTS[storage] || 0;

    total +=
      CONDITION_ADJUSTMENTS[condition] || 0;

    setPrice(total);
  };

  // HANDLE INPUTS

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT ORDER

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!price) {
      return alert(
        t("purchase.alertCalculatePrice")
      );
    }

    const orderData = {
      model: currentModel.label,
      modelValue: currentModel.value,
      storage,
      condition,
      price,
      customer,
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      setLoading(false);

      if (response.ok) {
        alert(t("purchase.orderSuccess"));

        navigate("/thank-you");
      } else {
        alert(
          result.message ||
            t("purchase.orderFailed")
        );
      }
    } catch (error) {
      console.error(error);

      setLoading(false);

      alert(t("purchase.orderFailed"));
    }
  };

  return (
    <div className="calculator">
      <h2>{t("purchase.title")}</h2>

      {/* MODEL */}

      <div className="step">
        <label>
          {t("purchase.selectModel")}
        </label>

        <select
          value={model}
          onChange={(e) => {
            const selectedModel =
              e.target.value;

            const foundModel =
              IPHONE_MODELS.find(
                (m) =>
                  m.value === selectedModel
              );

            setModel(selectedModel);

            setStorage(
              foundModel.storage[0]
            );

            setPrice(null);
          }}
        >
          {IPHONE_MODELS.map((m) => (
            <option
              key={m.value}
              value={m.value}
            >
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* STORAGE */}

      <div className="step">
        <label>
          {t("purchase.selectStorage")}
        </label>

        <select
          value={storage}
          onChange={(e) => {
            setStorage(
              parseInt(e.target.value)
            );

            setPrice(null);
          }}
        >
          {currentModel.storage.map((s) => (
            <option key={s} value={s}>
              {s} gb
            </option>
          ))}
        </select>
      </div>

      {/* CONDITION */}

      <div className="step">
        <label>
          {t("purchase.selectCondition")}
        </label>

        <select
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);

            setPrice(null);
          }}
        >
          <option value="excellent">
            {t(
              "purchase.condition.excellent"
            )}
          </option>

          <option value="good">
            {t("purchase.condition.good")}
          </option>

          <option value="fair">
            {t("purchase.condition.fair")}
          </option>

          <option value="poor">
            {t("purchase.condition.poor")}
          </option>
        </select>
      </div>

      {/* BUTTON */}

      <button
        className="price-btn"
        onClick={calculatePrice}
      >
        {t("purchase.showPrice")}
      </button>

      {/* RESULT */}

      {price !== null && (
        <div className="result">
          <p>
            {t("purchase.total")}:
            <strong> €{price}</strong>
          </p>

          <form
            className="customer-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder={t("purchase.name")}
              value={customer.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder={t(
                "purchase.email"
              )}
              value={customer.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder={t(
                "purchase.phone"
              )}
              value={customer.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder={t(
                "purchase.address"
              )}
              value={customer.address}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="buy-btn"
              disabled={loading}
            >
              {loading
                ? t(
                    "purchase.submitting"
                  )
                : t(
                    "purchase.submitOrder"
                  )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}