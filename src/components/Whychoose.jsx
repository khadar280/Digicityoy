


import React from 'react';
import './Whychoose.css';
import { useTranslation } from 'react-i18next';

const Whychoose = () => {
  const { t } = useTranslation();

  const features = [
  
   
    {
      icon: '✅',
      title: t('why do we choose digicity'),
      description: t('whychoose.warranty.description'),
    },
  ];

  return (
    <section className="why-choose">
    
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