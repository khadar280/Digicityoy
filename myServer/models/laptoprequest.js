const mongoose = require("mongoose");

const laptopRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  model: { type: String, default: "N/A" },
  lang: { type: String, enum: ["en", "fi"], default: "en" },
}, { timestamps: true });

// Explicitly use the existing collection "laptoprequests"
module.exports = mongoose.model("LaptopRequest", laptopRequestSchema, "laptoprequests");