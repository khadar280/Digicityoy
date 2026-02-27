const express = require('express');
const router = express.Router();
const Tablets = require('../models/tablets');
const nodemailer = require('nodemailer');


let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set. Emails will not be sent.");
}


router.post('/', async (req, res) => {
  try {
    console.log("✅ /api/tablets route hit");

    const { name, phone, email, model, lang } = req.body;


    if (!name || !phone || !email) {
      return res.status(400).json({ error: "Name, phone and email are required." });
    }

    const selectedLang = lang === "fi" ? "fi" : "en";

    // Save to MongoDB
    const newRequest = new Tablets({
      name,
      phone,
      email,
      model,
      lang: selectedLang,
    });

    await newRequest.save();
    console.log("💾 Saved to database");

 
    if (transporter) {
      try {
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
      } catch (mailErr) {
        console.error(" Failed to send email:", mailErr);
      }
    }

    return res.status(201).json({
      message: selectedLang === "fi" ? "Tilaus vastaanotettu!" : "Request received!",
    });
  } catch (error) {
    console.error(" Tablet request error:", error);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;