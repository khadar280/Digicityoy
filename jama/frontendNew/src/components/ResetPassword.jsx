



import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AuthPage.css';

const ResetPassword = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      toast.success(t('auth.resetSuccess'));
      navigate('/auth');
    } catch (err) {
      toast.error(err.response?.data?.message || t('auth.resetError'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{t('auth.resetTitle')}</h2>
      <form onSubmit={handleSubmit} className="auth-form-inner">
        <input
          type="password"
          placeholder={t('auth.newPassword')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{t('auth.changePassword')}</button>
      </form>
    </div>
  );
};

export default ResetPassword;
