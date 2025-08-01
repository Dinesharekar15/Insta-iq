import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js'; // Import the Blog model

// @desc    Create a new blog post
// @route   POST /api/admin/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  // Destructure the request body.
  // 'content' is now expected to be an array of content blocks,
  // not a single string.
  const { title, content, author, category, tags } = req.body;
  
  console.log('Creating blog with data:', { title, content, author, category, tags });
  
  // Basic validation: Ensure required fields are present.
  // The 'content' field is now a structured array, but the check for its existence
  // still works as long as the array is not null or undefined.
  if (!title || !author) {
    res.status(400);
    throw new Error('Please fill all required blog fields (title, author).');
  }

  // Check if a blog with the same title already exists
  const blogExists = await Blog.findOne({ title });

  if (blogExists) {
    res.status(400);
    throw new Error('Blog post with this title already exists');
  }

  // Create the new blog post. Mongoose will automatically handle
  // saving the 'content' array of objects into the database.
  const blog = await Blog.create({
    title,
    content, // This should be an array of structured content objects
    author,
    category: category || 'General',
    tags: tags || [], // Ensure tags is an array, default to empty
  });

  if (blog) {
    res.status(201).json({
      message: 'Blog post created successfully',
      blog,
    });
  } else {
    res.status(400);
    throw new Error('Invalid blog post data');
  }
});

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = asyncHandler(async (req, res) => {
  // Retrieve all blog posts. Mongoose will return the structured content array
  // automatically as part of each blog document.
  const blogs = await Blog.find({});

  if (blogs) {
    res.json(blogs);
  } else {
    res.status(404);
    throw new Error('No blog posts found');
  }
});

// @desc    Get a single blog post by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  // Find a blog post by its ID.
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Update an existing blog post
// @route   PUT /api/admin/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  // Destructure the request body.
  const { title, content, author, category, tags } = req.body;
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);

  if (blog) {
    // Check if the new title conflicts with another blog (excluding itself)
    if (title && title !== blog.title) {
      const titleExists = await Blog.findOne({ title, _id: { $ne: blogId } });
      if (titleExists) {
        res.status(400);
        throw new Error('Another blog post with this title already exists');
      }
    }

    blog.title = title || blog.title;
    // The content is now an array. This assignment will replace the old array
    // with the new one from the request body.
    if (content !== undefined) {
      blog.content = content;
    }
    blog.author = author || blog.author;
    blog.category = category || blog.category;
    
    // Update tags if provided (allow setting to empty array)
    if (tags !== undefined) {
      blog.tags = tags;
    }

    const updatedBlog = await blog.save();
    res.json({
      message: 'Blog post updated successfully',
      blog: updatedBlog,
    });
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/admin/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);

  if (blog) {
    // Optional: Add logic here to delete the image from Cloudinary if needed
    await Blog.deleteOne({ _id: blogId });
    res.json({ message: 'Blog post removed successfully' });
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

export {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
