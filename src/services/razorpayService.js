/**
 * Razorpay Payment Service
 * Handles all Razorpay payment integration logic
 */

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Create a Razorpay order on the backend
 */
export const createRazorpayOrder = async (amount, orderId, customerEmail, customerPhone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `REC_${orderId}_${Date.now()}`,
        customer_details: {
          email: customerEmail,
          phone: customerPhone,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

/**
 * Verify Razorpay payment on the backend
 */
export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

/**
 * Open Razorpay checkout modal
 */
export const openRazorpayCheckout = (options) => {
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      ...options,
      handler: (response) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment modal closed by user'));
        },
      },
    });

    rzp.open();
  });
};

/**
 * Initialize and process Razorpay payment
 */
export const processRazorpayPayment = async (paymentConfig) => {
  const {
    amount,
    orderId,
    customerName,
    customerEmail,
    customerPhone,
    description,
    prefill = {},
  } = paymentConfig;

  try {
    // Load Razorpay script if not already loaded
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script');
    }

    // Create order on backend
    const orderData = await createRazorpayOrder(amount, orderId, customerEmail, customerPhone);

    // Prepare checkout options
    const checkoutOptions = {
      key: RAZORPAY_KEY_ID,
      amount: Math.round(amount * 100), // Amount in paise
      currency: 'INR',
      name: 'Agri Market',
      description: description || 'Farm Fresh Produce Order',
      order_id: orderData.razorpayOrderId, // Backend order ID
      customer_id: orderData.customerId || undefined,
      receipt: orderData.receipt,
      prefill: {
        name: customerName || prefill.name || '',
        email: customerEmail || prefill.email || '',
        contact: customerPhone || prefill.contact || '',
      },
      notes: {
        orderId,
        customerEmail,
        customerPhone,
      },
      theme: {
        color: '#16a34a', // Green theme color
      },
      timeout: 600, // 10 minutes
      readonly: {
        contact: false,
        email: false,
      },
    };

    // Open Razorpay checkout
    const response = await openRazorpayCheckout(checkoutOptions);

    // Verify payment on backend
    const verificationData = await verifyRazorpayPayment({
      razorpayOrderId: orderData.razorpayOrderId,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
    });

    if (verificationData.success) {
      return {
        success: true,
        paymentId: response.razorpay_payment_id,
        orderId: orderData.razorpayOrderId,
        message: 'Payment successful!',
      };
    } else {
      throw new Error('Payment verification failed');
    }
  } catch (error) {
    console.error('Razorpay payment error:', error);
    throw error;
  }
};

/**
 * Get payment status
 */
export const getPaymentStatus = async (paymentId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/payments/status/${paymentId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch payment status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
};

/**
 * Refund a payment
 */
export const refundPayment = async (paymentId, amount, reason) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/payments/refund`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          amount: Math.round(amount * 100), // Convert to paise
          reason,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Refund failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Refund error:', error);
    throw error;
  }
};
