import mongoose from 'mongoose';

// Define a schema for a single content block.
// This is not a top-level model, but a sub-schema used within the Blog model.
// This block will not have a unique ID (_id) of its own.
const contentBlockSchema = new mongoose.Schema({
  // The 'type' field defines what kind of content this block holds.
  // Examples could be 'heading', 'paragraph', 'image', 'list', 'code', etc.
  type: {
    type: String,
    required: true,
  },
  // The 'data' field is a flexible object that holds the specific content
  // for this block's type. Using Schema.Types.Mixed allows us to store
  // different structures for different types of blocks.
  // For a 'paragraph', it might be `{ text: "..." }`.
  // For an 'image', it might be `{ url: "...", caption: "..." }`.
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { _id: false });

// Define the main schema for a blog post.
const blogSchema = new mongoose.Schema(
  {
    // The title of the blog post.
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // The main content of the blog post, now a structured array of content blocks.
    // This allows for rich, varied content where each piece of the blog post
    // is a separate, well-defined object.
    content: [contentBlockSchema],
    // The author of the blog post.
    author: {
      type: String,
      required: true,
    },
    // The category for the blog post.
    category: {
      type: String,
      default: 'General',
    },
    // An array of strings to store tags associated with the blog post.
    tags: [
      {
        type: String,
      },
    ],
  },
  // Mongoose automatically adds 'createdAt' and 'updatedAt' timestamps.
  {
    timestamps: true,
  }
);

// Create the Blog model from the schema.
const Blog = mongoose.model('Blog', blogSchema);

// Export the model so it can be imported and used in other files.
export default Blog;
