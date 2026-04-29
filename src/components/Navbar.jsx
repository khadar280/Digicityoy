import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes, FaTools } from "react-icons/fa";
import './Navbar.css';
import logo from '../assets/city.jpg';
import { useCart } from './CartContext';
import { useTranslation } from "react-i18next";
import { UserContext } from '../context/UserContext';

const Navbar = ({ onOpenRepair }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(UserContext);

  // ✅ FIX LANGUAGE SWITCH
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
  };

  const handleUserIconClick = () => {
    if (user) setDropdownOpen(!dropdownOpen);
    else navigate('/auth');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMenuOpen(false);
    }
  };

  const handleLogoClick = () => navigate('/');

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

      {/* LOGO */}
      <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />

      {/* NAV LINKS */}
      <nav className={`nav-container ${menuOpen ? 'active' : ''}`}>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          <li><Link to="/">{t("nav.home")}</Link></li>
          <li><Link to="/destination">{t("nav.shop")}</Link></li>
          <li><Link to="/buy-iphone">{t("nav.buyIphone")}</Link></li>
          <li><Link to="/booking">{t("nav.booking")}</Link></li>
          <li><Link to="/contact">{t("nav.contact")}</Link></li>
          <li><Link to="/about-us">{t("nav.about")}</Link></li>

          {/* SEARCH */}
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

      {/* RIGHT SIDE */}
      <div className="user-controls" ref={dropdownRef}>

        {/* 🌍 LANGUAGE */}
        <select value={language} onChange={handleLanguageChange}>
          <option value="EN">EN</option>
          <option value="FI">FI</option>
        </select>

        {/* 🛒 CART */}
        <Link to="/cart">
          {t('nav.cart')} ({cartItems.length})
        </Link>

        {/* 🔧 HOME REPAIR BUTTON (NEW) */}
        <button className="repair-btn" onClick={onOpenRepair}>
          <FaTools /> {t("nav.repairAtHome")}
        </button>

        {/* USER */}
        <div onClick={handleUserIconClick}>
          {user ? (
            <>
              <FaUserCircle size={28} />
              <span>{user.name}</span>
            </>
          ) : (
            <FaUserCircle size={28} />
          )}
        </div>

        {user && dropdownOpen && (
          <div className="user-dropdown-menu">
            <Link to="/profile">{t("nav.profile")}</Link>
            <button onClick={() => { logout(); navigate('/'); }}>
              {t("nav.logout")}
            </button>
          </div>
        )}

      </div>

      {/* MOBILE */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </header>
  );
};

export default Navbar;