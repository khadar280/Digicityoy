const express = require('express');
const router = express.Router();
const Order = require('../models/order.js');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// GET all orders
router.get('/', async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ createdAt: -1 });
    res.json(allOrders);
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

// POST new order
router.post('/', async (req, res) => {
  const { model, storage, condition, price, customer } = req.body;

  if (!model || !storage || !condition || !price || !customer || !customer.name || !customer.email || !customer.phone || !customer.address) {
    return res.status(400).json({ message: 'Puuttuvia tietoja tilauksessa' });
  }

  try {
    const newOrder = new Order({ model, storage, condition, price, customer });
    await newOrder.save();

    // Send Gmail notification
    const mailOptions = {
      from: `"iPhone Store" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `New iPhone Order / Uusi iPhone-tilaus`,
      html: `
        <h3>New Order Received / Uusi tilaus vastaanotettu</h3>
        <p><strong>Name / Nimi:</strong> ${customer.name}</p>
        <p><strong>Email / Sähköposti:</strong> ${customer.email}</p>
        <p><strong>Phone / Puhelin:</strong> ${customer.phone}</p>
        <p><strong>Address / Osoite:</strong> ${customer.address}</p>
        <p><strong>Model / Malli:</strong> ${model}</p>
        <p><strong>Storage / Tallennustila:</strong> ${storage} GB</p>
        <p><strong>Condition / Kunto:</strong> ${condition}</p>
        <p><strong>Price / Hinta:</strong> €${price}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email send failed:', error);
      } else {
        console.log('✅ Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Tilaus tallennettu onnistuneesti / Order saved successfully', order: newOrder });
  } catch (err) {
    console.error('❌ Failed to save order:', err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

module.exports = router;