

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-hours">
          <h4>{t('footer.visitingHours')}</h4>
          <p>{t('footer.weekdays')}</p>
          <p>{t('footer.weekend')}</p>
        </div>

        <div className="footer-contact">
          <h4>{t('footer.contactTitle')}</h4>
          <p>{t('footer.email')}: info@digicity.fi</p>
          <p>{t('footer.phone')}: Boss:0453418323 </p>
            <p>{t('footer.phone')}: Customer kannelmäki 0403614763</p>
            <p>{t('footer.phone')}: Customer Puhos 0403614760</p>
          <p>{t('footer.address')}: Klaneettitie 12 Helsinki 00420</p>
        </div>
<div className="footer-socials">
  <h4>{t('footer.followUs')}</h4>
  <div className="social-icons">
    <a href="https://www.tiktok.com/@digicityoy" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
    <a href="https://www.instagram.com/digicity21" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
  </div>
</div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DIGICITY. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

export default Footer;
