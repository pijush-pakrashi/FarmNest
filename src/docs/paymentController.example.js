/**
 * Backend Payment Controller for Razorpay Integration
 * Place this in: backend/controllers/paymentController.js
 */

const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create Razorpay Order
 * POST /api/payments/create-order
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, customer_details } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
      });
    }

    // Create order in Razorpay
    const options = {
      amount: Math.round(amount), // Already in paise from frontend
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      customer_notify: 1,
      notes: {
        customerEmail: customer_details?.email,
        customerPhone: customer_details?.phone,
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      razorpayOrderId: order.id,
      customerId: order.customer_id,
      receipt: order.receipt,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

/**
 * Verify Razorpay Payment
 * POST /api/payments/verify-payment
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Validate inputs
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details',
      });
    }

    // Generate signature for verification
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    // Verify signature
    const isSignatureValid = expectedSignature === razorpaySignature;

    if (!isSignatureValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment signature verification failed',
      });
    }

    // Fetch payment details from Razorpay for additional verification
    const payment = await razorpay.payments.fetch(razorpayPaymentId);

    if (payment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: 'Payment not captured',
      });
    }

    return res.status(200).json({
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
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};

/**
 * Get Payment Status
 * GET /api/payments/status/:paymentId
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required',
      });
    }

    const payment = await razorpay.payments.fetch(paymentId);

    return res.status(200).json({
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
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch payment status',
      error: error.message,
    });
  }
};

/**
 * Refund Payment
 * POST /api/payments/refund
 */
exports.refundPayment = async (req, res) => {
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

    // If partial refund amount is specified
    if (amount) {
      refundOptions.amount = Math.round(amount);
    }

    const refund = await razorpay.payments.refund(paymentId, refundOptions);

    return res.status(200).json({
      success: true,
      message: 'Refund initiated successfully',
      refundId: refund.id,
      amount: refund.amount,
      status: refund.status,
    });
  } catch (error) {
    console.error('Error refunding payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Refund failed',
      error: error.message,
    });
  }
};

/**
 * Capture Payment
 * POST /api/payments/capture
 */
exports.capturePayment = async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    if (!paymentId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID and amount are required',
      });
    }

    const payment = await razorpay.payments.capture(paymentId, Math.round(amount));

    return res.status(200).json({
      success: true,
      message: 'Payment captured successfully',
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount,
    });
  } catch (error) {
    console.error('Error capturing payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment capture failed',
      error: error.message,
    });
  }
};
