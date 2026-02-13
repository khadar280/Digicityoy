// src/App.js
import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './i18n';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrendingProducts from './components/TrendingProducts';
import IphoneConditionCalculator from './components/IphoneConditionCalculator';
import IphonePurchase from './pages/IphonePurchase'; // make sure this path is correct
import PlanningSection from './components/PlanningSection';
import Whychoose from './components/Whychoose';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Auth from './components/AuthPage';
import AppoinmentList from './components/AppoinmentList';
import Services from './components/Services';
import AboutSection from './components/AboutSection';
import ProfilePage from './components/ProfilePage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Repair pages
import IphoneRepairDetails from './pages/IphoneRepairDetails';
import AndroidRepairDetails from './pages/AndroidRepairDetails';
import TabletLaptopRepair from './pages/TabletLaptopRepair';

// Payment/Cart pages
import CheckoutForm from './pages/CheckoutForm';
import StripeSuccess from './pages/StripSuccess';
import KlarnaSuccess from './pages/KlarnaSuccess';
import PaymentForm from './pages/PaymentForm';
import CartPage from './pages/CartPage';
import SearchResults from './pages/SearchResults';

// Context
import { CartProvider } from './components/CartContext';
import { UserProvider } from './context/UserContext';

// Toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Paths where Footer should be hidden
const hideFooterPaths = [
  '/checkout',
  '/payment-success/stripe',
  '/payment-success/klarna',
  '/booking',
  '/cart',
  '/profile',
  '/reset-password',
  '/forgot-password',
  '/iphone-condition-calculator',
];

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Digicity";
  }, [location]);

  return (
    <div className="app-container">
      <Analytics />
      {/* Navbar will appear on all pages */}
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Services />
              <IphoneConditionCalculator /> 
              <PlanningSection />
              <Whychoose />
            </>
          }
        />

        {/* iPhone purchase page */}
        <Route path="/buy-iphone" element={<IphonePurchase />} />

        {/* Contact & general pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/destination" element={<TrendingProducts />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/booking" element={<AppoinmentList />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutSection />} />

        {/* Repair pages */}
        <Route path="/iphone-repair-details" element={<IphoneRepairDetails />} />
        <Route path="/android-repair-details" element={<AndroidRepairDetails />} />
        <Route path="/tablet-laptop-repair" element={<TabletLaptopRepair />} />

        {/* Cart & Checkout */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/payment-success/stripe" element={<StripeSuccess />} />
        <Route path="/payment-success/klarna" element={<KlarnaSuccess />} />
        <Route path="/test-payment" element={<PaymentForm />} />

        {/* User pages */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

      {/* Footer hidden for specific paths */}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <AppRoutes />
          <ToastContainer />
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
