const express = require('express');
const router = express.Router();
const doctors = require('../data/doctorsData');

// ყველა ექიმი
router.get('/', (req, res) => {
  const { search, specialty, clinicId } = req.query;
  let filtered = [...doctors];

  if (search) {
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (specialty) {
    filtered = filtered.filter(d => 
      d.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
      d.specialization.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  if (clinicId) {
    filtered = filtered.filter(d => d.clinicId === parseInt(clinicId));
  }

  res.json(filtered);
});

// ერთი ექიმი ID-ით
router.get('/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ message: 'ექიმი ვერ მოიძებნა' });
  }
});

module.exports = router;