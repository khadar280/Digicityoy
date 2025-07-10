require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;


cors({
  origin: ['https://digicity.fi', 'https://en.digicity.fi', 'https://api.digicity.fi'],
  credentials: true
})

app.use(express.json());

// ✅ API Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/Order', require('./routes/Order'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/searchbar', require('./routes/searchbar'));
app.use('/api/laptop', require('./routes/laptop'));

// ✅ Root
app.get('/', (req, res) => {
  res.send('👋 Welcome to DigiCity API — backend is live!');
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ DB and Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
