const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
  cabSlot: { type: mongoose.Schema.Types.ObjectId, ref: "CabSlot", required: true },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" }
});

module.exports = mongoose.model('Booking', bookingSchema);