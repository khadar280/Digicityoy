const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const nodemailer = require('nodemailer');

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
});

// GET all bookings (test endpoint)
router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// POST booking
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } = req.body;
    if (!customerName || !customerEmail || !bookingDate || !service) {
      return res.status(400).json({ error: 'All required fields are missing' });
    }
    const bookingDateObj = new Date(bookingDate);
    if (isNaN(bookingDateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid bookingDate format' });
    }

    const exists = await Booking.findOne({ bookingDate: bookingDateObj });
    if (exists) return res.status(400).json({ error: 'This time slot is already booked' });

    const newBooking = new Booking({ customerName, customerEmail, phone, service, bookingDate: bookingDateObj });
    await newBooking.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Booking',
      html: `<p>Name: ${customerName}</p><p>Email: ${customerEmail}</p><p>Phone: ${phone || 'N/A'}</p><p>Service: ${service}</p><p>Date: ${bookingDateObj.toISOString()}</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error(error);
      else console.log('Booking email sent:', info.response);
    });

    res.status(201).json({ message: 'Booking saved successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;