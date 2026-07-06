const express = require('express');
const {
  getCars, createCar, updateCar, getPlans, createPlan, updatePlan, getStaff,
  getWashSchedules, getEnquiries, updateEnquiryStatus, getDailyWashList, getPendingWashTracker,
  getSystemUsers, updateSystemUser, getDashboardStats, getSubscriptions, updateSubscriptionPayment, updateWashSchedule
} = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect, authorize('admin'));

router.route('/cars').get(getCars).post(createCar);
router.route('/cars/:id').put(updateCar);
router.route('/plans').get(getPlans).post(createPlan);
router.route('/plans/:id').put(updatePlan);
router.route('/staff').get(getStaff);
router.route('/users').get(getSystemUsers);
router.route('/users/:id').put(updateSystemUser);
router.route('/wash-schedules').get(getWashSchedules);
router.route('/wash-schedules/:id').put(updateWashSchedule);
router.route('/enquiries').get(getEnquiries);
router.route('/enquiries/:id').put(updateEnquiryStatus);
router.route('/daily-washes').get(getDailyWashList);
router.route('/pending-washes').get(getPendingWashTracker);
router.route('/stats').get(getDashboardStats);
router.route('/subscriptions').get(getSubscriptions);
router.route('/subscriptions/:id').put(updateSubscriptionPayment);

module.exports = router;

