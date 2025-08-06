const express = require('express');
const router = express.Router();
const Order = require('../models/order');
router.get('/', async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.json(allOrders);
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err);
    res.status(500).json({ message: 'Palvelinvirhe' }); // Server error in Finnish
  }
});


router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Tilaus tallennettu onnistuneesti' }); // Order saved successfully
  } catch (err) {
    console.error('❌ Failed to save order:', err);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

module.exports = router;
