const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  specialization: String,
  experience: Number,
  education: String,
  achievements: String,
  rating: {
    type: Number,
    default: 0
  },
  clinicId: {
    type: Number,
    ref: 'Clinic',
    required: true
  },
  clinicName: String,
  workingHours: String,
  phone: String,
  email: String,
  image: String,
  bio: String,
  languages: [String],
  educationDetails: [String],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);