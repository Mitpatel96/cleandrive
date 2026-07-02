const WashSchedule = require('../models/WashSchedule');
const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

exports.getAssignedWashesToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const schedules = await WashSchedule.find({
      staff: req.user._id,
      $or: [
        { date: { $lt: today }, status: 'Pending' },
        { date: { $gte: today, $lt: tomorrow } }
      ]
    }).populate('car');
    res.status(200).json({ success: true, data: schedules });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateWashStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let completionPhotoUrl = req.body.completionPhotoUrl;
    
    if (req.file) {
      completionPhotoUrl = `/uploads/${req.file.filename}`;
    }

    let schedule = await WashSchedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    if (schedule.staff.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this schedule' });
    }

    const previousStatus = schedule.status;
    schedule.status = status || schedule.status;
    schedule.completionPhotoUrl = completionPhotoUrl || schedule.completionPhotoUrl;

    await schedule.save();

    // Auto schedule next wash if just completed
    if (previousStatus !== 'Completed' && schedule.status === 'Completed') {
      const sub = await Subscription.findOne({ car: schedule.car, status: 'Active' }).populate('plan');
      if (sub && sub.plan) {
        let nextDate = new Date(schedule.date);
        nextDate.setHours(0,0,0,0);
        
        const freq = sub.plan.washFrequency;
        if (freq === 'Daily') {
          nextDate.setDate(nextDate.getDate() + 1);
        } else if (freq === 'Alternate') {
          nextDate.setDate(nextDate.getDate() + 2);
        } else if (freq === '4 times a month') {
          nextDate.setDate(nextDate.getDate() + 7);
        } else {
           nextDate.setDate(nextDate.getDate() + 1);
        }

        await WashSchedule.create({
          car: schedule.car,
          date: nextDate,
          staff: schedule.staff,
          status: 'Pending'
        });
      }
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
