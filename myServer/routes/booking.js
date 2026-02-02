const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const nodemailer = require('nodemailer');

// =====================
// Email transporter
// =====================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// =====================
// GET booked times by date
// =====================
router.get('/', async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
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
    console.error('❌ Fetch bookings failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// =====================
// POST create booking
// =====================
router.post('/', async (req, res) => {
  const {
    customerName,
    customerEmail,
    phone,
    bookingDate,
    service,
    lang,
  } = req.body;

  if (!customerName || !customerEmail || !bookingDate || !service) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // -----------------
    // Save booking
    // -----------------
    const newBooking = new Booking({
      customerName,
      customerEmail,
      phone,
      bookingDate,
      service,
    });

    await newBooking.save();

    // -----------------
    // Admin email
    // -----------------
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '📅 New Booking Request',
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date & Time:</strong> ${new Date(
          bookingDate
        ).toLocaleString()}</p>
      `,
    });

    // -----------------
    // Translations
    // -----------------
    const messages = {
      fi: {
        subject: '✅ Vahvistus: Varauksesi on vastaanotettu',
        greeting: `Kiitos varauksestasi, ${customerName}!`,
        confirmation: 'Varaus Digicityyn on vahvistettu.',
        details: 'Varauksen tiedot:',
        footer:
          'Jos sinulla on kysyttävää, vastaa tähän viestiin. Nähdään pian!',
      },
      en: {
        subject: '✅ Your Booking with Digicity is Confirmed',
        greeting: `Thank you for your booking, ${customerName}!`,
        confirmation:
          'Your booking with Digicity has been successfully confirmed.',
        details: 'Booking details:',
        footer:
          'If you have any questions, just reply to this email. See you soon!',
      },
    };

    const locale = lang === 'fi' ? 'fi' : 'en';
    const t = messages[locale];

    // -----------------
    // Customer email
    // -----------------
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: t.subject,
      html: `
        <div style="font-family: Arial; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px">
          <div style="text-align:center">
            <img src="cid:digicitylogo" style="height:80px" />
            <h2 style="color:#00aaff">${t.greeting}</h2>
          </div>
          <p>${t.confirmation}</p>
          <p><strong>${t.details}</strong></p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date & Time:</strong> ${new Date(
            bookingDate
          ).toLocaleString()}</p>
          <br />
          <p>${t.footer}</p>
          <p>– Digicity Team</p>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.jpg',
          path: __dirname + '/logo.jpg', // make sure file exists
          cid: 'digicitylogo',
        },
      ],
    });

    res.status(201).json({
      message: 'Booking created and confirmation email sent',
    });
  } catch (err) {
    console.error('❌ Booking failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
