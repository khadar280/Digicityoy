import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TrendingProducts.css';
import { useCart } from '../components/CartContext';
import { useTranslation } from 'react-i18next';


import coverImg from '../assets/cover.png';
import batteryImg from '../assets/battry.png';
import chargerImg from '../assets/charger2.png';
import screenProtectorImg from '../assets/suoja.png';
import proImg from '../assets/covers/12promax.jpg';
import pro1Img from '../assets/covers/13po.jpg';
import pro2Img from '../assets/covers/14.jpg';
import pro3Img from '../assets/covers/14pro.jpg';
import pro4Img from '../assets/covers/15pro.png';
import pro5Img from '../assets/covers/15promax.jpg';
import pro6Img from '../assets/covers/iphone.jpg';
import pro7Img from '../assets/covers/iphone12.jpg';
import pro8Img from '../assets/covers/12.png';
import pro9Img from '../assets/covers/p16.jpg';
import pro10Img from '../assets/covers/samsung.jpg';
import pro11Img from '../assets/covers/A15.jpg';
import pro12Img from '../assets/covers/16pr.jpg';
import pro13Img from '../assets/covers/i12.jpg';
import pro14Img from '../assets/covers/14pro.jpg';
import pro15Img from '../assets/covers/15promax.jpg';
import pro16Img from '../assets/covers/13pro.jpg';
import pro17Img from '../assets/covers/14prom.jpg';
import pro18Img from '../assets/covers/S24u.jpg';
import pro19Img from '../assets/covers/S24Black.jpg';
import pro20Img from '../assets/covers/A53.jpg';
import pro21Img from '../assets/covers/anti.jpg';
import pro22Img from '../assets/covers/blue.jpg';
import scr1Img from '../assets/screen/screen.jpg';
import scr2Img from '../assets/screen/screen2.jpg';
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

  const allProducts = [
    { name: 'Phone Covers', img: coverImg },
    { name: 'Other accessories', img: batteryImg },
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
      { id: 2, name: "iPhone 6S Cover", description: "Soft silicone case for iPhone 6S", price: "€15", image: pro6Img },
      { id: 3, name: "iPhone 7 Cover", description: "Protective case for iPhone 7", price: "€15", image: pro6Img },
      { id: 4, name: "iPhone 8 Cover", description: "Clear case for iPhone 8", price: "€15", image: pro6Img },
      { id: 5, name: "iPhone X Cover", description: "Transparent cover for iPhone X", price: "€18", image: pro7Img },
      { id: 6, name: "iPhone XR Cover", description: "TPU case for iPhone XR", price: "€18", image: pro7Img },
      { id: 7, name: "iPhone 11 Cover", description: "Protective case for iPhone 11", price: "€20", image: pro8Img },
      { id: 8, name: "iPhone 12 Cover", description: "Clear protective case for iPhone 12", price: "€20", image: pro1Img },
      { id: 9, name: "iPhone 12 Pro", description: "Premium TPU case for iPhone 12 Pro", price: "€22", image: pro1Img },
      { id: 10, name: "iPhone 12 Pro Max", description: "Anti-shock case for iPhone 12 Pro Max", price: "€22", image: proImg },
      { id: 11, name: "iPhone 13", description: "Luxury glitter MagSafe case", price: "€25", image: pro16Img },
      { id: 12, name: "iPhone 13 Pro", description: "Transparent MagSafe Pro case", price: "€25", image: pro16Img },
      { id: 13, name: "iPhone 13 Pro Max", description: "Techsuit Glitter case", price: "€25", image: pro1Img },
      { id: 14, name: "iPhone 14", description: "Vmax triangle case", price: "€28", image: pro2Img },
      { id: 15, name: "iPhone 14 Pro", description: "Chrome Mag case", price: "€30", image: pro3Img },
      { id: 16, name: "iPhone 14 Pro Max", description: "Luxury protective case", price: "€30", image: pro14Img },
      { id: 17, name: "iPhone 15", description: "Vmax triangle case", price: "€32", image: pro4Img },
      { id: 18, name: "iPhone 15 Pro", description: "Clear MagSafe case", price: "€35", image: pro15Img },
      { id: 19, name: "iPhone 15 Pro Max", description: "Premium Techsuit case", price: "€35", image: pro5Img },
      { id: 20, name: "iPhone 16", description: "Rixus TPU case", price: "€40", image: pro12Img },
      { id: 21, name: "iPhone 16 Pro", description: "Anti-drop MagSafe case", price: "€40", image: pro12Img },
      { id: 22, name: "iPhone 16 Pro Max", description: "Premium glass case", price: "€45", image: pro12Img },
      { id: 23, name: "iPhone 17", description: "Latest triangle case", price: "€50", image: pro12Img },
    ],
    'Other accessories': [
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
          {allProducts.map((item, index) => (
            <div
              className={`card card-${index}`}
              key={index}
              onClick={() => handleCategoryClick(item.name)}
            >
              <img src={item.img} alt={item.name} />
              <h3>{t(`trending.${item.name}`)}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-section">
          {searchQuery && <h3>{t('search_results_for')} "{searchQuery}"</h3>}
          {selectedCategory && !searchQuery && <h3>{t(`trending.${selectedCategory}`)}</h3>}

          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={`${product.id}-${index}`} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p>{t('trending.price')}: {product.price}</p>
                  <button onClick={() => addToCart(product)}>{t('trending.add_to_cart')}</button>
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
