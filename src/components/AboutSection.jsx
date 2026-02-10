import React from "react";
import "./AboutSection.css";
import shakImage from "../assets/shak.jpg";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image-wrapper">
          <img src={shakImage} alt="About Digicity" />
        </div>

        <div className="about-text">
          <h2>{t("about.title")}</h2>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>

          <ul>
            <li>{t("about.list.one")}</li>
            <li>{t("about.list.two")}</li>
            <li>{t("about.list.three")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
