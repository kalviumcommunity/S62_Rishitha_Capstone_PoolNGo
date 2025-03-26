const express = require('express');
require("dotenv").config()
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const cabSlotRoutes = require('./routes/cabSlotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(driverRoutes);
app.use(cabSlotRoutes);
app.use(bookingRoutes);

PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
