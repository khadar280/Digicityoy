require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// -----------------------------
// Middleware
// -----------------------------
app.use(cors({
  origin: [
    'https://digicity.fi',
    'https://en.digicity.fi',
    'https://api.digicity.fi',
    'http://localhost:3000' // for local testing
  ],
  credentials: true
}));

app.use(express.json());

// -----------------------------
// Routes
// -----------------------------
const ContactRoutes = require('./routes/Contact');
const OrderRoutes = require('./routes/order');
const PaymentRoutes = require('./routes/payment');
const CheckoutRoutes = require('./routes/Checkout');
const AuthRoutes = require('./routes/auth');
const SearchbarRoutes = require('./routes/Searchbar');
const LaptopRoutes = require('./routes/Laptop');
const BookingRoutes = require('./routes/Booking'); // <--- fixed missing closing parenthesis

app.use('/api/contact', ContactRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/booking', BookingRoutes);
app.use('/api/checkout', CheckoutRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/searchbar', SearchbarRoutes);
app.use('/api/laptop', LaptopRoutes);

// -----------------------------
// Root route
// -----------------------------
app.get('/', (_req, res) => {
  res.send('👋 Welcome to DigiCity API — backend is live!');
});

// -----------------------------
// 404 handler
// -----------------------------
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});

// -----------------------------
// Global error handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// -----------------------------
// Connect to MongoDB and start server
// -----------------------------
mongoose.connect(process.env.MONGO_URI, {
  // these options are optional in Mongoose v6+
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
