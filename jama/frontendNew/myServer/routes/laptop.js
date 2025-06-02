  const express = require('express');
  const router = express.Router();
  const Laptop = require('../models/laptop');
  const nodemailer = require('nodemailer');

  // Setup nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  router.post('/', async (req, res) => {
    const { name, phone, email, model, lang } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Name, phone, and email are required.' });
    }

    try {
      // Save to MongoDB
      const newRepairRequest = new Laptop({ name, phone, email, model });
      await newRepairRequest.save();

      // ✅ Send admin notification
      await transporter.sendMail({
        from: `"Laptop Repair" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: '🛠️ New Laptop/Tablet Repair Request',
        html: `
          <h2>New Repair Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Device Model:</strong> ${model || 'Not provided'}</p>
          <p>📅 Time: ${new Date().toLocaleString()}</p>
        `,
      });

      // ✅ Define localized messages
      const messages = {
        fi: {
          subject: '✅ Kiitos huoltopyynnöstäsi',
          greeting: `Hei ${name},`,
          intro: 'Kiitos että otit yhteyttä Digicityyn!',
          body: 'Olemme vastaanottaneet laitteesi huoltopyynnön ja otamme sinuun yhteyttä pian.',
          yourDetails: 'Tarkista tietosi:',
          footer: 'Ystävällisin terveisin,<br />Digicity-tiimi',
        },
        en: {
          subject: '✅ We received your repair request',
          greeting: `Hi ${name},`,
          intro: 'Thanks for reaching out to Digicity!',
          body: 'We’ve received your request for tablet/laptop repair and will contact you shortly.',
          yourDetails: 'Your details:',
          footer: 'Best regards,<br />Digicity Team',
        }
      };

      const t = messages[lang === 'fi' ? 'fi' : 'en'];

      // ✅ Send localized confirmation email to customer
      await transporter.sendMail({
        from: `"Digicity Repair" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: t.subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <div style="text-align: center;">
              <img src="cid:digicitylogo" alt="Digicity Logo" style="height: 80px; margin-bottom: 10px;" />
            </div>
            <h2 style="color: #00aaff;">${t.greeting}</h2>
            <p>${t.intro}</p>
            <p>${t.body}</p>
            <p><strong>${t.yourDetails}</strong></p>
            <ul>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Device Model:</strong> ${model || 'Not provided'}</li>
            </ul>
            <br />
            <p>${t.footer}</p>
          </div>
        `,
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/logo.jpg',
            cid: 'digicitylogo',
          }
        ]
      });

      res.status(200).json({
        message: lang === 'fi'
          ? "Kiitos! Otamme sinuun pian yhteyttä huoltopyyntösi osalta."
          : "Thanks! We'll contact you shortly regarding your repair request.",
      });

    } catch (error) {
      console.error('Error processing repair request:', error);
      res.status(500).json({ error: 'Failed to process the repair request' });
    }
  });

  module.exports = router;
