
// middleware/upload.js
import multer from 'multer';
import path from 'path';

// Set up storage engine for Multer
const storage = multer.memoryStorage(); // Store file in memory for faster processing

// Enhanced file filter with better error messages
const fileFilter = (req, file, cb) => {
    const filetypes = /mp4|mov|avi|mkv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error(
            `Error: Only video files are allowed! Received: ${file.mimetype}. 
            Allowed types: mp4, mov, avi, mkv`
        ));
    }
};

// Initialize Multer with enhanced configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 100 * 1024 * 1024, // 100MB limit
        files: 1 // Only allow 1 file per request
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
        return res.status(400).json({
            message: `Upload error: ${err.message}`
        });
    }
    next(err);
};

export default upload;