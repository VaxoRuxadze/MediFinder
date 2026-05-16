const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendBookingConfirmation } = require('../services/emailService');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'არაავტორიზებული' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey123');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'არასწორი ტოკენი' });
  }
};

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      clinicId,
      clinicName,
      clinicAddress,
      clinicPhone,
      patientName,
      patientPhone,
      date,
      time,
      notes
    } = req.body;

    // Get user details
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'მომხმარებელი ვერ მოიძებნა' });
    }

    // Check if time slot is available (simple check - no double booking)
    const existingBooking = await Booking.findOne({
      clinicId,
      date,
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'ეს დრო უკვე დაჯავშნილია. გთხოვთ აირჩიოთ სხვა დრო.' });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.userId,
      clinicId,
      clinicName,
      clinicAddress,
      clinicPhone,
      patientName,
      patientEmail: user.email,
      patientPhone,
      date,
      time,
      notes,
      status: 'confirmed'
    });

    // Send confirmation email
    await sendBookingConfirmation(booking, user);

    res.status(201).json({
      success: true,
      message: 'ვიზიტი წარმატებით დაჯავშნილია! დადასტურება გამოგზავნილია თქვენს ელ.ფოსტაზე.',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა', error: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get user's bookings
router.get('/', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.userId });
    if (!booking) {
      return res.status(404).json({ message: 'ვიზიტი ვერ მოიძებნა' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა' });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
router.put('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!booking) {
      return res.status(404).json({ message: 'ვიზიტი ვერ მოიძებნა' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'ვიზიტი უკვე გაუქმებულია' });
    }

    booking.status = 'cancelled';
    booking.updatedAt = new Date();
    await booking.save();

    res.json({ success: true, message: 'ვიზიტი წარმატებით გაუქმდა', booking });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა' });
  }
});

module.exports = router;