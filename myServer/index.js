require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allowed origins (backend domains + frontend domains)
const allowedOrigins = [
  'https://digicity.fi',                      // main backend domain
  'https://en.digicity.fi',                   // alternate backend domain
  'https://www.digicity.vercel.app',          // frontend production (Vercel)
  'https://digicityoy-m52dhy0lm-khadar280s-projects.vercel.app' // Vercel preview deployment
];

// ✅ CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / Postman requests
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: This origin is not allowed'), false);
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Debug log to track request origins
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});

// ✅ Routes
const ContactRoutes = require('./routes/Contact');
const OrderRoutes = require('./routes/order');
const PaymentRoutes = require('./routes/payment');
const BookingRoutes = require('./routes/booking');
const CheckoutRoutes = require('./routes/checkout');
const AuthRoutes = require('./routes/auth');
const LaptopRoutes = require('./routes/laptop');

app.use('/api/contact', ContactRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/booking', BookingRoutes);
app.use('/api/checkout', CheckoutRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/laptop', LaptopRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('👋 Welcome to DigiCity API — backend is live!');
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
