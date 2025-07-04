import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ Import for i18n
import 'font-awesome/css/font-awesome.min.css';
import './HeroSection.css';
import videoBg from '../assets/herodigi.mp4';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ translation hook

  return (
    <section className="hero-section">
      <video autoPlay muted loop id="hero-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-content">
        <h1>{t('hero.title')}</h1> {/* ✅ Translated title */}
        <div className="book-now">
          <button onClick={() => navigate('/booking')}>
            {t('hero.bookNow')} {/* ✅ Translated button */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


