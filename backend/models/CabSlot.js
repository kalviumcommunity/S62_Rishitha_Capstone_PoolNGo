const mongoose = require('mongoose');

const cabSlotSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required:true },
  date: {type:Date, required:true},
  timeSlot: {
    startTime: { type:Date, required:true },
    endTime: { type:Date, required:true },
  },
  apartment: {type:String, required:true},
  destination: {type:String, required:true},
  capacity: {type:Number, required:true},
  price: {type:Number, required:true},
  bookedSeats: { type:Number, default: 0 }
});

module.exports = mongoose.model('CabSlot', cabSlotSchema);