import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "./logo.png"; // adjust path if needed

export default function Navbar({ menuOpen, setMenuOpen, handleLogoClick }) {
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
      />

      <nav className={`nav-container ${menuOpen ? "active" : ""}`}>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              {t("nav.home")}
            </Link>
          </li>

          <li>
            <Link to="/destination" onClick={() => setMenuOpen(false)}>
              {t("nav.shop")}
            </Link>
          </li>

          <li>
            <Link to="/buy-iphone" onClick={() => setMenuOpen(false)}>
              {t("nav.buyIphone")}
            </Link>
          </li>

          <li>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>
              {t("nav.booking")}
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              {t("nav.contact")}
            </Link>
          </li>

          <li>
            <Link to="/about-us" onClick={() => setMenuOpen(false)}>
              {t("nav.about")}
            </Link>
          </li>

          {/* ✅ FIXED: Repair at Home */}
          <li>
            <Link to="/repair-at-home" onClick={() => setMenuOpen(false)}>
              {t("nav.repairAtHome")}
            </Link>
          </li>

        </ul>

        {/* search bar stays where you had it */}
        <div className="search-bar">
          {/* your search input */}
        </div>
      </nav>
    </header>
  );
}