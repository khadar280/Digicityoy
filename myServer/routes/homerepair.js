const express = require("express");
const router = express.Router();
const Repair = require("../models/homerepair");
const nodemailer = require("nodemailer");

/* =========================
   EMAIL SETUP
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* Optional debug (safe in dev) */
transporter.verify((err) => {
  if (err) {
    console.error("❌ Email config error:", err.message);
  } else {
    console.log("✅ Email server ready");
  }
});

/* =========================
   POST REPAIR REQUEST
========================= */
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

    /* VALIDATION */
    if (!name || !phone || !email || !device || !issue) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    /* SAVE TO DATABASE */
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

    /* =========================
       EMAIL TEMPLATES
    ========================= */

    // ADMIN EMAIL
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🔧 New Repair Request",
      html: `
        <h2>New Repair Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Device:</b> ${device}</p>
        <p><b>Issue:</b> ${issue}</p>
        <p><b>Address:</b> ${address || "-"}</p>
        <p><b>Postcode:</b> ${postcode || "-"}</p>
        <p><b>City:</b> ${city || "-"}</p>
        <p><b>Time:</b> ${new Date().toLocaleString()}</p>
      `,
    };

    // CUSTOMER EMAIL
    const customerMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ We received your repair request",
      html: `
        <h2>Thank you for your request!</h2>
        <p>Hi ${name},</p>

        <p>We have received your repair request and will contact you soon.</p>

        <h3>Request details:</h3>
        <p><b>Device:</b> ${device}</p>
        <p><b>Issue:</b> ${issue}</p>

        <br/>
        <p>Best regards,<br/><b>Digicity Team</b></p>
      `,
    };

    /* =========================
       SEND EMAILS (NON-BLOCKING)
    ========================= */
    Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(customerMail),
    ])
      .then(() => console.log("📧 Emails sent successfully"))
      .catch((err) => console.error("❌ Email error:", err.message));

    /* RESPONSE FIRST (IMPORTANT) */
    return res.status(201).json({
      message: "Repair request submitted successfully",
      data: newRepair,
    });

  } catch (error) {
    console.error("🔥 REPAIR ERROR:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;