// controllers/adminController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { jwtSecret, tokenExpiry } from '../config/config.js';

export const registerAdmin = async (req, res) => {
  try {
    const { username , email, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username ,email, password: hashedPassword });
    await newAdmin.save();
    
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: admin._id, role: 'admin' }, jwtSecret, { expiresIn: tokenExpiry });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminDashboard = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  res.json({ message: 'Welcome to the admin dashboard' });
};
