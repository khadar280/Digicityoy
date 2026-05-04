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
});

// 🔍 Verify email config (helps debugging)
transporter.verify((err) => {
  if (err) {
    console.error("❌ Email config error:", err.message);
  } else {
    console.log("✅ Email server ready");
  }
});

// 🔧 POST repair request
router.post("/", async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);

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

    // ✅ Validation
    if (!name || !phone || !device || !issue) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // 💾 Save to MongoDB
    const newRepair = await Repair.create({
      name,
      phone,
      email,
      device,
      issue,
      address,
      postcode,
      city,
    });

    // 📧 Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Repair Request",
      html: `
        <h2>New Repair Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
        <p><strong>Device:</strong> ${device}</p>
        <p><strong>Issue:</strong> ${issue}</p>
        <p><strong>Address:</strong> ${address || "-"}</p>
        <p><strong>Postcode:</strong> ${postcode || "-"}</p>
        <p><strong>City:</strong> ${city || "-"}</p>
        <p>📅 Time: ${new Date().toLocaleString()}</p>
      `,
    };

    // 📤 Send email safely (won’t crash API)
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent");
    } catch (emailError) {
      console.error("❌ Email failed:", emailError.message);
    }

    return res.status(201).json({
      message: "Repair saved successfully",
      data: newRepair,
    });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;