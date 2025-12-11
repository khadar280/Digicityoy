import React from 'react';
import './Whychoose.css';
import { useTranslation } from 'react-i18next';

const Whychoose = () => {
  const { t } = useTranslation();

  const warrantyDescription = `
${t('whychoose.warranty.period.screens')}
${t('whychoose.warranty.period.batteries')}
${t('whychoose.warranty.period.other')}

✅ ${t('whychoose.warranty.includes.touch')}
✅ ${t('whychoose.warranty.includes.flicker')}

    ${t('whychoose.warranty.excludes.drop')}
    ${t('whychoose.warranty.excludes.screenFrame')}
    ${t('whychoose.warranty.excludes.water')}
    ${t('whychoose.warranty.excludes.thirdParty')}
    ${t('whychoose.warranty.excludes.detached')}
    ${t('whychoose.warranty.excludes.selfRepair')}
    ${t('whychoose.warranty.excludes.dataLoss')}
    ${t('whychoose.warranty.excludes.software')}
    ${t('whychoose.warranty.excludes.newDamage')}
    ${t('whychoose.warranty.excludes.preExisting')}
    `;

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
      description: warrantyDescription,
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
            <p style={{ whiteSpace: 'pre-line' }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Whychoose;
