import express from 'express';
const router = express.Router();
import {
    createStudentTestimonial,
    getAllStudentTestimonials,
    getStudentTestimonialById,
    updateStudentTestimonial,
    deleteStudentTestimonial,
    getPublicStudentTestimonials
} from '../controllers/studentTestimonialController.js';
import { protect } from '../middelwares/auth.js';
import upload from '../middelwares/uploadMiddleware.js';

// Public routes (no authentication required)
router.get('/', getAllStudentTestimonials);
router.get('/public', getPublicStudentTestimonials);
router.get('/:id', getStudentTestimonialById);

// Protected admin routes (authentication required)
router.use(protect); // Apply auth middleware to all routes below

router.post('/', upload.single('image'), createStudentTestimonial);
router.put('/:id', upload.single('image'), updateStudentTestimonial);
router.delete('/:id', deleteStudentTestimonial);

export default router;