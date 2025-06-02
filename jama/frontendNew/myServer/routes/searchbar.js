const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    const query = req.query.q?.toString(); // force to string just in case
  
    if (!query) {
      return res.status(400).json({ error: 'Missing search query' });
    }
  
    try {
      const results = await Product.find({
        title: { $regex: query, $options: 'i' }
      });
      res.json(results);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: 'Search failed' });
    }
  });
module.exports = router;
