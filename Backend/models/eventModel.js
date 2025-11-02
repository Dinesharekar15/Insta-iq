import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      default: 'https://placehold.co/600x400/000000/FFFFFF?text=Event+Image' // Default placeholder
    },
    type: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming', // Default type for new events
      required: true,
    },
    date: {
      type: String, // Storing as string to match your frontend data (e.g., "9")
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    desc: { // Corresponds to 'description' in your frontend data
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      default: 100
    },
    registeredCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    eventUrl: { // For online events
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0 // 0 for free events
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;