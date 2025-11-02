import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORD${Date.now().toString().slice(-6)}`
    },
    user: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    },
    course: {
      title: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    },
    orderDate: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0]
    },
    amount: {
      type: String,
      required: true
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'delivered', 'cancelled'],
      default: 'pending',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for better query performance
// Note: orderId already has unique: true, so no separate index needed
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ 'user.email': 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;