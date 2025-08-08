// In models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [Object],
  total: Number,
  customer: {
    name: String,
    email: String,
  },
  deliveryMethod: {
    type: String,
    enum: ["standard", "express", "pickup"],
    default: "standard",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
