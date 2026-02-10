import React from 'react';
import './Whychoose.css';
import { useTranslation } from 'react-i18next';

const Whychoose = () => {
  const { t } = useTranslation();

  // Fetch the features from i18n JSON files
  const features = t('whychoose.features', { returnObjects: true });

  // Optional: Use custom icons for each feature
  const icons = ['🔧', '⚡', '🛡️']; // Repair, Fast, Warranty

  return (
    <section className="why-choose">
      <h2>{t('whychoose.heading')}</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <span className="feature-icon">{icons[index] || '✅'}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Whychoose;
