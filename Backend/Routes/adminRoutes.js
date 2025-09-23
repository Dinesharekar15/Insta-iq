import express from 'express';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
} from '../controllers/adminController.js';
import {createBlog,updateBlog,deleteBlog} from '../controllers/blogController.js'
import { createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { getAdminProfile, updateAdminProfile } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middelwares/auth.js';
import { getCoursePurchasedByUsers } from '../controllers/adminController.js';
import { uploadImage } from '../middelwares/uploadMiddleware.js'; // New: Import upload middleware

const router = express.Router();

// All admin routes will be protected and require admin-level roles
router.use(protect); // Ensure user is authenticated
router.use(authorizeRoles('admin', 'super admin')); // Ensure user has admin or super admin role

// Admin Profile Management Routes
router.route('/profile')
  .get(getAdminProfile)     // Get current admin profile
  .put(updateAdminProfile);  // Update admin profile

// Course Management Routes
// For creating a course, we now expect an 'image' file field
router.route('/courses')
  .get(getAllCourses)                 // Get all courses with pagination
  .post(uploadImage, createCourse); // Added uploadImage middleware

// For updating a course, we also allow image upload
router.route('/courses/:id')
  .put(uploadImage, updateCourse)    // Added uploadImage middleware
  .delete(deleteCourse); // Delete a course


// New route to get users who purchased a specific course
router.get('/courses/:id/purchasers', getCoursePurchasedByUsers);

// User Management Routes (Complete CRUD)
router.route('/users')
  .get(getAllUsers)    // Get all users with pagination and search
  .post(createUser);   // Create a new user

router.route('/users/:id')
  .get(getUserById)    // Get a single user by ID
  .put(updateUser)     // Update a user
  .delete(deleteUser); // Delete a user


// --- Event Management Routes (NEWLY MERGED) ---
// Note: These routes are now under /api/admin/events, /api/admin/events/:id
router.route('/events')
  .post(uploadImage, createEvent) // Create a new event with image upload
  

router.route('/events/:id')
 
  .put(uploadImage, updateEvent)    // Update an event with optional image upload
  .delete(deleteEvent);


 // --- Blog Management Routes (Updated - No Image Upload) ---
router.route('/blogs')
  .post( createBlog); // Create a new blog (removed uploadImage)

router.route('/blogs/:id')
  .put( updateBlog)    // Update an existing blog (removed uploadImage)
  .delete(deleteBlog); // Delete a blog


export default router;