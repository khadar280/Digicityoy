

// import React, { useState } from 'react';
// import './Contact.css';
// import { useTranslation } from 'react-i18next';

// function Contact() {
//   const { t } = useTranslation();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData);
//     setSubmitted(true);
//     // You can integrate an email API or backend here
//   };


  

//   return (
//     <section id="contact" className="contact-page">
//       <h2>{t('contact.title')}</h2>
//       <p>{t('contact.subtitle')}</p>

//       {submitted ? (
//         <div className="thank-you-message">
//           <h3>{t('contact.thankYou')}</h3>
//           <p>{t('contact.response')}</p>
//         </div>
//       ) : (
//         <form className="contact-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">{t('contact.name')}</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder={t('contact.namePlaceholder')}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">{t('contact.email')}</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder={t('contact.emailPlaceholder')}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="message">{t('contact.message')}</label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder={t('contact.messagePlaceholder')}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className="submit-button">
//             {t('contact.send')}
//           </button>
//         </form>
//       )}
//     </section>
//   );
// }





import React, { useState } from 'react';
import './Contact.css';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
const API_URL = process.env.REACT_APP_API_URL || 'https://digicityoy-223.onrender.com';
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang: i18n.language }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        console.error('Server error:', errorData.error);
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error connecting to server. Please try again later.');
    }
  };

  return (
    <section id="contact" className="contact-page">
      <h2>{t('contact.title')}</h2>
      <p>{t('contact.subtitle')}</p>

      {submitted ? (
        <div className="thank-you-message">
          <h3>{t('contact.thankYou')}</h3>
          <p>{t('contact.response')}</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t('contact.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('contact.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('contact.message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {t('contact.send')}
          </button>
        </form>
      )}
    </section>
  );
};

export default Contact;
