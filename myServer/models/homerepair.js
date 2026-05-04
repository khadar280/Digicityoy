const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  device: { type: String, required: true },
  issue: { type: String, required: true },
  address: String,
  postcode: String,
  city: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Repair", repairSchema);