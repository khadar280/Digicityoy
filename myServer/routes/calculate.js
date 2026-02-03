const express = require("express");
const router = express.Router();
const pricing = require("../pricingRules");
const Quote = require("../models/Quote"); // Optional: MongoDB save

// POST /api/calculate
router.post("/", async (req, res) => {
  const { model, screen, body, battery } = req.body;

  if (!pricing.basePrices[model]) {
    return res.status(400).json({ error: "Invalid model" });
  }

  let price = pricing.basePrices[model];
  price -= pricing.deductions.screen[screen] || 0;
  price -= pricing.deductions.body[body] || 0;
  price -= pricing.deductions.battery[battery] || 0;

  if (price < 0) price = 0;

  // Optional: save quote to MongoDB
  try {
    const quote = new Quote({ model, screen, body, battery, price });
    await quote.save();
  } catch (err) {
    console.error("MongoDB save error:", err);
  }

  res.json({ estimatedPrice: price });
});

module.exports = router;
