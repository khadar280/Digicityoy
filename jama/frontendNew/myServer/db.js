const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: true 
  },
  customerEmail: { 
    type: String, 
    required: true, 
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ 
  },
  bookingDate: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function(v) {
        return v > Date.now(); // Ensure booking date is in the future
      },
      message: 'Booking date must be in the future.'
    }
  },
  service: { 
    type: String, 
    required: true, 
    enum: ['Haircut', 'Massage', 'Facial', 'Manicure'] // Example services
  }
}, { timestamps: true });

bookingSchema.index({ customerEmail: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
