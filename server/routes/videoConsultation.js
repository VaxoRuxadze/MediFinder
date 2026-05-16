const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Generate Zoom meeting link (simulated - in real app use Zoom API)
router.post('/create-meeting', async (req, res) => {
  try {
    const { doctorName, patientName, date, time } = req.body;
    
    // Generate a unique meeting ID (simulated)
    const meetingId = Math.random().toString(36).substring(2, 10);
    
    // In real app, you would call Zoom API here
    const meetingLink = `https://zoom.us/j/${meetingId}`;
    
    res.json({
      success: true,
      meetingLink,
      meetingId,
      message: 'ვიდეო კონსულტაცია დაგეგმილია'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;