import express from 'express';
import { getUserProfile, updateUserProfile, getPurchasedCourses } from '../controllers/userController.js';
import { protect, authorizeRoles } from '../middelwares/auth.js';

const router = express.Router();

// All routes below this line will be protected
router.use(protect); // Apply protect middleware to all routes below

router
  .route('/profile')
  .get(authorizeRoles('student', 'admin'), getUserProfile) // Student and Admin can view their profile
  .put(authorizeRoles('student', 'admin'), updateUserProfile); // Student and Admin can update their profile

router.get('/purchased-courses', authorizeRoles('student', 'admin'), getPurchasedCourses); // Student and Admin can view purchased courses

export default router;