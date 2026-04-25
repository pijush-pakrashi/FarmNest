/**
 * Backend Express Server with Razorpay Integration
 * File location: backend/server.js
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// ==================== MIDDLEWARE ====================
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev server
    'http://localhost:5000', // Backend
    process.env.FRONTEND_URL, // Production frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ==================== RAZORPAY SETUP ====================
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==================== PAYMENT ROUTES ====================

/**
 * Create Razorpay Order
 * POST /api/payments/create-order
 */
app.post('/api/payments/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, customer_details } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
      });
    }

    const options = {
      amount: Math.round(amount),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      customer_notify: 1,
      notes: {
        customerEmail: customer_details?.email,
        customerPhone: customer_details?.phone,
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      razorpayOrderId: order.id,
      customerId: order.customer_id,
      receipt: order.receipt,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
});

/**
 * Verify Razorpay Payment
 * POST /api/payments/verify-payment
 */
app.post('/api/payments/verify-payment', async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details',
      });
    }

    // Verify signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpaySignature;

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment signature verification failed',
      });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpayPaymentId);

    if (payment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: 'Payment not captured',
      });
    }

    // TODO: Save payment details to database
    // await PaymentModel.create({
    //   razorpayOrderId,
    //   razorpayPaymentId,
    //   amount: payment.amount,
    //   currency: payment.currency,
    //   status: 'success',
    // });

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
});

/**
 * Get Payment Status
 * GET /api/payments/status/:paymentId
 */
app.get('/api/payments/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required',
      });
    }

    const payment = await razorpay.payments.fetch(paymentId);

    res.status(200).json({
      success: true,
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      description: payment.description,
      createdAt: payment.created_at,
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment status',
      error: error.message,
    });
  }
});

/**
 * Refund Payment
 * POST /api/payments/refund
 */
app.post('/api/payments/refund', async (req, res) => {
  try {
    const { paymentId, amount, reason } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required',
      });
    }

    const refundOptions = {
      notes: {
        reason: reason || 'Customer requested refund',
      },
    };

    if (amount) {
      refundOptions.amount = Math.round(amount);
    }

    const refund = await razorpay.payments.refund(paymentId, refundOptions);

    res.status(200).json({
      success: true,
      message: 'Refund initiated successfully',
      refundId: refund.id,
      amount: refund.amount,
      status: refund.status,
    });
  } catch (error) {
    console.error('Error refunding payment:', error);
    res.status(500).json({
      success: false,
      message: 'Refund failed',
      error: error.message,
    });
  }
});

/**
 * Capture Payment
 * POST /api/payments/capture
 */
app.post('/api/payments/capture', async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    if (!paymentId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID and amount are required',
      });
    }

    const payment = await razorpay.payments.capture(paymentId, Math.round(amount));

    res.status(200).json({
      success: true,
      message: 'Payment captured successfully',
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount,
    });
  } catch (error) {
    console.error('Error capturing payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment capture failed',
      error: error.message,
    });
  }
});

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 Agri Market Backend Server Started ║
╚════════════════════════════════════════╝
  
✓ Server running on port: ${PORT}
✓ Environment: ${process.env.NODE_ENV || 'development'}
✓ Razorpay Integration: Enabled
✓ CORS: Enabled

📍 API Base URL: http://localhost:${PORT}
📍 Health Check: http://localhost:${PORT}/api/health

Press Ctrl+C to stop the server
  `);
});

module.exports = app;
