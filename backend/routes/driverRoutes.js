const express = require('express');
const router = express.Router();
const { getDriverProfile, updateDriverProfile} = require('../controllers/driverController');
const authMiddleware = require('../middleware/authMiddleware');

//get route for driver profile
router.get('/driver-profile/:id', authMiddleware, getDriverProfile);
router.put('/driver-profile/:id', authMiddleware, updateDriverProfile);

module.exports = router;