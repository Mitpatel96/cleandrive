const mongoose = require('mongoose');

const washScheduleSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  date: { type: Date, required: true },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'Completed', 'Skipped'], default: 'Pending' },
  completionPhotoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('WashSchedule', washScheduleSchema);
