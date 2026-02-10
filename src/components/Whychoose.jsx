


import React from 'react';
import './Whychoose.css';
import { useTranslation } from 'react-i18next';

const Whychoose = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '❓',
      title: t('whychoose.why.title'),
      description: t('whychoose.why.description'),
    },
    {
      icon: '⚡',
      title: t('whychoose.rapid.title'),
      description: t('whychoose.rapid.description'),
    },
    {
      icon: '✅',
      title: t('whychoose.warranty.title'),
      description: t('whychoose.warranty.description'),
    },
  ];

  return (
    <section className="why-choose">
      <h2>{t('whychoose.heading')}</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Whychoose;