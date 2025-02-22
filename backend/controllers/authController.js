// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { jwtSecret, tokenExpiry } from "../config/config.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: "user" }, jwtSecret, {
      expiresIn: tokenExpiry,
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const userDashboard = (req, res) => {
  if (req.user.role !== "user")
    return res.status(403).json({ message: "Access denied" });
  res.json({ message: "Welcome to the user dashboard" });
};

export const getUserById = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate(`enrolledCourses`);
  if (!user) return res.status(400).json({ message: "User Dont exist" });

  return res.status(200).json({
    user: user
  })

};
