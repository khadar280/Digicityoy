import React, { useState, useContext } from 'react';
import './AuthPage.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(UserContext);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'https://digicityoy-43-1ews.onrender.com';

  const handleAuth = async (e) => {
    e.preventDefault();

    const payload =
      activeTab === 'login'
        ? { email: loginEmail, password: loginPassword }
        : { name: signupName, email: signupEmail, password: signupPassword };

    const endpoint = activeTab === 'login' ? '/api/auth/signin' : '/api/auth/signup';

    try {
      const res = await axios.post(`${API_URL}${endpoint}`, payload);

      // Save to local storage and context
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setToken(res.data.token);

      toast.success(
        activeTab === 'login'
          ? t('auth.loginSuccess')
          : t('auth.signupSuccess')
      );

      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.error || t('auth.generalError'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          {t('auth.login')}
        </button>
        <button
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => setActiveTab('signup')}
        >
          {t('auth.signup')}
        </button>
      </div>

      <div className="auth-form">
        <form onSubmit={handleAuth} className="auth-form-inner">
          {activeTab === 'signup' && (
            <input
              type="text"
              placeholder={t('auth.name')}
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder={t('auth.email')}
            value={activeTab === 'login' ? loginEmail : signupEmail}
            onChange={(e) =>
              activeTab === 'login'
                ? setLoginEmail(e.target.value)
                : setSignupEmail(e.target.value)
            }
            required
          />
          <input
            type="password"
            placeholder={t('auth.password')}
            value={activeTab === 'login' ? loginPassword : signupPassword}
            onChange={(e) =>
              activeTab === 'login'
                ? setLoginPassword(e.target.value)
                : setSignupPassword(e.target.value)
            }
            required
          />
          <button type="submit">
            {activeTab === 'login' ? t('auth.login') : t('auth.signup')}
          </button>

          {activeTab === 'login' && (
            <p className="auth-forgot">
              <Link to="/forgot-password">{t('auth.forgotPassword')}</Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
