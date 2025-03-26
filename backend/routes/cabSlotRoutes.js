const express = require('express');
const router = express.Router();
const { createCabSlot, getDriverCabSlots } = require('../controllers/cabSlotController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/cab-slots/:id', authMiddleware, createCabSlot);
router.get('/cab-slots/:driverId', authMiddleware, getDriverCabSlots);

module.exports = router;
