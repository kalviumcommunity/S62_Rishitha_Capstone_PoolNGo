const Booking = require('../models/Booking');
const CabSlot = require('../models/CabSlot');
const User = require('../models/User');

const createBooking = async (req, res) => {
  const { cabSlotId } = req.body;
  const userId = req.params.id;

  try {
    // Ensure the CabSlot exists
    const cabSlot = await CabSlot.findOne({ _id: cabSlotId });
    if (!cabSlot) {
      return res.status(404).json({ message: "CabSlot not found" });
    }

    // Check if the user exists
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there are available seats in the CabSlot
    if (cabSlot.bookedSeats >= cabSlot.capacity) {
      return res
        .status(400)
        .json({ message: "No available seats in this CabSlot" });
    }

    // if cabsolt is avialable then store user in that
    let booking = await Booking.findOneAndUpdate(
      { cabSlot: cabSlotId },
      { $push: { users: user._id } },
      { new: true }
    );
    
    if (!booking) {
      booking = new Booking({
        users: [user._id],
        driver: cabSlot.driver,
        cabSlot: cabSlot._id,
        status: "confirmed",
      });
      await booking.save();
    }

    // Add the booking to the user's bookings array
    user.bookings.push(booking._id);
    await user.save();

    // Increment the bookedSeats for the CabSlot
    cabSlot.bookedSeats += 1;
    await cabSlot.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { createBooking };
