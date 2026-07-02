const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  carType: { type: String },
  preferredPlan: { type: String },
  preferredTimeSlot: { type: String },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Rejected'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
