// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
    // MongoDB Atlas connection options (updated for newer versions)
    const options = {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ MongoDB Atlas connected successfully');
    console.log('🌐 Database:', mongoose.connection.name);
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    
    if (err.message.includes('<db_password>')) {
      console.log('🔑 Please replace <db_password> in your MONGO_URI with your actual database password');
    } else if (err.message.includes('authentication failed')) {
      console.log('🔑 Authentication failed - please check your username and password');
    } else if (err.message.includes('network')) {
      console.log('🌐 Network error - please check your internet connection');
    }
    
    console.log('⚠️  Server will continue running without database connection');
    console.log('🔧 MongoDB Atlas URI format: mongodb+srv://username:password@cluster.mongodb.net/database');
    // Don't exit - let server run for testing API endpoints
  }
};

export default connectDB;
