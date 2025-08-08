const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  service: { type: String, required: true },
  phone: { type: String },  // optional but good to have if you want to store phone
  lang: { type: String }    // optional language field
});

module.exports = mongoose.model('Booking', bookingSchema);
