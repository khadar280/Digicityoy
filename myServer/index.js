require('dotenv').config(); // Ensure environment variables are loaded first
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY ? "✅ loaded" : "❌ missing");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');  // Optional if you’re already using express.json()

// Import routes
const contactRoutes = require('./routes/contact');
const orderRoutes = require('./routes/order');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payment');
const checkoutRoutes = require('./routes/checkout');
const authRoutes = require('./routes/auth');
const searchbarRoutes = require('./routes/searchbar');
const laptopRoutes = require('./routes/laptop');


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); 
app.use('/api/contact', contactRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/booking', bookingRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/searchbar', searchbarRoutes);
app.use("/api/laptop", laptopRoutes);

// 404 Handler (for routes not found)
app.use((req, res, next) => {
  res.send('👋 Welcome to DigiCity API — backend is live!');
});
console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

app.use((err, req, res, next) => {
  console.error(err);  
  res.status(500).json({ error: 'Something went wrong!' });  
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


.then(() => {
  console.log("✅ MongoDB connected");

  app.listen(port, () => {
    console.log(`🚀 mercy is running at http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

