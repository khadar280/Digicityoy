const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');
// Email setup (Don't reinitialize this in the route again)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your app password
  },
  debug: true, // Enable logging of email sending process
});

// POST: Save contact to MongoDB and send email
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: "New Contact Submission",
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>📅 Time: ${new Date().toLocaleString()}</p>
      `,
    };

    // Actually send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response); // Log the success response
      }
    });

    // Send the success response
    res.status(201).json({ message: 'Contact saved to MongoDB and email sent!' });
  } catch (error) {
    console.error('Error saving contact and sending email:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
