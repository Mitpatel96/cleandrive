const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  durationDays: { type: Number, required: true },
  price: { type: Number, required: true },
  seaterType: { type: String, enum: ['5 Seater', '7 Seater'], required: true },
  washFrequency: { type: String, enum: ['Daily', 'Alternate', '4 times a month'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
