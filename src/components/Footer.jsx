import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();


  const contactInfo = {
    email: 'info@digicity.fi',
    phone: '0453418323',
    address: 'Klaneettitie 12, Helsinki 00420'
  };

 
  const socials = [
    { icon: <FaTiktok />, url: 'https://www.tiktok.com/@digicityoy' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/digicity21' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">

      
        <div className="footer-hours">
          <h4>{t('footer.visitingHours', 'Opening Hours')}</h4>
          <p>{t('footer.weekdays', 'Mon - Fri: 11:00 - 20:00')}</p>
          <p>{t('footer.weekend', 'Saturday - Sunday: Closed')}</p>
        </div>

        
        <div className="footer-contact">
          <h4>{t('footer.contactTitle', 'Contact Us')}</h4>
          <p>Email: {contactInfo.email}</p>
          <p>Phone: {contactInfo.phone}</p>
          <p>Address: {contactInfo.address}</p>
        </div>

        {/* Social icons */}
        <div className="footer-socials">
          <h4>{t('footer.followUs', 'Follow Us')}</h4>
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

     
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} DIGICITY. {t('footer.rights', 'All rights reserved.')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
