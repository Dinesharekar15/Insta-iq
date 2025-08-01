// src/Routes/blogRoutes.js
import express from 'express';
import {
  getAllBlogs,
  getBlogById,
} from '../controllers/blogController.js'; // Import public blog controller functions

const router = express.Router();

// Public routes for blogs (no authentication or role check needed)
router.get('/', getAllBlogs); // Get all blog posts
router.get('/:id', getBlogById); // Get a single blog post by ID

export default router;