const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customerName: String,
    customerEmail: String,
    phone: String,
    service: String,
    bookingDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
