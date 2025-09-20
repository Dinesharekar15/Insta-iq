import asyncHandler from 'express-async-handler';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

// @desc    Create a new course
// @route   POST /api/admin/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  console.log("Create course request received");
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  // Extract all fields from request body
  let { title, description, price, duration, category, level, instructor, imageUrl, isActive, details } = req.body;

  // Parse details if it's a JSON string (when sent via FormData)
  if (typeof details === 'string') {
    try {
      details = JSON.parse(details);
    } catch (error) {
      console.log("Error parsing details:", error);
      details = [];
    }
  }

  // Basic validation
  if (!title || !description || price === undefined) {
    res.status(400);
    throw new Error('Please include title, description, and price for the course.');
  }

  // Check if image was uploaded (imageUrl should be set by upload middleware)
  if (!imageUrl) {
    res.status(400);
    throw new Error('Please upload an image for the course.');
  }

  // Check if a course with the same title already exists
  const courseExists = await Course.findOne({ title });

  if (courseExists) {
    res.status(400);
    throw new Error('Course with this title already exists');
  }

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const course = await Course.create({
    title: title.trim(),
    description: description.trim(),
    price: parseFloat(price) || 0,
    duration: duration || 'N/A',
    category: category || 'General',
    level: level ? capitalizeFirstLetter(level) : 'Beginner', // Ensure proper capitalization
    instructor: instructor || 'InstaIQ Team',
    imageUrl, // Use the imageUrl provided by the upload middleware
    isActive: isActive === 'true' || isActive === true,
    details: Array.isArray(details) ? details.filter(detail => detail.trim()) : [],
  });

  if (course) {
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } else {
    res.status(400);
    throw new Error('Invalid course data');
  }
});


// @desc    Update an existing course
// @route   PUT /api/admin/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  let { title, description, price, duration, category, level, instructor, imageUrl, isActive, details } = req.body;
  const courseId = req.params.id;

  // Parse details if it's a JSON string (when sent via FormData)
  if (typeof details === 'string') {
    try {
      details = JSON.parse(details);
    } catch (error) {
      details = undefined; // Keep existing details if parsing fails
    }
  }

  const course = await Course.findById(courseId);

  if (course) {
    // Check if the new title conflicts with another course (excluding itself)
    if (title && title !== course.title) {
      const titleExists = await Course.findOne({ title, _id: { $ne: courseId } });
      if (titleExists) {
        res.status(400);
        throw new Error('Another course with this title already exists');
      }
    }

    // Helper function to capitalize first letter
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    // Update fields only if provided
    course.title = title ? title.trim() : course.title;
    course.description = description ? description.trim() : course.description;
    course.price = price !== undefined ? parseFloat(price) : course.price;
    course.duration = duration || course.duration;
    course.category = category || course.category;
    course.level = level ? capitalizeFirstLetter(level) : course.level; // Ensure proper capitalization
    course.instructor = instructor || course.instructor;
    course.isActive = isActive !== undefined ? (isActive === 'true' || isActive === true) : course.isActive;
    
    // Update imageUrl only if a new one is provided by the upload middleware
    if (imageUrl) {
      course.imageUrl = imageUrl;
    }
    
    // Update details if provided
    if (details !== undefined) {
      course.details = Array.isArray(details) ? details.filter(detail => detail.trim()) : course.details;
    }

    const updatedCourse = await course.save();
    res.json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});


// @desc    Delete a course
// @route   DELETE /api/admin/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  const course = await Course.findById(courseId);

  if (course) {
    // Optional: Add logic here to delete the image from Cloudinary if needed
    // This would involve extracting the public ID from the imageUrl and calling cloudinary.uploader.destroy()

    await Course.deleteOne({ _id: courseId }); // Use deleteOne for Mongoose 6+
    res.json({ message: 'Course removed successfully' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Get all courses with pagination, search, and filtering
// @route   GET /api/admin/courses
// @access  Private/Admin
const getAllCourses = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const category = req.query.category || '';
  const level = req.query.level || '';
  const isActive = req.query.isActive || '';

  const skip = (page - 1) * limit;

  // Build query object
  let query = {};

  // Add search functionality
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { instructor: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } }
    ];
  }

  // Add filters
  if (category && category !== 'all') {
    query.category = category;
  }

  if (level && level !== 'all') {
    query.level = level;
  }

  if (isActive && isActive !== 'all') {
    query.isActive = isActive === 'true';
  }

  try {
    // Get total count for pagination
    const total = await Course.countDocuments(query);
    
    // Get courses with pagination
    const courses = await Course.find(query)
      .populate('purchasedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      courses,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching courses');
  }
});

