import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './i18n';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrendingProducts from './components/TrendingProducts';
import PlanningSection from './components/PlanningSection';
import Whychoose from './components/Whychoose';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Auth from './components/AuthPage';
import AppoinmentList from './components/AppoinmentList';
import Services from './components/Services';
import IphoneRepairDetails from './pages/IphoneRepairDetails';
import AndroidRepairDetails from './pages/AndroidRepairDetails';
import TabletLaptopRepair from './pages/TabletLaptopRepair';
import CheckoutForm from './pages/CheckoutForm';
import StripeSuccess from './pages/StripSuccess';
import KlarnaSuccess from './pages/KlarnaSuccess';
import PaymentForm from './pages/PaymentForm';
import CartPage from './pages/CartPage';
import AboutSection from './components/AboutSection';
import ProfilePage from './components/ProfilePage';
import SearchResults from './pages/SearchResults';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes where footer should be hidden
const hideFooterPaths = [
  '/checkout',
  '/payment-success/stripe',
  '/payment-success/klarna',
  '/booking',
  '/cart',
  '/profile',
  '/resetPassword',
  '/forgotpassword',
];

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Update page title
    document.title = "Digicity";

    // Notify Vercel Analytics on route change
    window.__VERCEL_ANALYTICS_HOOK__?.page();
  }, [location]);

  const showFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div className="app-container">
      <Analytics />

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Services />
              <PlanningSection />
              <Whychoose />
            </>
          }
        />
        <Route path="/trending-products" element={<TrendingProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/appointments" element={<AppoinmentList />} />
        <Route path="/iphone/:id" element={<IphoneRepairDetails />} />
        <Route path="/android/:id" element={<AndroidRepairDetails />} />
        <Route path="/tablet-laptop/:id" element={<TabletLaptopRepair />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/payment-success/stripe" element={<StripeSuccess />} />
        <Route path="/payment-success/klarna" element={<KlarnaSuccess />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>

      {showFooter && <Footer />}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

// Wrap AppRoutes with providers
const App = () => (
  <UserProvider>
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>ö
  </UserProvider>
);

export default App;
