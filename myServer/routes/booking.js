const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const nodemailer = require("nodemailer");

/* ---------------- EMAIL SETUP ---------------- */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------------- GET BOOKINGS ---------------- */
/* Supports: /api/booking?date=YYYY-MM-DD */

router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      const bookings = await Booking.find().sort({ bookingDate: 1 });
      return res.json(bookings);
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const bookings = await Booking.find({
      bookingDate: {
        $gte: start,
        $lt: end,
      },
    }).sort({ bookingDate: 1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
});

/* ---------------- CREATE BOOKING ---------------- */

router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } =
      req.body;

    /* ---------- VALIDATION ---------- */

    if (!customerName || !customerEmail || !service || !bookingDate) {
      return res.status(400).json({
        error: "All required fields are missing",
      });
    }

    const bookingDateObj = new Date(bookingDate);

    if (isNaN(bookingDateObj.getTime())) {
      return res.status(400).json({
        error: "Invalid bookingDate format",
      });
    }

    /* ---------- CHECK IF SLOT EXISTS ---------- */

    const start = new Date(bookingDateObj);
    const end = new Date(bookingDateObj);
    end.setMinutes(end.getMinutes() + 59);

    const exists = await Booking.findOne({
      bookingDate: {
        $gte: start,
        $lt: end,
      },
    });

    if (exists) {
      return res.status(400).json({
        error: "This time slot is already booked",
      });
    }

    /* ---------- SAVE BOOKING ---------- */

    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate: bookingDateObj,
    });

    await newBooking.save();

    /* ---------- SEND EMAIL (SAFE) ---------- */

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Booking Received",
        html: `
          <h3>New Booking</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${bookingDateObj.toISOString()}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Booking email sent");
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
      // Email failure will NOT break booking
    }

    /* ---------- SUCCESS RESPONSE ---------- */

    res.status(201).json({
      message: "Booking saved successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);

    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
});

module.exports = router;