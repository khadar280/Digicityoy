

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TrendingProducts.css';
import { useCart } from '../components/CartContext';
import { useTranslation } from 'react-i18next';



import coverImg from '../assets/cover.png';
import batteryImg from '../assets/battry.png';
import chargerImg from '../assets/charger2.png';
// import airpodsImg from '../assets/headphon.png';
import screenProtectorImg from '../assets/suoja.png';
import proImg from '../assets/covers/12promax.jpg'
import pro1Img from '../assets/covers/13po.jpg'
import pro2Img from '../assets/covers/14.jpg'
import pro3Img from '../assets/covers/14pro.jpg'
import pro4Img from '../assets/covers/15pro.png'
import pro5Img from '../assets/covers/15promax.jpg'
import pro6Img from '../assets/covers/iphone.jpg'
import pro7Img from '../assets/covers/iphone12.jpg'
import pro8Img from '../assets/covers/12.png'
import pro9Img from '../assets/covers/p16.jpg'
import pro10Img from '../assets/covers/samsung.jpg'
import pro11Img from '../assets/covers/A15.jpg'
import pro12Img from '../assets/covers/16pr.jpg'
import pro13Img from '../assets/covers/i12.jpg'
import pro14Img from '../assets/covers/14pro.jpg'
import pro15Img from '../assets/covers/15promax.jpg'
import pro16Img from '../assets/covers/13pro.jpg'
import pro17Img from '../assets/covers/14prom.jpg'
import pro18Img from '../assets/covers/S24u.jpg'
import pro19Img from '../assets/covers/S24Black.jpg'
import pro20Img from '../assets/covers/A53.jpg'
import pro21Img from '../assets/covers/anti.jpg'
import pro22Img from '../assets/covers/blue.jpg'
import scrImg from '../assets/screen/screen1.jpg'
import scr1Img from '../assets/screen/screen.jpg'
import scr2Img from '../assets/screen/screen2.jpg'
import magImg from '../assets/another/mag.jpg'
import mag1Img from '../assets/another/glass.jpg'
import mag2Img from '../assets/another/glass.jpg'
import mag3Img from '../assets/another/glass.jpg'
import mag4Img from '../assets/another/glass.jpg'
import lensImg from '../assets/another/lens.jpg'
import lens1Img from '../assets/another/lens.jpg'
import lens2Img from '../assets/another/lens.jpg'
import lens3Img from '../assets/another/lens.jpg'
import lens4Img from '../assets/another/lens.jpg'
import lens5Img from '../assets/another/lens1.jpg'
import lens6Img from '../assets/another/lens1.jpg'
import lens7Img from '../assets/another/lens2.jpg'
import lens8Img from '../assets/another/lens2.jpg'
import lens9Img from '../assets/another/lens2.jpg'
import carImg from '../assets/another/car.jpg'
import car1Img from '../assets/another/car1.jpg'
import usbImg from '../assets/another/usb.jpg'
import usb1Img from '../assets/another/usb128.jpg'
import holderImg from '../assets/another/holder.jpg'
import holder1Img from '../assets/another/holder1.jpg'
import charger1Img from '../assets/usb/usb.jpg'
import charger2Img from '../assets/usb/usb1.jpg'




