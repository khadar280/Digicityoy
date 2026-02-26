const express = require('express');
const router = express.Router();
const LaptopRequest = require('../models/laptoprequest');
const nodemailer = require('nodemailer');

/* ========================
   MAIL TRANSPORTER
======================== */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ========================
   POST ROUTE
======================== */

router.post('/', async (req, res) => {
  try {
    console.log("✅ Laptop repair request route hit");

    const { name, phone, email, model, lang } = req.body;

    // Basic validation
    if (!name || !phone || !email) {
      return res.status(400).json({
        error: "Name, phone and email are required."
      });
    }

    const selectedLang = lang === "fi" ? "fi" : "en";

    // Save to database
    const newRequest = new LaptopRequest({
      name,
      phone,
      email,
      model,
      lang: selectedLang,
    });

    await newRequest.save();

    console.log("💾 Saved to database");

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Tablet/Laptop Repair Request (${selectedLang.toUpperCase()})`,
      html: `
        <h2>New Tablet/Laptop Repair Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Device Model:</strong> ${model || "N/A"}</p>
        <p><strong>Language:</strong> ${selectedLang}</p>
        <p>📅 Time: ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("📧 Email sent successfully");

    return res.status(201).json({
      message:
        selectedLang === "fi"
          ? "Tilaus vastaanotettu!"
          : "Request received!",
    });

  } catch (error) {
    console.error("❌ Laptop request error:", error);

    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
});

module.exports = router;