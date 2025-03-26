const express = require("express");
require("dotenv").config();
const connectDatabase = require("./DB/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const driverRoutes = require("./routes/driverRoutes");
const cabSlotRoutes = require("./routes/cabSlotRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(driverRoutes);
app.use(cabSlotRoutes);
app.use(bookingRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the backend");
});
// Connect to the database
connectDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
