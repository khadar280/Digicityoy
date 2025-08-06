// In models/order.js
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

// ✅ This prevents the OverwriteModelError:
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
