import express from "express";
import Booking from "../models/Booking.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ================= EMAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// ================= GET BOOKED TIMES =================
router.get("/", async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Date is required" });

  try {
    const bookings = await Booking.find({
      bookingDate: {
        $gte: new Date(`${date}T00:00:00`),
        $lt: new Date(`${date}T23:59:59`),
      },
    });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Fetch bookings failed:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// ================= CREATE BOOKING =================
router.post("/", async (req, res) => {
  const { customerName, customerEmail, phone, bookingDate, service, lang } = req.body;

  if (!customerName || !customerEmail || !bookingDate || !service) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      bookingDate: new Date(bookingDate),
      service,
    });

    await newBooking.save();

    // Admin notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "📅 New Booking Request",
      html: `
        <h2>New Booking</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${new Date(bookingDate).toLocaleString()}</p>
      `,
    });

    // Customer confirmation
    const messages = {
      fi: { subject: "✅ Varaus vahvistettu", text: `Kiitos varauksestasi, ${customerName}!` },
      en: { subject: "✅ Booking Confirmed", text: `Thank you for your booking, ${customerName}!` },
    };
    const locale = lang === "fi" ? "fi" : "en";

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: messages[locale].subject,
      html: `
        <p>${messages[locale].text}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${new Date(bookingDate).toLocaleString()}</p>
        <p>— Digicity Team</p>
      `,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("❌ Booking failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;