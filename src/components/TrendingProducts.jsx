import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TrendingProducts.css';
import { useCart } from '../components/CartContext';
import { useTranslation } from 'react-i18next';

/* CATEGORY IMAGES */
import coverImg from '../assets/cover.png';
import batteryImg from '../assets/battry.png';
import chargerImg from '../assets/charger2.png';
import screenProtectorImg from '../assets/suoja.png';

/* PRODUCT IMAGES (keep yours) */
import proImg from '../assets/covers/12promax.jpg';
import pro1Img from '../assets/covers/13po.jpg';
import pro2Img from '../assets/covers/14.jpg';
import pro3Img from '../assets/covers/14pro.jpg';
import scr1Img from '../assets/screen/screen.jpg';
import charger1Img from '../assets/usb/usb.jpg';
import charger2Img from '../assets/usb/usb1.jpg';

/* MODAL */
function ProductModal({ product, onClose }) {
  const { t } = useTranslation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p><strong>{t('trending.price')}:</strong> {product.price}</p>
        <button onClick={onClose}>{t('trending.close')}</button>
      </div>
    </div>
  );
}

function TrendingProducts() {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const categories = [
    { name: 'Phone Covers', img: coverImg },
    { name: 'Other accessories', img: batteryImg },
    { name: 'Chargers', img: chargerImg },
    { name: 'Screen Protectors', img: screenProtectorImg },
  ];

  const productData = {
    'Phone Covers': [
      { id: 1, name: 'iPhone 12 Pro Max Cover', description: 'Anti-shock clear case', price: '€20', image: proImg },
      { id: 2, name: 'iPhone 13 Pro Max Cover', description: 'Luxury MagSafe case', price: '€20', image: pro1Img },
      { id: 3, name: 'iPhone 14 Cover', description: 'Chrome Mag case', price: '€20', image: pro2Img },
      { id: 4, name: 'iPhone 15 Pro Cover', description: 'Honeycomb protection', price: '€20', image: pro3Img },
    ],

    'Other accessories': [
      { id: 1, name: 'Camera Lens Glass', description: 'iPhone camera protection', price: '€10', image: pro2Img },
      { id: 2, name: 'Magnetic Car Holder', description: 'Universal holder', price: '€15', image: pro3Img },
    ],

    'Chargers': [
      { id: 1, name: 'USB-C Charger', description: 'Fast charging adapter', price: '€15', image: charger1Img },
      { id: 2, name: '20W Apple Charger', description: 'USB-C with cable', price: '€25', image: charger2Img },
    ],

    'Screen Protectors': [
      { id: 1, name: 'Tempered Glass', description: 'iPhone screen protection', price: '€15', image: scr1Img },
    ],
  };

  const itemsPerPage = 12;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const allProductsList = Object.values(productData).flat();

  const productsToShow = searchQuery
    ? allProductsList.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.description.toLowerCase().includes(searchQuery)
      )
    : selectedCategory
    ? productData[selectedCategory].slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  useEffect(() => {
    if (searchQuery) {
      setSelectedCategory(null);
      setCurrentPage(1);
    }
  }, [searchQuery]);

  return (
    <section className="trending-products">
      {/* CATEGORY VIEW */}
      {!searchQuery && !selectedCategory && (
        <div className="cards">
          {categories.map((cat, i) => (
            <div key={i} className="card" onClick={() => setSelectedCategory(cat.name)}>
              <img src={cat.img} alt={cat.name} />
              <h3>{t(`trending.${cat.name}`)}</h3>
            </div>
          ))}
        </div>
      )}

      {/* PRODUCT VIEW */}
      {(searchQuery || selectedCategory) && (
        <div className="product-section">
          <h3>
            {searchQuery
              ? `${t('search_results_for')} "${searchQuery}"`
              : t(`trending.${selectedCategory}`)}
          </h3>

          <div className="product-list">
            {productsToShow.length ? (
              productsToShow.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="product-desc">{product.description}</p>
                  <p className="product-price">{product.price}</p>

                  <div className="product-actions">
                    <button onClick={() => addToCart(product)}>
                      {t('trending.add')}
                    </button>
                    <button
                      className="secondary"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {t('trending.view')}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products-message">{t('trending.no_products_found')}</p>
            )}
          </div>

          {!searchQuery && (
            <button className="back-button" onClick={() => setSelectedCategory(null)}>
              {t('trending.back')}
            </button>
          )}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

export default TrendingProducts;
