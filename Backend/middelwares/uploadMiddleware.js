import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';

dotenv.config(); // Load environment variables

// Configure Cloudinary with timeout settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000, // 60 seconds timeout
});

// Configure Multer storage for Cloudinary
// This uses multer-storage-cloudinary, which simplifies the process.
// If you don't have multer-storage-cloudinary, you'll need to install it:
// npm install multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'course_images', // Folder name in Cloudinary
    format: async (req, file) => 'jpg', // Use jpg for better compatibility and smaller size
    public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`, // Unique public ID
    transformation: [
      { width: 800, height: 600, crop: 'limit' }, // Optimize image size
      { quality: 'auto' }, // Auto quality optimization
      { format: 'jpg' }
    ],
  },
});

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 2 * 1024 * 1024, // Reduced to 2 MB file size limit for faster uploads
    files: 1 // Limit to 1 file
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Middleware to handle single image upload with timeout
const uploadImage = asyncHandler(async (req, res, next) => {
  // Set a timeout for the upload operation
  const uploadTimeout = setTimeout(() => {
    res.status(408).json({
      success: false,
      message: 'Upload timeout - please try again with a smaller image'
    });
  }, 30000); // 30 second timeout

  upload.single('image')(req, res, function (err) {
    clearTimeout(uploadTimeout); // Clear timeout on completion
    
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Please upload an image smaller than 2MB.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      console.error('Upload error:', err);
      if (err.message.includes('timeout') || err.message.includes('Timeout')) {
        return res.status(408).json({
          success: false,
          message: 'Upload timeout - please try again with a smaller image or check your internet connection'
        });
      }
      return res.status(500).json({
        success: false,
        message: `Upload failed: ${err.message}`
      });
    }

    // If file was uploaded successfully, its Cloudinary URL will be in req.file.path
    if (req.file) {
      req.body.imageUrl = req.file.path; // Attach the Cloudinary URL to req.body.imageUrl
      console.log('Image uploaded successfully:', req.file.path);
    } else {
      // If no file was uploaded, but it's not an error (e.g., for update where image is optional)
      console.log('No file uploaded - proceeding without image');
    }
    next();
  });
});

// Fallback local storage configuration
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/course_images';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Local upload configuration as fallback
const localUpload = multer({
  storage: localStorage,
  limits: { 
    fileSize: 2 * 1024 * 1024, // 2 MB file size limit
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Alternative middleware that uses local storage when Cloudinary fails
const uploadImageLocal = asyncHandler(async (req, res, next) => {
  localUpload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Local upload Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Please upload an image smaller than 2MB.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      console.error('Local upload error:', err);
      return res.status(500).json({
        success: false,
        message: `Upload failed: ${err.message}`
      });
    }

    if (req.file) {
      // For local storage, create a URL path
      req.body.imageUrl = `/uploads/course_images/${req.file.filename}`;
      console.log('Image uploaded locally:', req.body.imageUrl);
    }
    next();
  });
});

export { uploadImage, uploadImageLocal };
export default upload;
