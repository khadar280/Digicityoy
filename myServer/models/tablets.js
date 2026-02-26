const mongoose = require('mongoose');

const tabletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  model: { type: String, default: "N/A" },
  lang: { type: String, enum: ["en", "fi"], default: "en" }
}, { timestamps: true });

module.exports = mongoose.model("TabletRequest", tabletSchema, "tablets");