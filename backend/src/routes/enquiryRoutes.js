const express = require('express');
const Enquiry = require('../models/Enquiry');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { full_name, phone, email, address, car_type, preferred_plan, preferred_time_slot, message } = req.body;
    
    // Map the fields from the frontend form to the Enquiry model
    const enquiry = await Enquiry.create({
      fullName: full_name,
      phone,
      email,
      address,
      carType: car_type,
      preferredPlan: preferred_plan,
      preferredTimeSlot: preferred_time_slot,
      message,
      status: 'New'
    });
    
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
