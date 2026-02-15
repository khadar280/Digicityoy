const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  specs: { type: Object },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.models.Laptop || mongoose.model('Laptop', laptopSchema);
