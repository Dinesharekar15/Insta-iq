import express from 'express';

const router = express.Router();

// Test route that doesn't require database
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API is working properly!',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        sendOtp: 'POST /api/auth/send-otp',
        verifyOtp: 'POST /api/auth/verify-otp'
      }
    }
  });
});

export default router;