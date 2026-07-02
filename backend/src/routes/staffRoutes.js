const express = require('express');
const { getAssignedWashesToday, updateWashStatus } = require('../controllers/staffController');
const { protect, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.use(protect, authorize('staff', 'admin'));

router.get('/assigned-today', getAssignedWashesToday);
router.put('/schedule/:id', upload.single('completionPhoto'), updateWashStatus);

module.exports = router;
