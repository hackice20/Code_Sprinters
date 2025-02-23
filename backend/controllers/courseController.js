import mongoose from 'mongoose';
import Course from '../models/Course.js';
import Admin from '../models/Admin.js';
import cloudinary from '../config/cloudinaryConfig.js';
import { Readable } from 'stream';
import User from '../models/User.js';

const bufferToStream = (buffer) => {
  return Readable.from(buffer);
};

const uploadToCloudinary = async (file, resourceType = "video") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: resourceType === "video" ? "course-videos" : "course-thumbnails",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    bufferToStream(file.buffer).pipe(stream);
  });
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, discordServerLink, price, instructor } = req.body;

    // Check for video file
    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: 'Video file is required' });
    }

    const admin = await Admin.findById(instructor);
    if (!admin) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    // Upload video
    const videoResult = await uploadToCloudinary(req.files.video[0], "video");
    
    // Upload thumbnail if provided
    let thumbnailUrl = null;
    if (req.files.thumbnail) {
      const thumbnailResult = await uploadToCloudinary(req.files.thumbnail[0], "image");
      thumbnailUrl = thumbnailResult.secure_url;
    }

    const newCourse = new Course({
      title,
      description,
      youtubePlaylist: videoResult.secure_url,
      discordServerLink,
      price,
      thumbnail: thumbnailUrl,
      instructor: admin.username,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id || req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Handle file uploads if present
    if (req.files) {
      // Handle video update
      if (req.files.video) {
        const videoResult = await uploadToCloudinary(req.files.video[0], "video");
        updateData.youtubePlaylist = videoResult.secure_url;
      }
      
      // Handle thumbnail update
      if (req.files.thumbnail) {
        const thumbnailResult = await uploadToCloudinary(req.files.thumbnail[0], "image");
        updateData.thumbnail = thumbnailResult.secure_url;
      }
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course updated successfully', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Public: Get certificate details for a course
export const getCertificate = async (req, res) => {
  try {
    const { username, courseName } = req.query;
    if (!username || !courseName) {
      return res.status(400).json({ message: "username and courseName are required" });
    }
    const course = await Course.findOne({ title: courseName });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ username, courseName: course.title });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    if (course.boughtBy.some((user) => user.equals(userObjectId))) {
      return res
        .status(400)
        .json({ message: "You already purchased this course" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.boughtBy.push(userObjectId);
    await course.save();

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({
      message: "Course purchased successfully",
      course,
    });
  } catch (err) {
    console.error("Purchase course error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const rateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    const { rating } = req.body;

    if (!rating) {
      return res.status(400).json({ message: 'Rating is required' });
    }

    const ratingNumber = Number(rating);
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    if (!course.boughtBy.some(id => id.equals(userObjectId))) {
      return res.status(403).json({ message: 'You must purchase this course to rate it' });
    }

    const existingRatingIndex = course.ratings.findIndex(r => r.user.equals(userObjectId));
    if (existingRatingIndex !== -1) {
      course.ratings[existingRatingIndex].rating = ratingNumber;
    } else {
      course.ratings.push({ user: userObjectId, rating: ratingNumber });
    }

    const totalRatings = course.ratings.length;
    if (totalRatings > 0) {
      course.averageRating = (course.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings);
    }

    await course.save();
    res.status(200).json({ 
      message: 'Course rated successfully', 
      course
    });
  } catch (err) {
    console.error('Rate course error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const giveReview = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    const { review } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    if (!course.boughtBy.some(id => id.equals(userObjectId))) {
      return res.status(403).json({ message: 'You must purchase this course to review it' });
    }

    const existingReviewIndex = course.reviews.findIndex(r => r.user.equals(userObjectId));
    if (existingReviewIndex !== -1) {
      course.reviews[existingReviewIndex].review = review;
    } else {
      course.reviews.push({ user: userObjectId, review });
    }

    await course.save();
    res.status(200).json({ 
      message: 'Course reviewed successfully', 
      course
    });
  } catch (err) {
    console.error('Review course error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCoursesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({
      courses: user.enrolledCourses || [],
    });
  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ message: error.message });
  }
};
