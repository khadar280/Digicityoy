const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/create-checkout-session', async (req, res) => {


  const { items, total, customer, deliveryMethod } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items are required for checkout' });
  }

  try {
    const lineItems = items.map((item) => {
      const unitAmount = Math.round(Number(item.price) * 100);

      if (isNaN(unitAmount)) {
        throw new Error(`Invalid unit_amount for item: ${item.name}`);
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card', 'klarna', 'sepa_debit', 'sofort', 'mobilepay'],
  mode: 'payment',
  line_items: lineItems,
  customer_email: customer?.email,
  success_url: 'http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'http://localhost:3001/cancel',
  locale: 'fi',
});


    res.json({ url: session.url });

  } catch (err) {
    console.error('❌ Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;