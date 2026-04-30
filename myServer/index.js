require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();



app.use(cors({
  origin: function (origin, callback) {

  
    if (!origin) return callback(null, true);


    if (origin === 'http://localhost:3000') {
      return callback(null, true);
    }

    // Allow all Vercel preview deployments
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

   
    if (origin.includes('digicity.fi')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

/* =============================
   MIDDLEWARE
============================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const BookingRoutes = require('./routes/booking');
const ContactRoutes = require('./routes/contact');
const OrderRoutes = require('./routes/order');
const PaymentRoutes = require('./routes/payment');
const CheckoutRoutes = require('./routes/checkout');
const AuthRoutes = require('./routes/auth');
const TabletsRoutes = require('./routes/tablets');
const CalculateRoutes = require('./routes/calculate');
const homeRepairRoutes = require('./routes/homeRepair');



app.use('/api/booking', BookingRoutes);
app.use('/api/contact', ContactRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/checkout', CheckoutRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/tablets', TabletsRoutes);
app.use('/api/calculate', CalculateRoutes);
app.use('/api/repair', homeRepairRoutes);



app.get('/', (_req, res) => {
  res.send('👋 DigiCity API is running successfully!');
});



app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});



app.use((err, req, res, next) => {
  console.error(' Server Error:', err.message || err);
  res.status(500).json({ error: 'Something went wrong!' });
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error(' MongoDB connection error:', err));



const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});