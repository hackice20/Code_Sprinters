// controllers/adminController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
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


export const adminDashboard = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // 1. Total Students
    const totalStudents = await User.countDocuments();

    // 2. Active Courses
    const activeCourses = await Course.countDocuments();

    // 3. Total Revenue
    const revenue = await Course.aggregate([
      { $unwind: '$boughtBy' },
      { $group: { _id: null, totalRevenue: { $sum: '$price' } } }
    ]);
    const totalRevenue = revenue[0]?.totalRevenue || 0;

    // 4. Recent Courses (last 5)
    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title price boughtBy')
      .lean();

    const recentCoursesData = recentCourses.map(course => ({
      courseName: course.title,
      studentCount: course.boughtBy.length,
      courseRevenue: course.boughtBy.length * course.price
    }));

    // 5. Recent Enrollments (last 5)
    const recentEnrollments = await Course.find({ boughtBy: { $exists: true, $not: { $size: 0 } } })
      .populate('boughtBy', 'username email')
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title price boughtBy')
      .lean();

    const enrollmentData = [];
    recentEnrollments.forEach(course => {
      course.boughtBy.forEach(student => {
        enrollmentData.push({
          studentName: student.username,
          courseName: course.title,
          amount: course.price
        });
      });
    });

    // Response
    res.json({
      totalStudents,
      activeCourses,
      totalRevenue,
      recentCourses: recentCoursesData,
      recentEnrollments: enrollmentData.slice(0, 5) // Limiting to last 5 enrollments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};
