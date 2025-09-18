# Insta iQ - Backend API Documentation

Complete backend implementation guide for the Insta iQ education platform, including admin panel and public website APIs.

## 🏗️ Backend Architecture

### Technology Stack
- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: PostgreSQL / MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloud Storage (AWS S3)
- **Email**: Nodemailer
- **Validation**: Joi / Express-validator
- **Documentation**: Swagger/OpenAPI

### Project Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── email.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── eventController.js
│   │   ├── userController.js
│   │   ├── orderController.js
│   │   ├── contentController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Event.js
│   │   ├── Order.js
│   │   ├── Blog.js
│   │   ├── Testimonial.js
│   │   └── FAQ.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── events.js
│   │   ├── users.js
│   │   ├── orders.js
│   │   ├── content.js
│   │   └── analytics.js
│   ├── utils/
│   │   ├── database.js
│   │   ├── email.js
│   │   ├── upload.js
│   │   └── helpers.js
│   └── app.js
├── package.json
├── .env
└── README.md
```

## 🚀 Quick Start

### 1. Installation
```bash
# Clone the repository
git clone <backend-repo-url>
cd instaiq-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### 2. Environment Configuration
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/instaiq_db
# or for MySQL
DATABASE_URL=mysql://username:password@localhost:3306/instaiq_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@instaiq.com

# File Upload Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=instaiq-uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Payment Gateway (Razorpay/Stripe)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Redis (for caching and sessions)
REDIS_URL=redis://localhost:6379

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup
```bash
# Create database
createdb instaiq_db

# Run migrations
npm run migrate

# Seed initial data
npm run seed
```

### 4. Start Development Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 Database Schema

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'super admin')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  avatar_url TEXT,
  bio TEXT,
  date_of_birth DATE,
  gender VARCHAR(10),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  pincode VARCHAR(10),
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

#### Courses Table
```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  duration VARCHAR(100),
  level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category_id INTEGER REFERENCES categories(id),
  instructor_id INTEGER REFERENCES users(id),
  image_url TEXT,
  video_url TEXT,
  certificate_template TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  enrollments INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  language VARCHAR(50) DEFAULT 'English',
  prerequisites TEXT,
  learning_outcomes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_featured ON courses(featured);
```

