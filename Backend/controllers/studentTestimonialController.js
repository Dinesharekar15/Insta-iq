import StudentTestimonial from '../models/studentTestimonialModel.js';

// @desc Create a new student testimonial
// @route POST /api/student-testimonials
// @access Private/Admin
const createStudentTestimonial = async (req, res) => {
    try {
        const { name, college, testimonial, imageUrl } = req.body;

        // Handle image from file upload or URL
        let finalImageUrl = imageUrl;
        if (req.file) {
            finalImageUrl = req.file.path; // Cloudinary URL from upload middleware
        }

        const studentTestimonial = new StudentTestimonial({
            name,
            college,
            testimonial,
            imageUrl: finalImageUrl
        });

        const savedTestimonial = await studentTestimonial.save();

        res.status(201).json({
            success: true,
            message: 'Student testimonial created successfully',
            data: savedTestimonial
        });
    } catch (error) {
        console.error('Error creating student testimonial:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while creating student testimonial'
        });
    }
};

// @desc Get all student testimonials
// @route GET /api/student-testimonials
// @access Public
const getAllStudentTestimonials = async (req, res) => {
    try {
        const { limit, page = 1 } = req.query;
        const pageSize = limit ? parseInt(limit) : 20;
        const skip = (parseInt(page) - 1) * pageSize;

        const testimonials = await StudentTestimonial.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize);

        const total = await StudentTestimonial.countDocuments();

        res.status(200).json({
            success: true,
            count: testimonials.length,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / pageSize),
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching student testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching student testimonials'
        });
    }
};

// @desc Get student testimonial by ID
// @route GET /api/student-testimonials/:id
// @access Public
const getStudentTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial = await StudentTestimonial.findById(id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Student testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        console.error('Error fetching student testimonial:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid testimonial ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching student testimonial'
        });
    }
};

// @desc Update student testimonial
// @route PUT /api/student-testimonials/:id
// @access Private/Admin
const updateStudentTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, college, testimonial, imageUrl } = req.body;

        // Handle image from file upload or URL
        let finalImageUrl = imageUrl;
        if (req.file) {
            finalImageUrl = req.file.path; // Cloudinary URL from upload middleware
        }

        const updatedTestimonial = await StudentTestimonial.findByIdAndUpdate(
            id,
            { name, college, testimonial, imageUrl: finalImageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Student testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student testimonial updated successfully',
            data: updatedTestimonial
        });
    } catch (error) {
        console.error('Error updating student testimonial:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating student testimonial'
        });
    }
};

// @desc Delete student testimonial
// @route DELETE /api/student-testimonials/:id
// @access Private/Admin
const deleteStudentTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTestimonial = await StudentTestimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Student testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student testimonial deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting student testimonial:', error);

        res.status(500).json({
            success: false,
            message: 'Server error while deleting student testimonial'
        });
    }
};

// @desc Get recent student testimonials for public display
// @route GET /api/student-testimonials/public
// @access Public
const getPublicStudentTestimonials = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        
        const testimonials = await StudentTestimonial.find()
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .select('-__v');
        
        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching public student testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching public student testimonials'
        });
    }
};

export {
    createStudentTestimonial,
    getAllStudentTestimonials,
    getStudentTestimonialById,
    updateStudentTestimonial,
    deleteStudentTestimonial,
    getPublicStudentTestimonials
};