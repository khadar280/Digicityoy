// src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
import logo from '../assets/city.jpg';
import { useCart } from './CartContext';
import { useTranslation } from "react-i18next";
import { UserContext } from '../context/UserContext';

// Full iPhone models list
const IPHONE_MODELS = [
  "iPhone 17 Pro Max","iPhone 17 Pro","iPhone 17",
  "iPhone 16 Pro Max","iPhone 16 Pro","iPhone 16",
  "iPhone 15 Pro Max","iPhone 15 Pro","iPhone 15",
  "iPhone 14 Pro Max","iPhone 14 Pro","iPhone 14",
  "iPhone 13 Pro Max","iPhone 13 Pro","iPhone 13",
  "iPhone 12 Pro Max","iPhone 12 Pro","iPhone 12",
  "iPhone 11 Pro Max","iPhone 11 Pro","iPhone 11"
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMenuOpen(false);
    }
  };

  const handleLogoClick = () => navigate(-1);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBuyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />

      <nav className={`nav-container ${menuOpen ? 'active' : ''}`}>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><button className="buy-btn" onClick={() => setBuyDropdownOpen(!buyDropdownOpen)}>Buy iPhone ▼</button>
            {buyDropdownOpen && (
              <ul className="dropdown-menu" ref={dropdownRef}>
                {IPHONE_MODELS.map(model => (
                  <li key={model} onClick={() => {
                    navigate(`/buy-iphone?model=${encodeURIComponent(model)}`);
                    setBuyDropdownOpen(false);
                    setMenuOpen(false);
                  }}>
                    {model}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li><Link to="/" onClick={() => setMenuOpen(false)}>{t("nav.home")}</Link></li>
          <li><Link to="/destination" onClick={() => setMenuOpen(false)}>{t("nav.shop")}</Link></li>
          <li><Link to="/booking" onClick={() => setMenuOpen(false)}>{t("nav.booking")}</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>{t("nav.contact")}</Link></li>
          <li><Link to="/about-us" onClick={() => setMenuOpen(false)}>{t("nav.about")}</Link></li>

          <div className="search-bar">
            <input
              type="text"
              placeholder={t("nav.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </ul>
      </nav>

      <div className="user-controls">
        <select className="lang-select" value={language} onChange={handleLanguageChange}>
          <option value="EN">EN</option>
          <option value="FI">FI</option>
        </select>

        <Link to="/cart" className="cart-link">
          {t('nav.cart')} ({cartItems.length})
        </Link>

        <div className="user-menu-wrapper">
          <div className="user-info" onClick={() => user ? setBuyDropdownOpen(!buyDropdownOpen) : navigate('/auth')}>
            {user ? <span>{user.name}</span> : <FaUserCircle size={30} />}
          </div>
          {user && buyDropdownOpen && (
            <div className="user-dropdown-menu show">
              <Link to="/profile">Profile</Link>
              <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </div>
          )}
        </div>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Navbar;
