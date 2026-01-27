import express from "express";
import Booking from "../models/booking.js";
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

  const parsedDate = new Date(bookingDate);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: "Invalid booking date" });
  }

  try {
    // 1️⃣ Save booking FIRST
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      bookingDate: parsedDate,
      service,
    });

    await newBooking.save();

    // 2️⃣ Respond immediately
    res.status(201).json({ success: true });

    // 3️⃣ Send emails in background (cannot crash API)
    const messages = {
      fi: { subject: "✅ Varaus vahvistettu", text: `Kiitos varauksestasi, ${customerName}!` },
      en: { subject: "✅ Booking Confirmed", text: `Thank you for your booking, ${customerName}!` },
    };
    const locale = lang === "fi" ? "fi" : "en";

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "📅 New Booking Request",
      html: `
        <h2>New Booking</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${parsedDate.toLocaleString()}</p>
      `,
    }).catch(err => console.error("Admin email failed:", err.message));

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: messages[locale].subject,
      html: `
        <p>${messages[locale].text}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${parsedDate.toLocaleString()}</p>
        <p>— Digicity Team</p>
      `,
    }).catch(err => console.error("Customer email failed:", err.message));

  } catch (err) {
    console.error("❌ Booking failed:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
    }
  }
});


export default router;