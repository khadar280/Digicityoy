const express = require('express');
const router = express.Router();
const Order = require('../models/order.js');

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
    res.status(201).json({ message: 'Tilaus tallennettu onnistuneesti', order: newOrder });
  } catch (err) {
    console.error('❌ Failed to save order:', err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

module.exports = router;