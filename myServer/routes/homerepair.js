const express = require("express");
const router = express.Router();
const Repair = require("../models/homerepair");
const nodemailer = require("nodemailer");

// 📧 Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
});

// 🔧 POST repair request
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      device,
      issue,
      address,
      postcode,
      city,
    } = req.body;

    // 💾 Save to MongoDB
    const newRepair = new Repair({
      name,
      phone,
      email,
      device,
      issue,
      address,
      postcode,
      city,
    });

    await newRepair.save();

    // 📧 Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Repair Request",
      html: `
        <h2>New Repair Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Device:</strong> ${device}</p>
        <p><strong>Issue:</strong> ${issue}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Postcode:</strong> ${postcode}</p>
        <p><strong>City:</strong> ${city}</p>
        <p>📅 Time: ${new Date().toLocaleString()}</p>
      `,
    };

    // 📤 Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      message: "Repair saved and email sent!",
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;