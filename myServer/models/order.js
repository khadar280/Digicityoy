const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  model: { type: String, required: true },
  storage: { type: Number, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);