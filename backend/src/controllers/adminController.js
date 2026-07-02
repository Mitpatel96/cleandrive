const Car = require('../models/Car');
const Plan = require('../models/Plan');
const User = require('../models/User');
const WashSchedule = require('../models/WashSchedule');
const Enquiry = require('../models/Enquiry');
const Subscription = require('../models/Subscription');
const bcrypt = require('bcryptjs');

const getNextDayOfWeek = (date, dayOfWeek) => {
  const resultDate = new Date(date.getTime());
  resultDate.setHours(0,0,0,0);
  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
  return resultDate;
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('owner defaultAssignedStaff').lean();
    const subs = await Subscription.find({ status: 'Active' });
    
    // Attach active subscription details to cars for the edit form
    for (let car of cars) {
      const sub = subs.find(s => s.car.toString() === car._id.toString());
      if (sub) {
        car.planId = sub.plan ? sub.plan.toString() : '';
        car.startDate = sub.startDate ? sub.startDate.toISOString().split('T')[0] : '';
        car.endDate = sub.endDate ? sub.endDate.toISOString().split('T')[0] : '';
        car.preferredWashDay = sub.preferredWashDay !== undefined && sub.preferredWashDay !== null ? String(sub.preferredWashDay) : '';
      }
    }
    
    res.status(200).json({ success: true, data: cars });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.createCar = async (req, res) => {
  try {
    const { name, phone, carNumber, carModel, address, location, planId, startDate, endDate, staffId, preferredWashDay } = req.body;
    
    // 1. Find or create user (customer) by phone
    let customer = await User.findOne({ phone, role: 'customer' });
    if (!customer) {
      const defaultEmail = `${phone}@cleandrive.local`;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      customer = await User.create({
        name, phone, email: defaultEmail, password: hashedPassword, role: 'customer'
      });
    }

    // 2. Create the Car
    const car = await Car.create({
      model: carModel,
      number: carNumber,
      owner: customer._id,
      address,
      location,
      defaultAssignedStaff: staffId || null
    });

    // 3. If plan provided, create subscription
    if (planId) {
      await Subscription.create({
        customer: customer._id,
        car: car._id,
        plan: planId,
        startDate: startDate || new Date(),
        endDate: endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: 'Active',
        paymentStatus: 'Unpaid',
        preferredWashDay: preferredWashDay !== undefined && preferredWashDay !== '' ? Number(preferredWashDay) : undefined
      });
      
      let washDate = new Date();
      washDate.setHours(0,0,0,0);
      if (preferredWashDay !== undefined && preferredWashDay !== '') {
        washDate = getNextDayOfWeek(washDate, Number(preferredWashDay));
      }

      await WashSchedule.create({
        car: car._id,
        date: washDate,
        staff: staffId || null,
        status: 'Pending'
      });
    }

    res.status(201).json({ success: true, data: car });
  } catch (err) { 
    res.status(400).json({ success: false, error: err.message }); 
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({ success: true, data: plans });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }
    res.status(200).json({ success: true, data: plan });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.getStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: 'staff' });
    res.status(200).json({ success: true, data: staff });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.getWashSchedules = async (req, res) => {
  try {
    const schedules = await WashSchedule.find().populate('car staff');
    res.status(200).json({ success: true, data: schedules });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.getDailyWashList = async (req, res) => {
  try {
    let targetDate = new Date();
    if (req.query.date) {
      targetDate = new Date(req.query.date);
    }
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // If viewing today or a future date, we also want to see past Pending washes
    const isTodayOrFuture = new Date().setHours(0,0,0,0) <= targetDate.getTime();
    let query = { date: { $gte: targetDate, $lt: nextDay } };
    
    if (isTodayOrFuture) {
      query = {
        $or: [
          { date: { $lt: targetDate }, status: 'Pending' },
          { date: { $gte: targetDate, $lt: nextDay } }
        ]
      };
    }

    const schedules = await WashSchedule.find(query).populate('car staff').sort({ date: 1 });
    res.status(200).json({ success: true, data: schedules });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.getPendingWashTracker = async (req, res) => {
  try {
    const schedules = await WashSchedule.find({ status: 'Pending' }).populate('car staff');
    res.status(200).json({ success: true, data: schedules });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updateCar = async (req, res) => {
  try {
    const { name, phone, carNumber, carModel, address, location, planId, startDate, endDate, staffId, preferredWashDay } = req.body;
    
    const car = await Car.findById(req.params.id).populate('owner');
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Update car fields
    car.model = carModel || car.model;
    car.number = carNumber || car.number;
    car.address = address || car.address;
    car.location = location || car.location;
    if (staffId) car.defaultAssignedStaff = staffId;
    await car.save();

    // Update customer fields
    if (car.owner) {
      const customer = await User.findById(car.owner._id);
      if (customer) {
        customer.name = name || customer.name;
        customer.phone = phone || customer.phone;
        await customer.save();
      }
    }

    // Update subscription
    if (planId) {
      let sub = await Subscription.findOne({ car: car._id, status: 'Active' });
      if (sub) {
        sub.plan = planId;
        if (startDate) sub.startDate = startDate;
        if (endDate) sub.endDate = endDate;
        if (preferredWashDay !== undefined) {
           const newPreferredDay = preferredWashDay !== '' ? Number(preferredWashDay) : undefined;
           
           // If the preferred day changed, update any Pending wash schedules
           if (sub.preferredWashDay !== newPreferredDay) {
             sub.preferredWashDay = newPreferredDay;
             
             if (newPreferredDay !== undefined) {
               let washDate = new Date();
               washDate.setHours(0,0,0,0);
               washDate = getNextDayOfWeek(washDate, newPreferredDay);
               
               await WashSchedule.updateMany(
                 { car: car._id, status: 'Pending' },
                 { $set: { date: washDate } }
               );
             }
           }
        }
        await sub.save();
      } else {
        await Subscription.create({
          customer: car.owner._id,
          car: car._id,
          plan: planId,
          startDate: startDate || new Date(),
          endDate: endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)),
          status: 'Active',
          paymentStatus: 'Unpaid',
          preferredWashDay: preferredWashDay !== undefined && preferredWashDay !== '' ? Number(preferredWashDay) : undefined
        });

        let washDate = new Date();
        washDate.setHours(0,0,0,0);
        if (preferredWashDay !== undefined && preferredWashDay !== '') {
          washDate = getNextDayOfWeek(washDate, Number(preferredWashDay));
        }

        await WashSchedule.create({
          car: car._id,
          date: washDate,
          staff: staffId || null,
          status: 'Pending'
        });
      }
    }

    res.status(200).json({ success: true, data: car });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.getSystemUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['admin', 'staff'] } }).select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};

exports.updateSystemUser = async (req, res) => {
  try {
    const { isActive, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (isActive !== undefined) {
      user.isActive = isActive;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(200).json({ success: true, data: userResponse });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
};
