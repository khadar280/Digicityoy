import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const API_URL = process.env.REACT_APP_API_URL || 'https://digicityoy-223.onrender.com';

const AuthPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const body =
        activeTab === 'login'
          ? {
              type: 'signin',
              email: loginEmail,
              password: loginPassword,
            }
          : {
              type: 'signup',
              name: signupName,
              email: signupEmail,
              password: signupPassword,
            };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('✅ Success:', data);
        alert(
          activeTab === 'login'
            ? t('auth.loginSuccess')
            : t('auth.signupSuccess')
        );
        // store token if needed
        localStorage.setItem('token', data.token);
      } else {
        console.error(' Auth failed:', data.error);
        alert(data.error || 'Authentication failed');
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error, please try again later');
    }
  };

  return (
    <div className="auth-container">
      {/* Tabs */}
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

      {/* Form */}
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
