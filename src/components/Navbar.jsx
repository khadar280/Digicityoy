import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import logo from '../assets/city.jpg';
import { useCart } from './CartContext';
import { useTranslation } from "react-i18next";
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(UserContext);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value.toLowerCase();
    setLanguage(e.target.value);
    i18n.changeLanguage(newLang);
  };

  const handleUserIconClick = () => {
    if (user) {
      setDropdownOpen(!dropdownOpen);
    } else {
      navigate('/auth');
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMenuOpen(false);
    }
  };

  const handleLogoClick = () => navigate(-1);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      {/* Logo */}
      <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />

      {/* Navigation links */}
      <nav className={`nav-container ${menuOpen ? 'active' : ''}`}>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>{t("nav.home")}</Link></li>
          <li><Link to="/destination" onClick={() => setMenuOpen(false)}>{t("nav.shop")}</Link></li>
          <li><Link to="/booking" onClick={() => setMenuOpen(false)}>{t("nav.booking")}</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>{t("nav.contact")}</Link></li>
          <li><Link to="/about-us" onClick={() => setMenuOpen(false)}>{t("nav.about")}</Link></li>

          <div className="search-bar">
            <input
              type="text"
              placeholder={t("nav.search")}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </ul>
      </nav>

      {/* Right side controls */}
      <div className="user-controls" ref={dropdownRef}>
        <select className="lang-select" value={language} onChange={handleLanguageChange}>
          <option value="EN">EN</option>
          <option value="FI">FI</option>
        </select>

        <Link to="/cart" className="cart-link">
          🛒 {t('nav.cart')} ({cartItems.length})
        </Link>

        <div className="user-menu-wrapper">
          <div className="user-info" onClick={handleUserIconClick}>
            {user ? (
              <>
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="user-avatar" />
                ) : (
                  <FaUserCircle size={30} className="user-icon" />
                )}
                <span className="user-name">{user.name}</span>
              </>
            ) : (
              <FaUserCircle size={30} className="user-icon" />
            )}
          </div>

          <div className={`user-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            {user && (
              <>
                <Link to="/profile" className="dropdown-item">{t("nav.profile")}</Link>
                <button
                  className="dropdown-item logout"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  {t("nav.logout")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu toggle */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Navbar;
