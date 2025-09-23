import express from 'express';
const router = express.Router();
import {
    createClientTestimonial,
    getAllClientTestimonials,
    getClientTestimonialById,
    updateClientTestimonial,
    deleteClientTestimonial
} from '../controllers/clientTestimonialController.js';
import { protect } from '../middelwares/auth.js';
import upload from '../middelwares/uploadMiddleware.js';

// Public routes (no authentication required)
router.get('/', getAllClientTestimonials);
router.get('/:id', getClientTestimonialById);

// Protected admin routes (authentication required)
router.use(protect); // Apply auth middleware to all routes below

router.post('/', upload.single('image'), createClientTestimonial);
router.put('/:id', upload.single('image'), updateClientTestimonial);
router.delete('/:id', deleteClientTestimonial);

export default router;