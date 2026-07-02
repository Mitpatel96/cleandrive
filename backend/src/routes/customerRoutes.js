const express = require('express');
const { getActiveSubscriptions, getWashHistory, submitEnquiry } = require('../controllers/customerController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/enquiry', submitEnquiry); // Public route for enquiries

router.use(protect, authorize('customer', 'admin'));
router.get('/subscriptions', getActiveSubscriptions);
router.get('/wash-history', getWashHistory);

module.exports = router;
