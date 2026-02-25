// models/laptopRequest.js
const mongoose = require('mongoose');

const laptopRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  model: { type: String },
  lang: { type: String, default: "en" },
}, { timestamps: true });

module.exports = mongoose.models.LaptopRequest || mongoose.model('LaptopRequest', laptopRequestSchema);