import multer from 'multer';
import path from 'path';

// Set up storage engine for Multer
const storage = multer.memoryStorage();

// Define allowed file types
const ALLOWED_VIDEO_TYPES = /mp4|mov|avi|mkv/;
const ALLOWED_IMAGE_TYPES = /jpeg|jpg|png/;

// Enhanced file filter with better error messages
const fileFilter = (req, file, cb) => {
    // Check if it's a video upload
    if (file.fieldname === 'video') {
        const extname = ALLOWED_VIDEO_TYPES.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = ALLOWED_VIDEO_TYPES.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error(
                `Error: Only video files are allowed! Received: ${file.mimetype}. 
                Allowed types: mp4, mov, avi, mkv`
            ));
        }
    }
    // Check if it's a thumbnail upload
    else if (file.fieldname === 'thumbnail') {
        const extname = ALLOWED_IMAGE_TYPES.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = ALLOWED_IMAGE_TYPES.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error(
                `Error: Only image files are allowed! Received: ${file.mimetype}. 
                Allowed types: jpeg, jpg, png`
            ));
        }
    }
    else {
        cb(new Error('Unexpected field'));
    }
};

// Initialize Multer with enhanced configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for videos
    }
});

// Error handler middleware for multer errors
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File is too large. Maximum size is 100MB'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                message: 'Unexpected file upload field'
            });
        }
        return res.status(400).json({
            message: `Upload error: ${err.message}`
        });
    }
    
    // Handle custom errors from fileFilter
    if (err.message.includes('Only video files are allowed') ||
        err.message.includes('Only image files are allowed')) {
        return res.status(400).json({
            message: err.message
        });
    }
    
    next(err);
};

// Function to create field configuration for routes
export const uploadFields = upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);

export default upload;