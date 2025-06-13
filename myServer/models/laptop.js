// models/laptop.js
const mongoose = require('mongoose');

// Define the schema for the tablet/laptop repair request
const laptopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: false // It's optional
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model based on the schema
const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