function ProductModal({ product, onClose }) {
  const { t } = useTranslation();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>{t('price')}: {product.price}</p>
        <button onClick={onClose}>{t('close')}</button>
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
    // { name: 'Headphones', img: airpodsImg },
    { name: 'Screen Protectors', img: screenProtectorImg },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 30;
  

  const productData = {
    'Phone Covers': [
      { id: 1, name: "Red iPhone Cover", description: "Anti Shock 1,5mm case for iPhone 12 Pro Max transparent", price: "€20", image: proImg },
      { id: 2, name: "Clear cover", description: "Techsuit - Luxury Glitter MagSafe - iPhone 13 Pro Max - Black", price: "€20", image: pro1Img },
      { id: 3, name: "Mag cover", description: "Glitter Chrome Mag Case For Iphone 14 Pink", price: "€20", image: pro2Img },
      { id: 4, name: "Clear cover", description: "Silicone case for iPhone 16 Plus black", price: "€20", image: pro3Img },
      { id: 5, name: "Clear cover", description: "honeycomb case for iphone 15 pro green forest", price: "€20", image: pro4Img},
      { id: 6, name: "Clear cover ", description: "vmax triangle case iphone 15 pro max", price: "€20", image: pro5Img},
      { id: 7, name: "Clear cover", description: "Iphone clear protective case", price: "€15", image: pro6Img},
      { id: 8, name: "Clear cover", description: "IPhone 12 Matcha Case Rixus", price: "€20", image: pro7Img},
      { id: 9, name: "Clear cover", description: "Rixus For iPhone 12 Soft TPU Phone Case Black", price: "€20", image: pro8Img},
      { id: 10, name: "Case iphone", description: "Halofrost Magsafe Series Iphone 16", price: "€20", image: pro9Img },
      { id: 11, name: "Case Samsung", description: "Samsung Galaxy S24 Ultra 5G Black Case", price: "€20", image: pro10Img },
      { id: 12, name: "Case Samsung", description: "Smart Magnet case for Samsung Galaxy A15 4G / A15 5G gold", price: "€20", image: pro11Img },
      { id: 13, name: "Case Iphone", description: "luxury glitter magsafe iphone 16 pro gold", price: "€20", image: pro12Img },
      { id: 14, name: "Case Iphone", description: "Iphone 12 Vmax Anti-drop Mag", price: "€20", image: pro13Img },
      { id: 15, name: "Case Iphone", description: "Vmax Triangle case for iPhone 14 Pro black", price: "€20", image: pro14Img },
      { id: 16, name: "Case Iphone", description: "Vmax Triangle case for iPhone 15 rose gold", price: "€20", image: pro15Img },
      { id: 17, name: "Case Iphone", description: "Techsuit - MagSafe Pro - iPhone 13 Pro - Transparent", price: "€20", image: pro16Img },
      { id: 18, name: "Case iphone", description: "Color Chrome Mag case for iPhone 14 Pro Max rose gold", price: "€20", image: pro17Img },  
      { id: 19, name: "Case Samsung", description: "Techsuit - SparkleSkin MagSafe Series - Samsung Galaxy S24 Ultra - Clea", price: "€20", image: pro18Img },  
      { id: 20, name: "Case Samsung", description: "Techsuit - CarbonFiber - Samsung Galaxy S24 Ultra - Black", price: "€20", image: pro19Img },
      { id: 21, name: "Case Samsungs", description: "Black&White case for Samsung Galaxy A53 5G white", price: "€20", image: pro20Img },   
      { id: 22, name: "Case Samsung", description: "Anti Shock 1,5 mm case for Samsung Galaxy S23 transparent", price: "€20", image: pro21Img },   
      { id: 23, name: "Case Iphone", description: "Satin Clear Mag case for iPhone 11 Blue", price: "€20", image: pro22Img },

    ],
    'Other accessories': [
      { id: 1, name: "Mini Phone Holder", description: "SmartPhone and Mobile Phone holder. Magnetic car mount.High quality and easy install.", price: "€10", image: magImg },
      { id: 2, name: "Camera Tempered Glass", description: " Iphone 14", price: "€15", image: mag1Img },
      { id: 3, name: "Camera Tempered Glass", description: " Iphone 14 plus", price: "€15", image: mag2Img },
      { id: 4, name: "Camera Tempered Glass", description: " Iphone 14 pro", price: "€15", image: mag3Img },
      { id: 5, name: "Camera Tempered Glass", description: " Iphone 14 pro max", price: "€15", image: mag4Img },
      { id: 6, name: "lens glasses", description: " Iphone 14", price: "€10", image: lensImg },
      { id: 7, name: "lens glasses", description: " Iphone 14 pro", price: "€10", image: lens1Img },
      { id: 8, name: "lens glasses", description: " Iphone 13", price: "€10", image: lens2Img },
      { id: 9, name: "lens glasses", description: " Iphone 13 pro", price: "€10", image: lens3Img },
      { id: 10, name: "lens glasses", description: " Iphone 13 pro max", price: "€10", image: lens4Img },
      { id: 10, name: "lens glasses", description: " Iphone 15 pro max", price: "€10", image: lens5Img },
      { id: 11, name: "lens glasses", description: " Iphone 12 pro max", price: "€10", image: lens6Img },
      { id: 11, name: "lens glasses", description: " Samsung Galaxy S23 Ultra", price: "€10", image: lens7Img },
      { id: 12, name: "lens glasses", description: " Iphone 15 pro max", price: "€10", image: lens8Img },
      { id: 13, name: "lens glasses", description: " Iphone 15 pro", price: "€10", image: lens9Img },
      { id: 14, name: " Magnetic Car Holder", description: " Maxlife holder only at Digicity", price: "€15", image: carImg },
      { id: 15, name: "Mini Car Bracket", description: "  Maxlife holder only at Digicity", price: "€15", image: car1Img },
      { id: 16, name: "Kingstom 65GB", description: "USB 65GB", price: "€10", image: usbImg },
      { id: 17, name: "Kingstom 65GB", description: "USB 128GB", price: "€10", image: usb1Img },
      { id: 18, name: "Techsuit - Phone Holder", description: "Suction Pad for Selfies", price: "€5", image: holderImg },
      { id: 19, name: "Techsuit - Phone Holder", description: "Suction Pad for Selfies", price: "€5", image: holder1Img },

    ],
    'Chargers': [
      { id: 1, name: "USB-C Charger", description: "Combatible with USB-C device", price: "€15", image: charger1Img },
      { id: 2, name: "20W USB-C Power", description: "For Apple Charger USB-C 20W with Cable Lightning 1m.", price: "€25", image: charger2Img },
    ],
    // 'Headphones': [
    //   { id: 5, name: "Wireless Earbuds", description: "Bluetooth noise cancelling", price: "€59", image: airpodsImg },
    // ],
    'Screen Protectors': [
      { id: 1, name: "Tempered Glass", description: "Anti-scratch screen protector for iphone 16pro max", price: "€15", image: scr1Img },
      { id: 2, name: "Tempered Glass", description: "Anti-scratch screen protector for iphone 16pro", price: "€15", image: scr1Img },
      { id: 3, name: "Tempered Glass", description: "Anti-scratch screen protector for iphone 16", price: "€15", image: scr1Img },
      { id: 4, name: "Tempered Glass", description: "Anti-scratch screen protector for iphone 16 mini", price: "€15", image: scr1Img },
      { id: 5, name: "Tempered Glass", description: "Anti-scratch screen protector for Samsung galaxy A53 5G", price: "€15", image: scrImg },
      { id: 6, name: "Tempered Glass", description: "Anti-scratch screen protector for Samsung galaxy A5 55G", price: "€15", image: scrImg },

      { id: 7, name: "Tempered Glass", description: "Rixus iphone privacy glass iphone 16pro max", price: "€20", image: scr2Img },
      { id: 8, name: "Tempered Glass", description: "Rixus iphone privacy glass iphone X", price: "€20", image: scr2Img },
    ],
  };


//   const allProductsList = Object.values(productData).flat();

//   const productsToShow = searchQuery
//     ? allProductsList.filter(product =>
//         product.name.toLowerCase().includes(searchQuery) ||
//         product.description.toLowerCase().includes(searchQuery)
//       )
//     : selectedCategory
//     ? productData[selectedCategory]?.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : [];


//   useEffect(() => {
//     if (searchQuery) {
//       const matchedCategory = allProducts.find(category =>
//         category.name.toLowerCase().includes(searchQuery)
//       );

//       if (matchedCategory) {
//         setSelectedCategory(matchedCategory.name);
//         setCurrentPage(1);
//       }
//     }
//   }, [searchQuery]);

//   const paginatedProducts =
//     selectedCategory && productData[selectedCategory]
//       ? productData[selectedCategory].slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         )
//       : [];

//       const filteredProducts = paginatedProducts.filter((product) => {
//         const lowerName = product.name.toLowerCase();
//         const lowerDescription = product.description.toLowerCase();



        



//         return (
//           lowerName.includes(searchQuery) ||
//           lowerDescription.includes(searchQuery)
//         );
//       });
      

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };

