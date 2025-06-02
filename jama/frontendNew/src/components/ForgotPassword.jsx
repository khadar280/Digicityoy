



import React, { useState } from 'react';
import './AuthPage.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      toast.success(t('auth.resetLinkSent'));
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || t('auth.resetError'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{t('auth.forgotTitle')}</h2>
      {sent ? (
        <p className="auth-message success-message">{t('auth.checkEmail')}</p>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form-inner">
          <input type="email" placeholder={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">{t('auth.sendResetLink')}</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;