// @desc    Get all users with pagination and search (Admin capability)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const role = req.query.role || '';
  const status = req.query.status || '';

  // Build search query
  const query = {};
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { mobile: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (role) {
    query.role = role;
  }
  
  if (status) {
    query.status = status;
  }

  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  // Get total count for pagination
  const total = await User.countDocuments(query);

  // Find users with pagination and exclude passwords
  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    }
  });
});

// @desc    Get a single user by ID (optional Admin capability)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select('-password').populate('purchasedCourses', 'title description price imageUrl');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Delete a user (optional Admin capability)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (user) {
    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('Cannot delete your own admin account via this route');
    }
    await User.deleteOne({ _id: userId });
    res.json({ message: 'User removed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getCoursePurchasedByUsers = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  // Find the course and populate the 'purchasedBy' field with user details (excluding passwords)
  const course = await Course.findById(courseId).populate('purchasedBy', 'name email');

  if (course) {
    res.json({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      imageUrl: course.imageUrl,
      purchasedBy: course.purchasedBy, // This will now contain user objects
    });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Create a new user (Admin)
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, role, status } = req.body;

  // Validate required fields
  if (!name || !email || !mobile || !password) {
    res.status(400);
    throw new Error('Please provide name, email, mobile, and password');
  }

  // Validate mobile number format
  if (!/^\d{10}$/.test(mobile)) {
    res.status(400);
    throw new Error('Mobile number must be exactly 10 digits');
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long');
  }

  // Check if user already exists by email
  const userExistsByEmail = await User.findOne({ email });
  if (userExistsByEmail) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  // Check if user already exists by mobile
  const userExistsByMobile = await User.findOne({ mobile });
  if (userExistsByMobile) {
    res.status(400);
    throw new Error('User with this mobile number already exists');
  }

  // Create new user with admin-specified role and status
  const user = await User.create({
    name,
    email,
    mobile,
    password,
    role: role || 'student',
    status: status || 'active'
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Update user (Admin)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  console.log("=== Update User Request ===");
  console.log("User ID:", req.params.id);
  console.log("Request body:", req.body);
  console.log("User making request:", req.user?.email);

  const userId = req.params.id;
  const { name, email, mobile, role, status } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent admin from updating themselves to inactive or changing their role
  if (user._id.toString() === req.user._id.toString()) {
    if (status === 'inactive') {
      res.status(400);
      throw new Error('Cannot deactivate your own admin account');
    }
    if (role && role !== user.role) {
      res.status(400);
      throw new Error('Cannot change your own role');
    }
  }

  // Check if new email conflicts with another user
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      res.status(400);
      throw new Error('Another user with this email already exists');
    }
  }

  // Check if new mobile conflicts with another user
  if (mobile && mobile !== user.mobile) {
    if (!/^\d{10}$/.test(mobile)) {
      res.status(400);
      throw new Error('Mobile number must be exactly 10 digits');
    }
    const mobileExists = await User.findOne({ mobile, _id: { $ne: userId } });
    if (mobileExists) {
      res.status(400);
      throw new Error('Another user with this mobile number already exists');
    }
  }

  // Update fields
  user.name = name || user.name;
  user.email = email || user.email;
  user.mobile = mobile || user.mobile;
  user.role = role || user.role;
  user.status = status || user.status;

  const updatedUser = await user.save();

  res.json({
    success: true,
    message: 'User updated successfully',
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      role: updatedUser.role,
      status: updatedUser.status,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    }
  });
});

export {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCoursePurchasedByUsers,
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
};