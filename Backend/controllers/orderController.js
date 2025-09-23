import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Course from '../models/courseModel.js';

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    courseId,
    amount
  } = req.body;

  // Validate required fields
  if (!courseId || amount === undefined) {
    res.status(400);
    throw new Error('Course ID and amount are required');
  }

  // Verify course exists and get details
  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Check if user already has this course
  const existingOrder = await Order.findOne({
    'user.email': req.user.email,
    'course.title': courseExists.title,
    orderStatus: { $in: ['completed', 'processing'] }
  });

  if (existingOrder) {
    res.status(400);
    throw new Error('You have already purchased this course or have a pending order for it');
  }

  // Create order with embedded user and course data
  const order = await Order.create({
    user: {
      name: req.user.name,
      email: req.user.email,
      phone: req.user.mobile || req.user.phone || 'N/A'
    },
    course: {
      title: courseExists.title,
      price: courseExists.price,
      image: courseExists.imageUrl || courseExists.image || ''
    },
    amount,
    orderStatus: 'pending'
  });

  res.status(201).json({
    message: 'Order created successfully',
    order
  });
});

// @desc    Get all orders (Admin only)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build query
  let query = {};
  
  // Filter by status if provided
  if (req.query.status) {
    query.orderStatus = req.query.status;
  }
  
  // Search functionality
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    query.$or = [
      { orderId: searchRegex },
      { 'user.name': searchRegex },
      { 'user.email': searchRegex },
      { 'course.title': searchRegex }
    ];
  }

  // Get total count for pagination
  const totalOrders = await Order.countDocuments(query);

  // Get orders with pagination
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  // Calculate statistics
  const stats = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $cond: [
              { $eq: ['$orderStatus', 'completed'] },
              '$amount',
              0
            ]
          }
        },
        pendingOrders: {
          $sum: {
            $cond: [{ $eq: ['$orderStatus', 'pending'] }, 1, 0]
          }
        },
        completedOrders: {
          $sum: {
            $cond: [{ $eq: ['$orderStatus', 'completed'] }, 1, 0]
          }
        }
      }
    }
  ]);

  res.json({
    orders,
    pagination: {
      page,
      limit,
      total: totalOrders,
      pages: Math.ceil(totalOrders / limit)
    },
    stats: stats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      completedOrders: 0
    }
  });
});

// @desc    Get user's orders
// @route   GET /api/orders/my-orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ 'user.email': req.user.email })
    .sort({ createdAt: -1 });

  res.json({
    message: 'Orders fetched successfully',
    orders
  });
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check if user owns this order or is admin
  if (order.user.email !== req.user.email && !['admin', 'super admin'].includes(req.user.role)) {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  res.json({
    message: 'Order fetched successfully',
    order
  });
});

// @desc    Update order status (Admin only)
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error('Status is required');
  }

  const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Update status
  order.orderStatus = status;
  await order.save();

  res.json({
    message: 'Order status updated successfully',
    order
  });
});

// @desc    Delete order (Admin only)
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Only allow deletion of pending or cancelled orders
  if (!['pending', 'cancelled'].includes(order.orderStatus)) {
    res.status(400);
    throw new Error('Cannot delete orders that are processing or delivered');
  }

  await Order.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Order deleted successfully'
  });
});

// @desc    Get order statistics (Admin only)
// @route   GET /api/admin/orders/stats
// @access  Private/Admin
const getOrderStats = asyncHandler(async (req, res) => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $cond: [
              { $eq: ['$orderStatus', 'completed'] },
              '$amount',
              0
            ]
          }
        },
        averageOrderValue: {
          $avg: '$amount'
        },
        pendingOrders: {
          $sum: {
            $cond: [{ $eq: ['$orderStatus', 'pending'] }, 1, 0]
          }
        },
        processingOrders: {
          $sum: {
            $cond: [{ $eq: ['$orderStatus', 'processing'] }, 1, 0]
          }
        },
        completedOrders: {
          $sum: {
            $cond: [{ $eq: ['$orderStatus', 'completed'] }, 1, 0]
          }
        },
        cancelledOrders: {
          $sum: {
            $cond: [{ $eq: ['$orderStatus', 'cancelled'] }, 1, 0]
          }
        }
      }
    }
  ]);

  // Get monthly revenue data for charts
  const monthlyStats = await Order.aggregate([
    {
      $match: {
        orderStatus: 'completed',
        createdAt: {
          $gte: new Date(new Date().getFullYear(), 0, 1) // From start of current year
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        revenue: { $sum: '$amount' },
        orders: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);

  res.json({
    overview: stats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0
    },
    monthlyStats
  });
});

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
};