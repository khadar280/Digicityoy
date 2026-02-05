import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TrendingProducts.css';
import { useCart } from '../components/CartContext';
import { useTranslation } from 'react-i18next';

// Images
import coverImg from '../assets/cover.png';
import batteryImg from '../assets/battry.png';
import chargerImg from '../assets/charger2.png';
import screenProtectorImg from '../assets/suoja.png';
import pro6Img from '../assets/covers/iphone.jpg';
import pro1Img from '../assets/covers/13po.jpg';
import pro2Img from '../assets/covers/14.jpg';
import pro3Img from '../assets/covers/14pro.jpg';
import pro4Img from '../assets/covers/15pro.png';
import pro5Img from '../assets/covers/15promax.jpg';
import pro12Img from '../assets/covers/16pr.jpg';
import lens1Img from '../assets/another/lens.jpg';
import lens2Img from '../assets/another/lens1.jpg';
import lens3Img from '../assets/another/lens2.jpg';
import magImg from '../assets/another/mag.jpg';
import mag1Img from '../assets/another/glass.jpg';
import carImg from '../assets/another/car.jpg';
import car1Img from '../assets/another/car1.jpg';
import usbImg from '../assets/another/usb.jpg';
import usb1Img from '../assets/another/usb128.jpg';
import holderImg from '../assets/another/holder.jpg';
import holder1Img from '../assets/another/holder1.jpg';
import charger1Img from '../assets/usb/usb.jpg';
import charger2Img from '../assets/usb/usb1.jpg';
import scr1Img from '../assets/screen/screen.jpg';
import scr2Img from '../assets/screen/screen2.jpg';

function ProductModal({ product, onClose }) {
  const { t } = useTranslation();
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>{t('trending.price')}: {product.price}</p>
        <button onClick={onClose}>{t('trending.close')}</button>
      </div>
    </div>
  );
}

function TrendingProducts() {
  const { addToCart } = useCart();
  const location = useLocation();
  const { t } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const categories = [
    { name: 'Phone Covers', img: coverImg },
    { name: 'Other Accessories', img: batteryImg },
    { name: 'Chargers', img: chargerImg },
    { name: 'Screen Protectors', img: screenProtectorImg },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 30;

  const productData = {
    'Phone Covers': [
      { id: 1, name: "iPhone 6 Cover", description: "Classic TPU cover for iPhone 6", price: "€15", image: pro6Img },
      { id: 2, name: "iPhone 12 Pro", description: "Premium TPU case for iPhone 12 Pro", price: "€22", image: pro1Img },
      { id: 3, name: "iPhone 15 Pro", description: "Clear MagSafe case", price: "€35", image: pro4Img },
      { id: 4, name: "iPhone 17", description: "Latest triangle case", price: "€50", image: pro12Img },
    ],
    'Other Accessories': [
      { id: 1, name: "Camera Lens iPhone 6-8", description: "HD lens for iPhone 6-8", price: "€12", image: lens1Img },
      { id: 2, name: "Camera Lens iPhone X-11", description: "HD lens for iPhone X & 11", price: "€15", image: lens2Img },
      { id: 3, name: "Camera Lens iPhone 12-14", description: "Premium lens for iPhone 12-14", price: "€18", image: lens3Img },
      { id: 4, name: "Housing iPhone 6-8", description: "Button and frame housing set", price: "€20", image: magImg },
      { id: 5, name: "Housing iPhone X-11", description: "Complete housing set", price: "€25", image: mag1Img },
      { id: 6, name: "Housing iPhone 12-14", description: "Full protective housing set", price: "€28", image: mag1Img },
      { id: 7, name: "Magnetic Car Holder", description: "Universal holder for all phones", price: "€15", image: carImg },
      { id: 8, name: "Mini Car Bracket", description: "Smart car bracket for phones", price: "€15", image: car1Img },
      { id: 9, name: "USB 65GB", description: "Fast USB storage", price: "€10", image: usbImg },
      { id: 10, name: "USB 128GB", description: "Fast USB storage", price: "€15", image: usb1Img },
      { id: 11, name: "Phone Holder", description: "Suction Pad for selfies", price: "€5", image: holderImg },
      { id: 12, name: "Phone Holder", description: "Strong suction pad", price: "€5", image: holder1Img },
    ],
    'Chargers': [
      { id: 1, name: "USB-C Charger", description: "Compatible with USB-C devices", price: "€15", image: charger1Img },
      { id: 2, name: "20W USB-C Power", description: "Apple USB-C 20W Charger with cable", price: "€25", image: charger2Img },
    ],
    'Screen Protectors': [
      { id: 1, name: "Tempered Glass iPhone 16 Pro Max", description: "Anti-scratch screen protector", price: "€15", image: scr1Img },
      { id: 2, name: "Tempered Glass iPhone X", description: "Privacy screen protector", price: "€20", image: scr2Img },
    ],
  };

  const allProductsList = Object.values(productData).flat();

  const filteredProducts = searchQuery
    ? allProductsList.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      )
    : selectedCategory
    ? productData[selectedCategory]?.slice(
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

  const handleCategoryClick = category => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleViewDetails = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="trending-products">
      {!searchQuery && !selectedCategory ? (
        <div className="cards">
          {categories.map((item, index) => (
            <div
              className={`card card-${index}`}
              key={index}
              onClick={() => handleCategoryClick(item.name)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{t(`trending.${item.name.replace(/\s/g, '_').toLowerCase()}`)}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-section">
          {searchQuery && <h3>{t('search_results_for')} "{searchQuery}"</h3>}
          {selectedCategory && !searchQuery && <h3>{t(`trending.${selectedCategory.replace(/\s/g, '_').toLowerCase()}`)}</h3>}

          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={`${product.id}-${index}`} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p>{t('trending.price')}: {product.price}</p>
                  <button onClick={() => addToCart(product)}>{t('trending.add_to_cart')}</button>
                  <button onClick={() => handleViewDetails(product)}>{t('trending.view_details')}</button>
                </div>
              ))
            ) : (
              <div className="no-products-message">
                <p>{t('trending.no_products_found')}</p>
              </div>
            )}
          </div>

          {!searchQuery && selectedCategory && (
            <div className="pagination">
              {Array.from({
                length: Math.ceil(productData[selectedCategory]?.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

          {!searchQuery && (
            <button className="back-button" onClick={() => setSelectedCategory(null)}>
              {t('trending.back')}
            </button>
          )}
        </div>
      )}

      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </section>
  );
}

export default TrendingProducts;
