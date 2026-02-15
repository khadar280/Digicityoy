const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  model: { type: String, required: true },
  screen: { type: String, required: true },
  body: { type: String, required: true },
  battery: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quote", QuoteSchema);
