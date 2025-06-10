


// ✅ CartPage.jsx – صفحه کامل سبد خرید
import React from 'react';
import { useCart } from '../components/CartContext';
import './CartPage.css';
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from 'react-router-dom';



const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + numericPrice;
  }, 0);
  const { t } = useTranslation();

  return (
    <div className="cart-page">
      <h2>{t("cart.title")}</h2>

      {cartItems.length === 0 ? (
          <p>{t("cart.empty")}</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <strong>{item.price}</strong>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item)}>
              
                ✕
              </button>
            </div>
          ))}

          <div className="cart-total">
          <p>{t("cart.total")}: <strong>{totalPrice.toFixed(2)} €</strong></p>
  <button className="checkout-btn" onClick={() => navigate('/checkout')}>
    {t("cart.checkout")}
  </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;


