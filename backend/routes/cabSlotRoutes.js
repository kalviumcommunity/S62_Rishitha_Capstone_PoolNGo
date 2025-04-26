const express = require('express');
const router = express.Router();
const { createCabSlot, getDriverCabSlots, getAllCabSlots } = require('../controllers/cabSlotController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/cab-slots/:id', authMiddleware, createCabSlot);
router.get('/cab-slots/:driverId', authMiddleware, getDriverCabSlots);
router.get('/cab-slots', getAllCabSlots)

module.exports = router;
