const express = require('express');
const router = express.Router();
const { getDriverProfile} = require('../controllers/driverController');
const authMiddleware = require('../middleware/authMiddleware');

//get route for driver profile
router.get('/driver-profile/:id', authMiddleware, getDriverProfile);

module.exports = router;