const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const nodemailer = require('nodemailer');

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================
// GET BOOKINGS
// ======================
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    let query = {};

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.bookingDate = { $gte: start, $lte: end };
    }

    const bookings = await Booking.find(query).sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ======================
// CREATE BOOKING
// ======================
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } = req.body;

    // Validate input
    if (!customerName || !customerEmail || !service || !bookingDate) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const date = new Date(bookingDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid bookingDate format' });
    }

    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate: date,
    });

    await newBooking.save();

    // Try sending emails, but don't crash if it fails
    try {
      // Admin email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Booking Received',
        html: `
          <h3>New Booking</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date.toLocaleString()}</p>
        `,
      });

      // Customer email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Booking Confirmed',
        html: `
          <h3>Booking Confirmed</h3>
          <p>Hi ${customerName},</p>
          <p>Your booking for <strong>${service}</strong> is confirmed.</p>
          <p>Date: ${date.toLocaleString()}</p>
          <p>See you soon!</p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({ message: 'Booking created successfully!' });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
