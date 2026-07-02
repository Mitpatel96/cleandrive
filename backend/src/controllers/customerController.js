const Subscription = require('../models/Subscription');
const WashSchedule = require('../models/WashSchedule');
const Enquiry = require('../models/Enquiry');
const Car = require('../models/Car');

exports.getActiveSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ customer: req.user.id, status: 'Active' }).populate('car plan');
    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getWashHistory = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id });
    const carIds = cars.map(car => car._id);

    const history = await WashSchedule.find({
      car: { $in: carIds },
      status: { $in: ['Completed', 'Skipped'] }
    }).populate('car staff');
    
    res.status(200).json({ success: true, data: history });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.submitEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
