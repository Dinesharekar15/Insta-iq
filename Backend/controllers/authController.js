import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt.js';

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email, and password');
  }

  // Validate mobile number format if provided
  if (mobile && !/^\d{10}$/.test(mobile)) {
    res.status(400);
    throw new Error('Mobile number must be exactly 10 digits');
  }

  // Check if user already exists by email
  const userExistsByEmail = await User.findOne({ email });
  if (userExistsByEmail) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  // Check if user already exists by mobile (if mobile is provided)
  if (mobile) {
    const userExistsByMobile = await User.findOne({ mobile });
    if (userExistsByMobile) {
      res.status(400);
      throw new Error('User with this mobile number already exists');
    }
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    mobile: mobile || undefined, // Only include mobile if provided
    password, // Password hashing is handled by the pre-save hook in the User model
  });

  if (user) {
    res.status(201).json({ // Created
      message: 'Registration successful! Welcome to InstaIQ!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  // Check for user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: 'Login successful! Welcome back!',
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
});

// @desc    Send OTP to mobile (placeholder for future implementation)
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  // Validate mobile number
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    res.status(400);
    throw new Error('Please provide a valid 10-digit mobile number');
  }

  // Check if user exists with this mobile number
  const user = await User.findOne({ mobile });
  if (!user) {
    res.status(404);
    throw new Error('No account found with this mobile number');
  }

  // TODO: Implement actual OTP sending logic (SMS service)
  // For now, return success message
  res.json({
    message: 'OTP sent successfully to your mobile number',
    mobile: mobile,
    // In production, you would not return the OTP
    otp: '123456', // Demo OTP for development
  });
});

// @desc    Verify OTP and login (placeholder for future implementation)
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  // Validate input
  if (!mobile || !otp) {
    res.status(400);
    throw new Error('Please provide mobile number and OTP');
  }

  if (!/^\d{10}$/.test(mobile)) {
    res.status(400);
    throw new Error('Please provide a valid 10-digit mobile number');
  }

  if (!/^\d{6}$/.test(otp)) {
    res.status(400);
    throw new Error('Please provide a valid 6-digit OTP');
  }

  // Find user by mobile
  const user = await User.findOne({ mobile });
  if (!user) {
    res.status(404);
    throw new Error('No account found with this mobile number');
  }

  // TODO: Implement actual OTP verification logic
  // For demo purposes, accept any 6-digit OTP
  if (otp === '123456' || otp.length === 6) {
    res.json({
      message: 'OTP verified successfully! Welcome back!',
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid OTP');
  }
});

export { registerUser, loginUser, sendOTP, verifyOTP };
