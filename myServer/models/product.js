const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  query: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resultsCount: { type: Number },
}, { timestamps: true });

module.exports = mongoose.models.Searchbar || mongoose.model('Searchbar', searchSchema);
