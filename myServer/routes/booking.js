const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); 
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


router.get('/', async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required' });
  }

  try {
   
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      bookingDate: { $gte: start, $lte: end },
    });

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  const { customerName, customerEmail, phone, service, bookingDate, lang } = req.body;

  if (!customerName || !customerEmail || !bookingDate || !service) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
   
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      service,
      bookingDate,
    });
    await newBooking.save();


    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Booking Received',
      html: `<p>New booking from ${customerName} on ${new Date(bookingDate).toLocaleString()}</p>`,
    });

  
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Booking Confirmed',
      html: `<p>Thank you ${customerName}, your booking for ${service} on ${new Date(bookingDate).toLocaleString()} is confirmed!</p>`,
    });

    res.status(201).json({ message: 'Booking created successfully!' });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
