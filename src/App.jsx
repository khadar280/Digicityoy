// src/App.jsx
import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./i18n";

// Components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingProducts from "./components/TrendingProducts";
import IphoneConditionCalculator from "./components/IphoneConditionCalculator";
import IphonePurchase from "./components/IphonePurchase";
import RepairOrderForm from "./components/RepairOrderForm";
import Whychoose from "./components/Whychoose";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Auth from "./components/AuthPage";
import AppoinmentList from "./components/AppoinmentList";
import Services from "./components/Services";
import AboutSection from "./components/AboutSection";
import ProfilePage from "./components/ProfilePage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import IphoneRepairDetails from "./pages/IphoneRepairDetails";
import AndroidRepairDetails from "./pages/AndroidRepairDetails";
import TabletLaptopRepair from "./pages/TabletLaptopRepair";
import CheckoutForm from "./pages/CheckoutForm";
import StripeSuccess from "./pages/StripSuccess";
import KlarnaSuccess from "./pages/KlarnaSuccess";
import PaymentForm from "./pages/PaymentForm";
import CartPage from "./pages/CartPage";
import SearchResults from "./pages/SearchResults";

import { CartProvider } from "./components/CartContext";
import { UserProvider } from "./context/UserContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Hide footer on these routes
const hideFooterPaths = [
  "/checkout",
  "/payment-success/stripe",
  "/payment-success/klarna",
  "/booking",
  "/cart",
  "/profile",
  "/reset-password",
  "/forgot-password",
];

// ✅ Hide navbar on these routes
const hideNavbarPaths = [
  "/booking",
  "/checkout",
  "/payment-success/stripe",
  "/payment-success/klarna",
  "/cart",
  "/profile",
  "/reset-password",
  "/forgot-password",
];

const AppRoutes = () => {
  const location = useLocation();
  const [openRepair, setOpenRepair] = useState(false);

  useEffect(() => {
    document.title = "Digicity";
  }, [location]);

  return (
    <>
      {/* ✅ NAVBAR (conditionally hidden) */}
      {!hideNavbarPaths.includes(location.pathname) && (
        <Navbar onOpenRepair={() => setOpenRepair(true)} />
      )}

      {/* ✅ GLOBAL REPAIR MODAL */}
      {openRepair && (
        <RepairOrderForm onClose={() => setOpenRepair(false)} />
      )}

      <div className="app-container">
        <Analytics />

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Services />
                <IphoneConditionCalculator />
                <Whychoose />
              </>
            }
          />

          {/* MAIN */}
          <Route path="/buy-iphone" element={<IphonePurchase />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destination" element={<TrendingProducts />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/booking" element={<AppoinmentList />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutSection />} />

          {/* REPAIR DETAILS */}
          <Route path="/iphone-repair-details" element={<IphoneRepairDetails />} />
          <Route path="/android-repair-details" element={<AndroidRepairDetails />} />
          <Route path="/tablet-laptop-repair" element={<TabletLaptopRepair />} />

          {/* SHOP */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutForm />} />

          {/* PAYMENTS */}
          <Route path="/payment-success/stripe" element={<StripeSuccess />} />
          <Route path="/payment-success/klarna" element={<KlarnaSuccess />} />
          <Route path="/test-payment" element={<PaymentForm />} />

          {/* USER */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>

        {/* ✅ FOOTER */}
        {!hideFooterPaths.includes(location.pathname) && <Footer />}
      </div>
    </>
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