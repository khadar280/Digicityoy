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

router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !bookingDate || !service) {
      return res.status(400).json({ error: 'All required fields are missing' });
    }

    // Convert bookingDate to Date object
    const bookingDateObj = new Date(bookingDate);
    if (isNaN(bookingDateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid bookingDate format' });
    }

    // Check for duplicate slot
    const exists = await Booking.findOne({ bookingDate: bookingDateObj });
    if (exists) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    // Save booking
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate: bookingDateObj,
    });
    await newBooking.save();

    // Send email (won't break booking if fails)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Booking',
      html: `
        <h3>New Booking Received</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${bookingDateObj.toISOString()}</p>
        <p>📅 Received at: ${new Date().toLocaleString()}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error('Error sending booking email:', error);
      else console.log('Booking email sent:', info.response);
    });

    res.status(201).json({ message: 'Booking saved successfully!' });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;