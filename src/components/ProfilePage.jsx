import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Loaded user from localStorage:', userData);
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <p>{t('profile.loading')}</p>;
  }

  return (
    <div className="profile-container">
      <h2>{t('profile.title')}</h2>
      <div className="profile-card">
        <p><strong>{t('profile.name')}:</strong> {user.name}</p>
        <p><strong>{t('profile.email')}:</strong> {user.email}</p>
        {user.phone && <p><strong>{t('profile.phone')}:</strong> {user.phone}</p>}
        <p><strong>{t('profile.memberSince')}:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
