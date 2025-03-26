const express = require('express');
const router = express.Router();
const { createCabSlot } = require('../controllers/cabSlotController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/cab-slots/:id', authMiddleware, createCabSlot);

module.exports = router;
