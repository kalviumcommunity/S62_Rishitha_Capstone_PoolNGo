const Driver = require('../models/Driver');

// Fetch driver profile by ID (using URL parameter)
const getDriverProfile = async (req, res) => {
  try {
    const { id } = req.params; // Get the driver ID from the URL parameter
    // Ensure the logged-in user (driver) is trying to access their own profile
    if (req.user.userId !== id) {
      return res.status(403).json({ message: 'You are not authorized to view this profile' });
    }
    // Fetch the driver by the ID from the URL and populate 'cabSlots' if necessary
    const driver = await Driver.findById(id).populate('cabSlots');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDriverProfile };
