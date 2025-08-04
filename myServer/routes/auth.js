const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Helper to generate token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY not set in environment');
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Single unified route for both signup and signin
router.post('/', async (req, res) => {
  const { type, name, email, password } = req.body;

  if (!type || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    if (type === 'signup') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = generateToken(newUser._id);
      return res.status(201).json({
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });

    } else if (type === 'signin') {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

      const token = generateToken(user._id);
      return res.status(200).json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });

    } else {
      return res.status(400).json({ error: 'Invalid type. Must be "signup" or "signin"' });
    }
  } catch (err) {
    console.error('Auth Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
