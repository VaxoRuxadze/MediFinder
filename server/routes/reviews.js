const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');
const Doctor = require('../models/Doctor');

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

// @route   POST /api/reviews
// @desc    Add a review
router.post('/', verifyToken, async (req, res) => {
  try {
    const { doctorId, rating, comment, userName } = req.body;

    const review = await Review.create({
      userId: req.userId,
      doctorId,
      userName,
      rating,
      comment,
      isApproved: false
    });

    // Update doctor's average rating
    const doctorReviews = await Review.find({ doctorId, isApproved: true });
    const avgRating = doctorReviews.reduce((sum, r) => sum + r.rating, 0) / doctorReviews.length;
    await Doctor.findOneAndUpdate({ id: doctorId }, { rating: avgRating.toFixed(1) });

    res.status(201).json(review);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა' });
  }
});

// @route   GET /api/reviews/:doctorId
// @desc    Get reviews for a doctor
router.get('/:doctorId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      doctorId: parseInt(req.params.doctorId),
      isApproved: true 
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'სერვერის შეცდომა' });
  }
});

module.exports = router;