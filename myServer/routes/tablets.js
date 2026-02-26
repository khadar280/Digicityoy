const express = require('express');
const router = express.Router();
const TabletRequest = require('../models/tablets');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/', async (req, res) => {
  try {
    const { name, phone, email, model, lang } = req.body;
    const selectedLang = lang === "fi" ? "fi" : "en";

    const newRequest = new TabletRequest({ name, phone, email, model, lang: selectedLang });
    await newRequest.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Tablet Request (${selectedLang.toUpperCase()})`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Model: ${model || "N/A"}</p>`
    });

    res.status(201).json({ message: selectedLang === "fi" ? "Tilaus vastaanotettu!" : "Request received!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;