const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [{ name: String, quantity: Number, price: Number }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

// Use existing model if already compiled, otherwise create it
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
