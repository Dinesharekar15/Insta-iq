import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} from '../controllers/orderController.js';
import { protect, authorizeRoles } from '../middelwares/auth.js';

const router = express.Router();

// Public routes (none for orders - all require authentication)

// Protected routes (logged-in users)
router.use(protect); // All routes below require authentication

// User order routes
router.route('/')
  .post(createOrder); // Create a new order

router.route('/my-orders')
  .get(getUserOrders); // Get current user's orders

router.route('/:id')
  .get(getOrderById); // Get single order by ID (user must own it or be admin)

// Admin-only routes
router.use(authorizeRoles('admin', 'super admin')); // All routes below require admin role

// Admin order management routes
router.route('/admin/all')
  .get(getAllOrders); // Get all orders with pagination and filters

router.route('/admin/stats')
  .get(getOrderStats); // Get order statistics

router.route('/admin/:id')
  .delete(deleteOrder); // Delete an order

router.route('/admin/:id/status')
  .put(updateOrderStatus); // Update order status

export default router;