//   const handleViewDetails = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };



//   return (
//     <section className="trending-products">
//       {!selectedCategory ? (
//         <div className="cards">
//           {allProducts.map((item, index) => (
//             <div
//               className={`card card-${index}`}
//               key={index}
//               onClick={() => handleCategoryClick(item.name)}
//             >
//               <img src={item.img} alt={item.name} />
//               <h3>{item.name}</h3>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="product-section">

// {searchQuery && <h3>Search results for "{searchQuery}"</h3>}
// {selectedCategory && !searchQuery && <h3>{selectedCategory}</h3>}
//           {/* <h3>{selectedCategory}</h3> */}
//           <div className="product-list">
//   {filteredProducts.length > 0 ? (
//     filteredProducts.map((product) => (
//       <div key={product.id} className="product-card">
//         <img src={product.image} alt={product.name} />
//         <h4>{product.name}</h4>
//         <p>{product.description}</p>
//         <p>Price: {product.price}</p>
//         <button onClick={() => addToCart(product)}>Add to Cart</button>
//       </div>
//     ))
//   ) : (   








    
//     <div className="no-products-message">
//       <p>محصولی پیدا نشد 🛒</p>
//     </div>
//   )}
// </div> 

          

//           <div className="pagination">
//             {Array.from({
//               length: Math.ceil(productData[selectedCategory]?.length / itemsPerPage),
//             }).map((_, index) => (
//               <button
//                 key={index}
//                 className={currentPage === index + 1 ? 'active' : ''}
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>

//           <button className="back-button" onClick={() => setSelectedCategory(null)}>
//             Back
//           </button>
//         </div>
//       )}

//       {isModalOpen && selectedProduct && (
//         <ProductModal product={selectedProduct} onClose={handleCloseModal} />
//       )}
//     </section>
//   );
// }

// export default TrendingProducts;



const allProductsList = Object.values(productData).flat();

  const filteredProducts = searchQuery
    ? allProductsList.filter((product) =>
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
      setSelectedCategory(null); // سرچ فعال شد پس دسته بندی باید صفر بشه
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleViewDetails = (product) => {
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

        {!searchQuery && (
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
