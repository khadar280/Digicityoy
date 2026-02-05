import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'font-awesome/css/font-awesome.min.css';
import './HeroSection.css';
import videoBg from '../assets/herodigi.mp4';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <video autoPlay muted loop id="hero-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-content">
        <h1>{t('hero.title')}</h1>

        

          <button
            className="secondary-btn"
            onClick={() => navigate('/iphone-condition-calculator')}
          >
            📱 {t('Iphone condition')}
          </button>
        </div>
    </section>
  );
};

export default HeroSection;
