const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
    const { items, total, customer, deliveryMethod } = req.body;
  if (!items?.length || !customer?.email) {
    return res.status(400).json({ success: false, message: "Invalid order data" });
  }

  try {
   
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe uses cents
      currency: "eur",
      receipt_email: customer.email,
      description: "E-Commerce Order",
    });

  
    const order = new Order({ items, total, customer });
    await order.save();

   
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: "Your Order Confirmation",
        text: `Thank you ${customer.name} for your order of €${total.toFixed(2)}!
        
      Delivery Method: ${deliveryMethod}`,
      });
    res.json({
      success: true,
      message: "Payment initiated and order saved",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
