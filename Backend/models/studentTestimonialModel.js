import mongoose from 'mongoose';

const studentTestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    college: {
        type: String,
        required: [true, 'College/University name is required'],
        trim: true,
        maxlength: [200, 'College name cannot exceed 200 characters']
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

// Indexes for better query performance
studentTestimonialSchema.index({ college: 1 });
studentTestimonialSchema.index({ createdAt: -1 });

const StudentTestimonial = mongoose.model('StudentTestimonial', studentTestimonialSchema);

export default StudentTestimonial;