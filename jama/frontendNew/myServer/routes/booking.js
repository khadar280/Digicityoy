const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const nodemailer = require('nodemailer');

// Email setup using Gmail and environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST: Create a booking and send confirmation emails
router.post('/', async (req, res) => {
  const { customerName, customerEmail, bookingDate, service, lang } = req.body;

  if (!customerName || !customerEmail || !bookingDate || !service) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save to MongoDB
    const newBooking = new Booking({
      customerName,
      customerEmail,
      bookingDate,
      service,
    });

    await newBooking.save();

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Booking Request",
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Booking Date:</strong> ${new Date(bookingDate).toLocaleString()}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p>📅 Submitted At: ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // Language-based message (EN & FI)
    const messages = {
  fi: {
    subject: '✅ Vahvistus: Varauksesi on vastaanotettu',
    greeting: `Kiitos varauksestasi, ${customerName}!`,
    confirmation: 'Varaus Digicityyn on vahvistettu.',
    details: 'Tiedot:',
    footer: 'Jos sinulla on kysyttävää, vastaa tähän viestiin. Nähdään pian!',
    regards: 'Ystävällisin terveisin,',
    team: 'Digicity-tiimi'
  },
  en: {
    subject: '✅ Your Booking with Digicity is Confirmed',
    greeting: `Thank you for your booking, ${customerName}!`,
    confirmation: 'Your booking with Digicity has been successfully confirmed.',
    details: 'Booking Details:',
    footer: 'If you have any questions, just reply to this email. We look forward to serving you!',
    regards: 'Best regards,',
    team: 'The Digicity Team'
  }
};


    const locale = lang === 'fi' ? 'fi' : 'en';
    const t = messages[locale];

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: t.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center;">
            <img src="cid:digicitylogo" alt="Digicity Logo" style="height: 80px; margin-bottom: 10px;" />
            <h2 style="color: #00aaff;">${t.greeting}</h2>
          </div>
          <p>${t.confirmation}</p>
          <p><strong>${t.details}</strong></p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date & Time:</strong> ${new Date(bookingDate).toLocaleString()}</p>
          <br />
          <p>${t.footer}</p>
          <p>– Digicity Team</p>
        </div>
      `,
      attachments: [{
        filename: 'logo.jpg',
        path: __dirname + '/logo.jpg',
        cid: 'digicitylogo'
      }]
    };

    await transporter.sendMail(customerMailOptions);

    res.status(201).json({
      message_fi: 'Varaus tallennettu ja vahvistusviesti lähetetty!',
      message_en: 'Booking created and confirmation email sent!'
    });

  } catch (err) {
    console.error('❌ Failed to create booking or send email:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
