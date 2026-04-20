const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const nodemailer = require("nodemailer");

/* EMAIL */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* GET BOOKINGS */
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      const bookings = await Booking.find().sort({ bookingDate: 1 });
      return res.json(bookings);
    }

    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);

    const bookings = await Booking.find({
      bookingDate: { $gte: start, $lte: end },
    }).sort({ bookingDate: 1 });

    res.json(bookings);
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

/* CREATE BOOKING */
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } = req.body;

    /* VALIDATION */
    if (!customerName || !customerEmail || !service || !bookingDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const bookingDateObj = new Date(bookingDate);

    if (isNaN(bookingDateObj)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    /* WEEKEND BLOCK */
    const day = bookingDateObj.getDay();
    if (day === 0 || day === 6) {
      return res.status(400).json({ error: "Bookings are closed on weekends" });
    }

    /* BUSINESS HOURS */
    const hour = bookingDateObj.getHours();
    if (hour < 11 || hour >= 20) {
      return res.status(400).json({ error: "Booking outside business hours" });
    }

    /* SLOT CHECK */
    const start = new Date(bookingDateObj);
    const end = new Date(bookingDateObj);
    end.setMinutes(end.getMinutes() + 59);

    const exists = await Booking.findOne({
      bookingDate: { $gte: start, $lt: end },
    });

    if (exists) {
      return res.status(400).json({ error: "This time slot is already booked" });
    }

    /* SAVE BOOKING */
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate: bookingDateObj,
    });

    await newBooking.save();

    /* RESPOND FAST */
    res.status(201).json({
      message: "Booking saved",
      booking: newBooking,
    });

    /* FORMAT DATE */
    const formattedDate = bookingDateObj.toLocaleString("fi-FI", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    /* ADMIN EMAIL */
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Booking Received",
      html: `
        <h3>New Booking</h3>
        <p><b>Name:</b> ${customerName}</p>
        <p><b>Email:</b> ${customerEmail}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${formattedDate}</p>
      `,
    };

    /* CUSTOMER EMAIL */
    const customerMail = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: "Booking Confirmation",
      html: `
        <h2>Booking Confirmed ✅</h2>
        <p>Hi ${customerName},</p>
        <p>Thank you for your booking. Here are your details:</p>

        <p><b>Service:</b> ${service}</p>
        <p><b>Date:</b> ${formattedDate}</p>

        <p>If you need to change or cancel, please contact us.</p>

        <br/>
        <p>Best regards,<br/>Your Company</p>
      `,
    };

    /* SEND EMAILS IN PARALLEL */
    Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(customerMail),
    ])
      .then(() => console.log("Emails sent successfully"))
      .catch((err) => console.error("Email error:", err.message));

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;