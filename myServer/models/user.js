const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true, // adds createdAt and updatedAt fields automatically
});

// Export the model safely to avoid OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
