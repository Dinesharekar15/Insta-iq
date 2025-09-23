import mongoose from 'mongoose';

const clientTestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    company: {
        type: String,
        required: [true, 'Company/Organization name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    testimonial: {
        type: String,
        required: [true, 'Testimonial content is required'],
        trim: true,
        maxlength: [1000, 'Testimonial cannot exceed 1000 characters']
    },
    imageUrl: {
        type: String,
        default: null,
        trim: true
    }
}, {
    timestamps: true
});

// Index for better query performance
clientTestimonialSchema.index({ company: 1 });
clientTestimonialSchema.index({ createdAt: -1 });

const ClientTestimonial = mongoose.model('ClientTestimonial', clientTestimonialSchema);

export default ClientTestimonial;