#### Events Table
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER, -- in minutes
  location VARCHAR(255),
  venue_address TEXT,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  organizer_id INTEGER REFERENCES users(id),
  image_url TEXT,
  video_url TEXT,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  featured BOOLEAN DEFAULT FALSE,
  is_online BOOLEAN DEFAULT FALSE,
  meeting_link TEXT,
  meeting_password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_organizer ON events(organizer_id);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  event_id INTEGER REFERENCES events(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  order_status VARCHAR(20) DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  transaction_id VARCHAR(100),
  gateway_transaction_id VARCHAR(100),
  gateway_response JSONB,
  billing_address JSONB,
  coupon_code VARCHAR(50),
  discount_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_orders_order_id ON orders(order_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

### Supporting Tables

#### Categories Table
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id INTEGER REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Course Enrollments Table
```sql
CREATE TABLE course_enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  order_id INTEGER REFERENCES orders(id),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completion_date TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  certificate_issued BOOLEAN DEFAULT FALSE,
  certificate_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);
```

#### Event Registrations Table
```sql
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  event_id INTEGER REFERENCES events(id),
  order_id INTEGER REFERENCES orders(id),
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  attendance_status VARCHAR(20) DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'attended', 'no_show', 'cancelled')),
  feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  feedback_comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, event_id)
);
```

#### Content Tables
```sql
-- Blog Posts
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  author_id INTEGER REFERENCES users(id),
  category_id INTEGER REFERENCES categories(id),
  featured_image TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP,
  meta_title VARCHAR(255),
  meta_description TEXT,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQs
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Authentication & Authorization

### JWT Implementation
```javascript
// config/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken
};
```

### Authentication Middleware
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || user.status !== 'active') {
      return res.status(401).json({ message: 'Invalid or inactive user' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    
    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole
};
```

## 📡 API Endpoints

### Authentication Routes
```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../middleware/validation');

// Public routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);

// Protected routes
router.post('/logout', authenticateToken, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.put('/change-password', authenticateToken, authController.changePassword);

module.exports = router;
```

### Course Routes
```javascript
// routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/featured', courseController.getFeaturedCourses);
router.get('/:slug', courseController.getCourseBySlug);
router.get('/:id/lessons', courseController.getCourseLessons);

// Protected routes (students)
router.post('/:id/enroll', authenticateToken, courseController.enrollInCourse);
router.get('/enrolled', authenticateToken, courseController.getEnrolledCourses);
router.get('/:id/progress', authenticateToken, courseController.getCourseProgress);

// Admin/Instructor routes
router.post('/', authenticateToken, requireRole(['super admin', 'instructor']), courseController.createCourse);
router.put('/:id', authenticateToken, requireRole(['super admin', 'instructor']), courseController.updateCourse);
router.delete('/:id', authenticateToken, requireRole(['super admin']), courseController.deleteCourse);
router.put('/:id/status', authenticateToken, requireRole(['super admin']), courseController.updateCourseStatus);

module.exports = router;
```

### Event Routes
```javascript
// routes/events.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/:slug', eventController.getEventBySlug);

// Protected routes
router.post('/:id/register', authenticateToken, eventController.registerForEvent);
router.get('/registered', authenticateToken, eventController.getRegisteredEvents);

// Super Admin routes
router.post('/', authenticateToken, requireRole(['super admin']), eventController.createEvent);
router.put('/:id', authenticateToken, requireRole(['super admin']), eventController.updateEvent);
router.delete('/:id', authenticateToken, requireRole(['super admin']), eventController.deleteEvent);

module.exports = router;
```

### User Management Routes
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Super Admin only routes
router.get('/', authenticateToken, requireRole(['super admin']), userController.getAllUsers);
router.post('/', authenticateToken, requireRole(['super admin']), userController.createUser);
router.get('/:id', authenticateToken, requireRole(['super admin']), userController.getUserById);
router.put('/:id', authenticateToken, requireRole(['super admin']), userController.updateUser);
router.delete('/:id', authenticateToken, requireRole(['super admin']), userController.deleteUser);
router.put('/:id/status', authenticateToken, requireRole(['super admin']), userController.updateUserStatus);
router.put('/:id/role', authenticateToken, requireRole(['super admin']), userController.updateUserRole);

module.exports = router;
```

### Order Management Routes
```javascript
// routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// User routes
router.get('/my-orders', authenticateToken, orderController.getMyOrders);
router.get('/:id', authenticateToken, orderController.getOrderById);
router.post('/create-payment', authenticateToken, orderController.createPayment);
router.post('/verify-payment', authenticateToken, orderController.verifyPayment);

// Super Admin routes
router.get('/', authenticateToken, requireRole(['super admin']), orderController.getAllOrders);
router.put('/:id/status', authenticateToken, requireRole(['super admin']), orderController.updateOrderStatus);
router.get('/analytics', authenticateToken, requireRole(['super admin']), orderController.getOrderAnalytics);

module.exports = router;
```

### Content Management Routes
```javascript
// routes/content.js
const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Blog routes
router.get('/blog', contentController.getAllBlogPosts);
router.get('/blog/:slug', contentController.getBlogPostBySlug);
router.post('/blog', authenticateToken, requireRole(['super admin', 'instructor']), contentController.createBlogPost);
router.put('/blog/:id', authenticateToken, requireRole(['super admin', 'instructor']), contentController.updateBlogPost);
router.delete('/blog/:id', authenticateToken, requireRole(['super admin']), contentController.deleteBlogPost);

// Testimonial routes
router.get('/testimonials', contentController.getAllTestimonials);
router.post('/testimonials', authenticateToken, contentController.createTestimonial);
router.put('/testimonials/:id', authenticateToken, requireRole(['super admin']), contentController.updateTestimonial);
router.delete('/testimonials/:id', authenticateToken, requireRole(['super admin']), contentController.deleteTestimonial);

// FAQ routes
router.get('/faqs', contentController.getAllFAQs);
router.post('/faqs', authenticateToken, requireRole(['super admin']), contentController.createFAQ);
router.put('/faqs/:id', authenticateToken, requireRole(['super admin']), contentController.updateFAQ);
router.delete('/faqs/:id', authenticateToken, requireRole(['super admin']), contentController.deleteFAQ);

module.exports = router;
```

### Analytics Routes
```javascript
// routes/analytics.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Super Admin only routes
router.get('/dashboard', authenticateToken, requireRole(['super admin']), analyticsController.getDashboardStats);
router.get('/revenue', authenticateToken, requireRole(['super admin']), analyticsController.getRevenueAnalytics);
router.get('/users', authenticateToken, requireRole(['super admin']), analyticsController.getUserAnalytics);
router.get('/courses', authenticateToken, requireRole(['super admin']), analyticsController.getCourseAnalytics);
router.get('/events', authenticateToken, requireRole(['super admin']), analyticsController.getEventAnalytics);

module.exports = router;
```

## 🎯 Controller Examples

### Auth Controller
```javascript
// controllers/authController.js
const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../config/jwt');
const { sendEmail } = require('../utils/email');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password_hash: hashedPassword,
      phone
    });

    await user.save();

    // Generate tokens
    const token = generateToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Insta iQ',
      template: 'welcome',
      data: { name }
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(400).json({ message: 'Account is not active' });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate tokens
    const token = generateToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar_url
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  // ... other methods
};
```

### Course Controller
```javascript
// controllers/courseController.js
const Course = require('../models/Course');
const CourseEnrollment = require('../models/CourseEnrollment');
const { uploadImage } = require('../utils/upload');

