

// import React, { useEffect, useState } from 'react';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError("Unauthorized. Please login.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (!res.ok) {
//           throw new Error('Failed to fetch user profile');
//         }

//         const data = await res.json();
//         setUser(data);
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) return <p>Loading profile...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
//   if (!user) return null;

//   return (
//     <div className="profile-container">
//       <h2>👤 User Profile</h2>
//       <div className="profile-card">
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
//         <p><strong>Role:</strong> {user.role}</p>
//         <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
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
