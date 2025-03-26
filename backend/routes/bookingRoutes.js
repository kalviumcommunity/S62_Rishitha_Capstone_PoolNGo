const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/bookings/:id',authMiddleware, createBooking);
router.get('/bookings/:id', authMiddleware, getUserBookings);

module.exports = router;
