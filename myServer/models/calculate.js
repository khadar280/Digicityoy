const mongoose = require('mongoose');

const calculateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inputData: { type: Object, required: true },
  result: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Calculate || mongoose.model('Calculate', calculateSchema);
