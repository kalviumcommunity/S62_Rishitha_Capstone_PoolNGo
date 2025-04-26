const CabSlot = require('../models/CabSlot');
const Driver = require('../models/Driver');
const moment = require('moment'); 

//write performed
const createCabSlot = async (req, res) => {
  const { date, startTime, endTime, apartment, destination, capacity, price } = req.body;

  try {
    // Ensure that both startTime and endTime are provided
    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'startTime and endTime are required.' });
    }

    // Combine the provided date with the start and end times
    const startDateTime = moment(`${date} ${startTime}`, 'YYYY-MM-DD hh:mm A').toDate(); // Convert to a Date object
    const endDateTime = moment(`${date} ${endTime}`, 'YYYY-MM-DD hh:mm A').toDate(); // Convert to a Date object

    // Check if the start time is before the end time
    if (startDateTime >= endDateTime) {
      return res.status(400).json({ message: 'startTime must be before endTime.' });
    }

    // Create the new CabSlot
    const cabSlot = new CabSlot({
      driver: req.params.id,
      date: date, // This stores the full datetime for the slot
      timeSlot: {
        startTime: startDateTime,  // Save the full datetime for startTime
        endTime: endDateTime       // Save the full datetime for endTime
      },
      apartment,
      destination,
      capacity,
      price,
      bookedSeats: 0
    });

    // Save the cab slot
    await cabSlot.save();

    // Find the driver by ID and update their cabSlots array
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Add the cabSlot to the driver's cabSlots array
    driver.cabSlots.push(cabSlot._id);

    // Save the driver with the updated cabSlots
    await driver.save();

    res.status(201).json(cabSlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//read performed
const getDriverCabSlots = async (req, res) => {
  const driverId = req.params.driverId;
  try {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    // Fetch cab slots for the specified driver
    const cabSlots = await CabSlot.find({ driver: driverId });
    // If no cab slots are found for the driver
    if (cabSlots.length === 0) {
      return res.status(404).json({ message: "No cab slots found for this driver" });
    }
    res.status(200).json(cabSlots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCabSlots = async (req, res) => {
  try {
    // Fetch all cab slots
    const cabSlots = await CabSlot.find();
    // If no cab slots are found
    if (cabSlots.length === 0) {
      return res.status(404).json({ message: "No cab slots found" });
    }
    res.status(200).json(cabSlots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createCabSlot, getDriverCabSlots, getAllCabSlots };

