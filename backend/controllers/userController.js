const User = require('../models/User');

// GET for user-profile
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the URL parameter
    // Ensure the logged-in user is trying to access their own profile
    if (req.user.userId !== id) {
      return res.status(403).json({ message: 'You are not authorized to view this profile' });
    }
    // Fetch the user by the ID from the URL and populate 'bookings' if necessary
    const user = await User.findById(id).populate('bookings');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.userId !== id) {
      return res.status(403).json({ message: 'You are not authorized to update this profile' });
    }
    // Update the user profile with the data in the body
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserProfile, updateUserProfile};