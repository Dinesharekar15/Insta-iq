# Insta iQ - Education Platform

A comprehensive React-based education platform for career guidance, course management, and placement preparation.

## 🚀 Features

### Frontend Features
- **Modern React Application** with Vite build tool
- **Responsive Design** - Works on desktop, tablet, and mobile
- **User Authentication** - Login/Register system
- **Course Management** - Browse and enroll in courses
- **Event Management** - Workshops and training events
- **Blog System** - Educational content and articles
- **User Dashboard** - Personal learning progress

### Admin Panel Features
- **Comprehensive Dashboard** - Analytics and overview
- **Course Management** - CRUD operations for courses
- **Event Management** - Schedule and manage events
- **User Management** - Manage students and instructors
- **Order Management** - Track course purchases and payments
- **Content Management** - Blog posts, testimonials, FAQs
- **Settings Management** - System configuration

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instaiq-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   VITE_BACKEND_URL=http://localhost:5000/api
   VITE_APP_NAME=Insta iQ
   VITE_APP_VERSION=1.0.0
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Admin Panel: http://localhost:5173/admin

## 🔧 Backend Integration

### Required Backend API Endpoints

The admin panel expects the following API endpoints to be implemented in your backend:

#### Authentication Endpoints
```javascript
// POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "role": "super admin|instructor|student"
  }
}
```

#### Course Management Endpoints
```javascript
// GET /api/courses - Get all courses
// POST /api/courses - Create new course
// GET /api/courses/:id - Get course by ID
// PUT /api/courses/:id - Update course
// DELETE /api/courses/:id - Delete course

// Course Schema
{
  "id": 1,
  "title": "Course Title",
  "description": "Course description",
  "price": "₹4,500",
  "duration": "6 months",
  "category": "Aptitude",
  "instructor": "Instructor Name",
  "image": "course-image-url.jpg",
  "status": "active|inactive",
  "enrollments": 1250,
  "rating": 4.8,
  "createdAt": "2024-01-15"
}
```

#### Event Management Endpoints
```javascript
// GET /api/events - Get all events
// POST /api/events - Create new event
// GET /api/events/:id - Get event by ID
// PUT /api/events/:id - Update event
// DELETE /api/events/:id - Delete event

// Event Schema
{
  "id": 1,
  "title": "Event Title",
  "description": "Event description",
  "date": "2024-02-15",
  "time": "09:00",
  "location": "Nagpur, India",
  "capacity": 100,
  "price": "₹1,500",
  "category": "Workshop",
  "image": "event-image-url.jpg",
  "status": "upcoming|ongoing|completed|cancelled",
  "registrations": 75,
  "createdAt": "2024-01-01"
}
```

#### User Management Endpoints
```javascript
// GET /api/users - Get all users
// POST /api/users - Create new user
// GET /api/users/:id - Get user by ID
// PUT /api/users/:id - Update user
// DELETE /api/users/:id - Delete user

// User Schema
{
  "id": 1,
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+91 98765 43210",
  "role": "student|instructor|super admin",
  "status": "active|inactive",
  "joinDate": "2024-01-01",
  "lastLogin": "2024-01-15",
  "coursesEnrolled": 3,
  "avatar": "user-avatar-url.jpg"
}
```

#### Order Management Endpoints
```javascript
// GET /api/orders - Get all orders
// GET /api/orders/:id - Get order by ID
// PUT /api/orders/:id - Update order status
// POST /api/orders - Create new order

// Order Schema
{
  "id": "ORD001",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210"
  },
  "course": {
    "id": 1,
    "title": "Course Title",
    "price": "₹4,500",
    "image": "course-image-url.jpg"
  },
  "orderDate": "2024-01-15",
  "paymentDate": "2024-01-15",
  "amount": "₹4,500",
  "paymentMethod": "Credit Card",
  "paymentStatus": "completed|pending|failed",
  "orderStatus": "pending|processing|delivered|cancelled",
  "transactionId": "TXN123456789"
}
```

