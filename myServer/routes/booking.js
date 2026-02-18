const express = require('express');
const router = express.Router();
const Booking = require('./models/booking'); // ⚠️ lowercase filename
const nodemailer = require('nodemailer');

// Email setup (only once at top)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS, // App password
  },
  debug: true, // optional logging
});

// POST: Create a booking and send email notification
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, phone, service, bookingDate } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !bookingDate || !service) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for duplicate slot
    const exists = await Booking.findOne({ bookingDate });
    if (exists) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    // Save booking to MongoDB
    const newBooking = new Booking({ customerName, customerEmail, phone, service, bookingDate });
    await newBooking.save();

    // Prepare email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Booking',
      html: `
        <h3>New Booking Received</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${bookingDate}</p>
        <p>📅 Time: ${new Date().toLocaleString()}</p>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending booking email:', error);
        // optional: do NOT fail booking if email fails
      } else {
        console.log('Booking email sent:', info.response);
      }
    });

    // Respond success
    res.status(201).json({ message: 'Booking saved and email sent!' });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
