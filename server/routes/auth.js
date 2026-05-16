const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secretkey123', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Registration request:', req.body);
    
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'გთხოვთ შეავსოთ ყველა ველი' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'მომხმარებელი უკვე არსებობს' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    console.log('✅ User created:', user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      registeredAt: user.registeredAt,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა: ' + error.message });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'გთხოვთ შეავსოთ ყველა ველი' });
    }

    // Get user with password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: 'არასწორი ელ.ფოსტა ან პაროლი' });
    }

    // Check password using promise
    const isMatch = await new Promise((resolve, reject) => {
      user.matchPassword(password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (!isMatch) {
      return res.status(401).json({ message: 'არასწორი ელ.ფოსტა ან პაროლი' });
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      registeredAt: user.registeredAt,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა' });
  }
});

module.exports = router;