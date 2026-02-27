require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/* =============================
   CORS CONFIGURATION
============================= */

const allowedOrigins = [
  'https://digicity.fi',
  'https://www.digicity.fi',
  'https://en.digicity.fi',
  'https://api.digicity.fi',
  'http://localhost:3000',
  'https://digicityoy-drnfa5dus-khadar280s-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* =============================
   MIDDLEWARE
============================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =============================
   ROUTES
============================= */

const BookingRoutes = require('./routes/booking');
const ContactRoutes = require('./routes/contact');
const OrderRoutes = require('./routes/order');
const PaymentRoutes = require('./routes/payment');
const CheckoutRoutes = require('./routes/checkout');
const AuthRoutes = require('./routes/auth');
const TabletsRoutes = require('./routes/tablets');
const CalculateRoutes = require('./routes/calculate');

app.use('/api/booking', BookingRoutes);
app.use('/api/contact', ContactRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/checkout', CheckoutRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/tablets', TabletsRoutes);
app.use('/api/calculate', CalculateRoutes);

/* =============================
   ROOT ROUTE
============================= */

app.get('/', (_req, res) => {
  res.send('👋 DigiCity API is running successfully!');
});

/* =============================
   404 HANDLER
============================= */

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});

/* =============================
   GLOBAL ERROR HANDLER
============================= */

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message || err);
  res.status(500).json({ error: 'Something went wrong!' });
});

/* =============================
   DATABASE CONNECTION
============================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

/* =============================
   START SERVER
============================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});