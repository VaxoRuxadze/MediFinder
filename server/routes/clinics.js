const express = require('express');
const router = express.Router();
const clinics = require('../data/clinicsData');
const doctors = require('../data/doctorsData');

// ყველა კლინიკა
router.get('/', (req, res) => {
  const { search, specialty } = req.query;
  let filtered = [...clinics];

  if (search) {
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (specialty) {
    filtered = filtered.filter(c => 
      c.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
    );
  }

  res.json(filtered);
});

// ერთი კლინიკა ID-ით + ექიმები
router.get('/:id', (req, res) => {
  const clinic = clinics.find(c => c.id === parseInt(req.params.id));
  if (!clinic) {
    return res.status(404).json({ message: 'კლინიკა ვერ მოიძებნა' });
  }

  const clinicDoctors = doctors.filter(d => d.clinicId === clinic.id);
  res.json({ ...clinic, doctors: clinicDoctors });
});

module.exports = router;