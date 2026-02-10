


import React from 'react';
import './PlanningSection.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import londonImg from '../assets/passi1.jpg';

const PlanningSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="planning-section">
      <div className="planning-content">
        <button className="see-more-btn" onClick={() => navigate('/booking')}>
          {t("Book for passport photo")}
        </button>
      </div>
      <div className="planning-image">
        <img src={londonImg} alt="Passport" />
      </div>
    </section>
  );
};

export default PlanningSection;

