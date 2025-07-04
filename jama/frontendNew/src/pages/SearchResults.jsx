import React from "react";
import { useLocation } from "react-router-dom";
import TrendingProducts from "../components/TrendingProducts";
import Services from "../components/Services";
import IphoneRepairDetails from "../pages/IphoneRepairDetails";
import AndroidRepairDetails from "../pages/AndroidRepairDetails";
import "./SearchResults.css"; // اگر خواستی استایل جداگانه براش درست کنیم

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  if (!searchQuery) {
    return (
      <div className="search-results-container">
        <h2>🔍 Please type something to search.</h2>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <h2>🔍 Search Results for: <span style={{ color: "#0d87a5" }}>{searchQuery}</span></h2>

      {/* محصولات */}
      <section className="search-section">
        <h3>Products</h3>
        <TrendingProducts searchQuery={searchQuery} isSearchMode />
      </section>

      {/* سرویس ها */}
      {/* <section className="search-section">
        <h3>Services</h3>
        <Services searchQuery={searchQuery} isSearchMode />
      </section> */}

      {/* آیفون تعمیرات */}
      {/* <section className="search-section">
        <h3>iPhone Repairs</h3>
        <IphoneRepairDetails searchQuery={searchQuery} isSearchMode />
      </section> */}

      {/* اندروید تعمیرات */}
      {/* <section className="search-section">
        <h3>Android Repairs</h3>
        <AndroidRepairDetails searchQuery={searchQuery} isSearchMode />
      </section> */}

    </div>
  );
};

export default SearchResults;





