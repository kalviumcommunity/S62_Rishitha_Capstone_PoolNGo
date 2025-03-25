const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  phone: {type:String, required:true},
  licensePlate: {type:String},
  profilePic: {type:String},
  cabSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: "CabSlot" }]
});

module.exports = mongoose.model('Driver', driverSchema);
