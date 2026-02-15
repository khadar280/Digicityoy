require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: [
    'https://digicity.fi',
    'https://www.digicity.fi',     
    'https://en.digicity.fi',
    'https://api.digicity.fi',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


const ContactRoutes = require('./routes/Contact');
const OrderRoutes = require('./routes/order');
const PaymentRoutes = require('./routes/payment');
const CheckoutRoutes = require('./routes/checkout');
const AuthRoutes = require('./routes/auth');
const SearchbarRoutes = require('./routes/Searchbar');
const LaptopRoutes = require('./routes/Laptop');
const BookingRoutes = require('./routes/booking');
const CalculateRoutes = require('./routes/calculate');

app.use('/api/contact', ContactRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/booking', BookingRoutes);
app.use('/api/checkout', CheckoutRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/searchbar', SearchbarRoutes);
app.use('/api/laptop', LaptopRoutes);
app.use('/api/calculate', CalculateRoutes);

/
app.get('/', (_req, res) => {
  res.send('👋 DigiCity API is running successfully!');
});


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});


app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
