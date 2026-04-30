const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  device: String,
  issue: String,
  address: String,
  postcode: String,
  city: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Repair", repairSchema);