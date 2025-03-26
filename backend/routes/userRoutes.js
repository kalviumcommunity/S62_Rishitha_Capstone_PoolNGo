const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

//get route for user profile
router.get('/user-profile/:id', authMiddleware, getUserProfile);

module.exports = router;