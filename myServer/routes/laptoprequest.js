const express = require('express');
const router = express.Router();
const LaptopRequest = require('../models/laptoprequest.js'); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  try {
    const { name, phone, email, model, lang } = req.body;

    const newRequest = new LaptopRequest({ name, phone, email, model, lang });
    await newRequest.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Tablet/Laptop Repair Request (${lang.toUpperCase()})`,
      html: `
        <h2>New Tablet/Laptop Repair Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Device Model:</strong> ${model || "N/A"}</p>
        <p><strong>Language:</strong> ${lang}</p>
        <p>📅 Time: ${new Date().toLocaleString()}</p>
      `,
    });

    res.status(201).json({ message: lang === "fi" ? "Tilaus vastaanotettu!" : "Request received!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;