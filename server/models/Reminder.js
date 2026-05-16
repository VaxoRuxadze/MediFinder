const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;
 
const reminderSchema = new Schema({
  bookingId: { type: ObjectId, ref: 'Booking', required: true },
  userId:    { type: ObjectId, ref: 'User',    required: true },
  type:      { type: String, enum: ['email', 'sms', 'push'], default: 'email' },
  sentAt:    { type: Date },
  status:    { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
});
 
module.exports = mongoose.model('Reminder', reminderSchema);
