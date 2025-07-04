




import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { useTranslation } from 'react-i18next';
import iphone from '../assets/korjaus.png';
import android from '../assets/korjaus1.png';
import laptop from '../assets/taplet1.png';










const Services = () => {
  const { t } = useTranslation();

  return (
    <section className="services" id="services">
      <h2>{t('services.title')}</h2>
      <p className="services-intro">{t('services.intro')}</p>

      <div className="services-list">
        <div className="service-card iphone">
          <div className="icon-wrapper">
            <img src={iphone} alt="iPhone Repair" />
          </div>
          <h3>{t('services.iphone.title')}</h3>
          <p>{t('services.iphone.description')}</p>
          <Link to="/iphone-repair-details" className="details-button">
            {t('services.iphone.button')}
          </Link>
        </div>

        <div className="service-card android">
          <div className="icon-wrapper">
            <img src={android} alt="Android Repair" />
          </div>
          <h3>{t('services.android.title')}</h3>
          <p>{t('services.android.description')}</p>
          <Link to="/android-repair-details" className="details-button">
            {t('services.android.button')}
          </Link>
        </div>

        <div className="service-card tablet">
          <div className="icon-wrapper">
            <img src={laptop} alt="Tablet & Laptop Repair" />
          </div>
          <h3>{t('services.tablet.title')}</h3>
          <p>{t('services.tablet.description')}</p>
          <Link to="/tablet-laptop-repair" className="details-button">
            {t('services.tablet.button')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;

