const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { collection: 'contacts' }); // 👈 specify correct collection name if needed

module.exports = mongoose.model('contact', contactSchema);
