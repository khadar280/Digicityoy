import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'font-awesome/css/font-awesome.min.css';
import './HeroSection.css';
import shakurdigicity from '../assets/shakurdigicity.jpg';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <video autoPlay muted loop id="hero-video">
        <source src={shakurdigicity} type="shakurdigicity/" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-content">
        <h1>{t('hero.title')}</h1>

        

          
        </div>
    </section>
  );
};

export default HeroSection;
