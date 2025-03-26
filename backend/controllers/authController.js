const User = require('../models/User');
const Driver = require('../models/Driver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//post route for signing up
const signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  
  try {
    // Check if the email is already taken by either a user or a driver
    let existingUser;
    if (role === 'user') {
      existingUser = await User.findOne({ email });
    } else if (role === 'driver') {
      existingUser = await Driver.findOne({ email });
    }
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === 'user') {
      const user = new User({ name, email, password: hashedPassword, phone});
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } else if (role === 'driver') {
      const driver = new Driver({ name, email, password: hashedPassword, phone});
      await driver.save();
      res.status(201).json({ message: 'Driver created successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//post route for logging in
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    // Check if the user is logging in as "user" or "driver"
    if (role === 'user') {
      user = await User.findOne({ email });
    } else if (role === 'driver') {
      user = await Driver.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, role: role }, process.env.SECRET_KEY, { expiresIn: '7d' });
    res.status(200).json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login };