#### Content Management Endpoints
```javascript
// Blog Posts
// GET /api/blog - Get all blog posts
// POST /api/blog - Create new blog post
// GET /api/blog/:id - Get blog post by ID
// PUT /api/blog/:id - Update blog post
// DELETE /api/blog/:id - Delete blog post

// Testimonials
// GET /api/testimonials - Get all testimonials
// POST /api/testimonials - Create new testimonial
// GET /api/testimonials/:id - Get testimonial by ID
// PUT /api/testimonials/:id - Update testimonial
// DELETE /api/testimonials/:id - Delete testimonial

// FAQs
// GET /api/faqs - Get all FAQs
// POST /api/faqs - Create new FAQ
// GET /api/faqs/:id - Get FAQ by ID
// PUT /api/faqs/:id - Update FAQ
// DELETE /api/faqs/:id - Delete FAQ
```

#### Analytics Endpoints
```javascript
// GET /api/analytics/dashboard - Get dashboard statistics
{
  "totalUsers": 1250,
  "totalCourses": 45,
  "totalEvents": 12,
  "totalRevenue": 125000,
  "recentOrders": [...],
  "recentUsers": [...]
}

// GET /api/analytics/revenue - Get revenue analytics
// GET /api/analytics/users - Get user analytics
// GET /api/analytics/courses - Get course analytics
```

### Backend Technology Stack Recommendations

#### Node.js/Express Backend
```javascript
// Example Express.js setup
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'super admin') {
  return res.status(403).json({ message: 'Super Admin access required' });
}
  next();
};
```

#### Database Schema (PostgreSQL/MySQL)
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'student',
  status VARCHAR(20) DEFAULT 'active',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  duration VARCHAR(100),
  category VARCHAR(100),
  instructor_id INTEGER REFERENCES users(id),
  image_url TEXT,
  status VARCHAR(20) DEFAULT 'active',
  enrollments INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255),
  capacity INTEGER,
  price DECIMAL(10,2),
  category VARCHAR(100),
  image_url TEXT,
  status VARCHAR(20) DEFAULT 'upcoming',
  registrations INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending',
  order_status VARCHAR(20) DEFAULT 'pending',
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Environment Variables for Backend
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/instaiq_db
# or
DATABASE_URL=mysql://username:password@localhost:3306/instaiq_db

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development

# File Upload (if using cloud storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket_name

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```javascript
// Token payload
{
  "userId": 1,
  "email": "admin@instaiq.com",
"role": "super admin",
  "iat": 1642234567,
  "exp": 1642839367
}
```

### Role-Based Access Control
- **Super Admin**: Full access to all features
- **Instructor**: Course and content management
- **Student**: Limited access to personal data

## 📱 API Integration in Frontend

### Axios Configuration
```javascript
// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userInfo');
    if (token) {
      const userInfo = JSON.parse(token);
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Example API Calls
```javascript
// Course management
export const getCourses = () => api.get('/courses');
export const createCourse = (courseData) => api.post('/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// User management
export const getUsers = () => api.get('/users');
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Analytics
export const getDashboardStats = () => api.get('/analytics/dashboard');
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your_production_db_url
heroku config:set JWT_SECRET=your_production_jwt_secret

# Deploy
git push heroku main
```

## 🧪 Testing

### Frontend Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
# Run API tests
npm test

# Run integration tests
npm run test:integration
```

## 📝 API Documentation

For detailed API documentation, refer to the backend repository or use tools like:
- **Swagger/OpenAPI** for API documentation
- **Postman** for API testing
- **Insomnia** for API development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: support@instaiq.com
- Documentation: [docs.instaiq.com](https://docs.instaiq.com)

## 🔄 Version History

- **v1.0.0** - Initial release with basic features
- **v1.1.0** - Added admin panel
- **v1.2.0** - Enhanced course management
- **v1.3.0** - Added event management and analytics

---

**Made with ❤️ by the Insta iQ Team**