const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, level, search, sort } = req.query;
    
    const query = { status: 'published' };
    
    if (category) query.category_id = category;
    if (level) query.level = level;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const sortOptions = {};
    if (sort === 'price_asc') sortOptions.price = 1;
    if (sort === 'price_desc') sortOptions.price = -1;
    if (sort === 'rating') sortOptions.rating = -1;
    if (sort === 'newest') sortOptions.created_at = -1;
    
    const courses = await Course.find(query)
      .populate('instructor_id', 'name email')
      .populate('category_id', 'name')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Course.countDocuments(query);
    
    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    
    // Handle image upload
    if (req.file) {
      const imageUrl = await uploadImage(req.file, 'courses');
      courseData.image_url = imageUrl;
    }
    
    // Generate slug
    courseData.slug = generateSlug(courseData.title);
    
    const course = new Course({
      ...courseData,
      instructor_id: req.user.id
    });
    
    await course.save();
    
    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  // ... other methods
};
```

## 🔧 Utility Functions

### Email Service
```javascript
// utils/email.js
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const loadTemplate = async (templateName) => {
  const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  return handlebars.compile(templateContent);
};

const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const compiledTemplate = await loadTemplate(template);
    const html = compiledTemplate(data);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    };
    
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

module.exports = {
  sendEmail
};
```

### File Upload Service
```javascript
// utils/upload.js
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const sharp = require('sharp');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const uploadImage = async (file, folder = 'general') => {
  try {
    // Resize and optimize image
    const optimizedImage = await sharp(file.buffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: optimizedImage,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
    
    await s3Client.send(new PutObjectCommand(uploadParams));
    
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

module.exports = {
  uploadImage
};
```

## 🧪 Testing

### API Testing Setup
```javascript
// tests/api.test.js
const request = require('supertest');
const app = require('../src/app');
const { connectDB, closeDB } = require('../src/config/database');

describe('Auth API', () => {
  beforeAll(async () => {
    await connectDB();
  });
  
  afterAll(async () => {
    await closeDB();
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '+1234567890'
      };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
    });
  });
});
```

## 🚀 Deployment

### Production Setup
```bash
# Install PM2 for process management
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'instaiq-backend',
    script: './src/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

### Docker Setup
```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/instaiq_db
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: instaiq_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## 📊 Monitoring & Logging

### Winston Logger Setup
```javascript
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'instaiq-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

## 🔒 Security Best Practices

### Rate Limiting
```javascript
// middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

module.exports = { authLimiter, apiLimiter };
```

### CORS Configuration
```javascript
// middleware/cors.js
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
```

## 📝 API Documentation

### Swagger Setup
```javascript
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Insta iQ API',
      version: '1.0.0',
      description: 'API documentation for Insta iQ education platform'
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
```

This comprehensive backend README provides everything needed to implement a complete backend API for the Insta iQ platform, including all the features for both the public website and admin panel. 