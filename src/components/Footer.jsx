import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();

  const socials = [
    { icon: <FaTiktok />, url: 'https://www.tiktok.com/@digicityoy' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/digicity21' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Opening Hours */}
        <div className="footer-hours">
          <h4>{t('footer.visitingHours')}</h4>
          <p>{t('footer.weekdays')}</p>
          <p>{t('footer.weekend')}</p>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h4>{t('footer.contactTitle')}</h4>
          <p>{t('footer.email')}: {t('footer.emailValue')}</p>
          <p>{t('footer.phone')}: {t('footer.phoneValue')}</p>
          <p>{t('footer.address')}: {t('footer.addressValue')}</p>
        </div>

        {/* Social Media */}
        <div className="footer-socials">
          <h4>{t('footer.followUs')}</h4>
          <div className="social-icons">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} DIGICITY. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;