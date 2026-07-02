const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const user = await User.create({ name, email, password, phone, role });
    const token = signToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }
    const user = await User.findOne({ email });
    console.log("Login attempt:", email, password);
    console.log("Found user:", user ? user.email : "Not found");
    if (!user || user.password !== password) {
      console.log("Password mismatch:", user ? (user.password + " !== " + password) : "No user");
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    if (user.isActive === false) {
      return res.status(401).json({ success: false, message: 'Account has been deactivated. Contact Admin.' });
    }
    const token = signToken(user._id);
    res.status(200).json({ success: true, token, role: user.role, id: user._id });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
