import ClientTestimonial from '../models/clientTestimonialModel.js';

// @desc Create a new client testimonial
// @route POST /api/client-testimonials
// @access Private/Admin
const createClientTestimonial = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        
        const { name, company, testimonial, imageUrl } = req.body;

        console.log('Extracted data:', { name, company, testimonial, imageUrl });

        // Handle image from file upload or URL
        let finalImageUrl = imageUrl;
        if (req.file) {
            finalImageUrl = req.file.path; // Cloudinary URL from upload middleware
        }

        const clientTestimonial = new ClientTestimonial({
            name,
            company,
            testimonial,
            imageUrl: finalImageUrl
        });

        const savedTestimonial = await clientTestimonial.save();

        res.status(201).json({
            success: true,
            message: 'Client testimonial created successfully',
            data: savedTestimonial
        });
    } catch (error) {
        console.error('Error creating client testimonial:', error);
        
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
            message: 'Server error while creating client testimonial'
        });
    }
};

// @desc Get all client testimonials
// @route GET /api/client-testimonials
// @access Public
const getAllClientTestimonials = async (req, res) => {
    try {
        const testimonials = await ClientTestimonial.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching client testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching client testimonials'
        });
    }
};

// @desc Get client testimonial by ID
// @route GET /api/client-testimonials/:id
// @access Public
const getClientTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;

        const testimonial = await ClientTestimonial.findById(id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Client testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        console.error('Error fetching client testimonial:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid testimonial ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching client testimonial'
        });
    }
};

// @desc Update client testimonial
// @route PUT /api/client-testimonials/:id
// @access Private/Admin
const updateClientTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, company, testimonial, imageUrl } = req.body;

        // Handle image from file upload or URL
        let finalImageUrl = imageUrl;
        if (req.file) {
            finalImageUrl = req.file.path; // Cloudinary URL from upload middleware
        }

        const updatedTestimonial = await ClientTestimonial.findByIdAndUpdate(
            id,
            { name, company, testimonial, imageUrl: finalImageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Client testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Client testimonial updated successfully',
            data: updatedTestimonial
        });
    } catch (error) {
        console.error('Error updating client testimonial:', error);
        
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
            message: 'Server error while updating client testimonial'
        });
    }
};

// @desc Delete client testimonial
// @route DELETE /api/client-testimonials/:id
// @access Private/Admin
const deleteClientTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTestimonial = await ClientTestimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Client testimonial not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Client testimonial deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting client testimonial:', error);

        res.status(500).json({
            success: false,
            message: 'Server error while deleting client testimonial'
        });
    }
};

export {
    createClientTestimonial,
    getAllClientTestimonials,
    getClientTestimonialById,
    updateClientTestimonial,
    deleteClientTestimonial
};