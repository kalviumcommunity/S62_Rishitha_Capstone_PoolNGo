const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

//get route for user profile
router.get('/user-profile/:id', authMiddleware, getUserProfile);
router.put('/user-profile/:id', authMiddleware, updateUserProfile);

module.exports = router;