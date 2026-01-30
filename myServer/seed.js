
const mongoose = require('mongoose');
const Product = require('./models/product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB ✅');
    return Product.insertMany([
      { title: 'Nike Air Max', description: 'Running shoes', price: 120 },
      { title: 'Adidas Ultraboost', description: 'Comfortable shoes', price: 150 },
      { title: 'Apple iPhone 14', description: 'Smartphone', price: 999 },
      { title: 'Samsung Galaxy S22', description: 'Android smartphone', price: 899 },
      { title: 'MacBook Pro', description: 'Apple laptop', price: 1999 },
    ]);
  })
  .then(() => {
    console.log('Sample products inserted 🎉');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(':', err);
  });
