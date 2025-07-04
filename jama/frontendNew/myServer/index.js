require('dotenv').config(); // Load environment variables
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY ? "✅ loaded" : "❌ missing");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Route imports
const contactRoutes = require('./routes/contact');
const orderRoutes = require('./routes/order');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payment');
const checkoutRoutes = require('./routes/checkout');
const authRoutes = require('./routes/auth');
const searchbarRoutes = require('./routes/searchbar');
const laptopRoutes = require('./routes/laptop');

const app = express();
const PORT = process.env.PORT || 3000; // Use Render’s assigned port

// Middleware
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app'
}));
app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/searchbar', searchbarRoutes);
app.use('/api/laptop', laptopRoutes);

// ✅ Root Route - responds to browser at "/"
app.get('/', (req, res) => {
  res.send('👋 Welcome to DigiCity API — backend is live!');
});

// 404 Handler (after all routes)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found!' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // deprecated but safe
  useUnifiedTopology: true, // deprecated but safe
})
.then(() => {
  console.log("✅ MongoDB connected");

  app.listen(PORT, () => {
    console.log(`🚀 mercy is running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
