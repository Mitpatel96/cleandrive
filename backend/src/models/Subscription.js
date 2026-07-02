const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Cancelled'], default: 'Active' },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid', 'Partial'], default: 'Unpaid' },
  preferredWashDay: { type: Number, min: 0, max: 6 } // 0=Sunday, 1=Monday, etc. For weekly plans
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
