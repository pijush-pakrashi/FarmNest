// Pages/payment.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { processRazorpayPayment } from '../services/razorpayService';
import toast from 'react-hot-toast';
import {
  CreditCard,
  Wallet,
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Banknote,
  Truck,
  PackageCheck
} from 'lucide-react';

const Payment = ({ clearCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, cartItems, total } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCardNumberChange = (e) => {
    setError('');
  };

  const handleExpiryDateChange = (e) => {
    setError('');
  };

  const handleCvvChange = (e) => {
    setError('');
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError('');

      const orderId = 'ORD-' + Date.now();

      if (selectedMethod === 'card' || selectedMethod === 'upi') {
        // Process payment through Razorpay
        const paymentConfig = {
          amount: total,
          orderId,
          customerName: formData?.name || 'Customer',
          customerEmail: formData?.email || 'customer@example.com',
          customerPhone: formData?.phone || '9999999999',
          description: `Order ${orderId} - Farm Fresh Produce`,
          prefill: {
            name: formData?.name,
            email: formData?.email,
            contact: formData?.phone,
          },
        };

        // Add method-specific options
        if (selectedMethod === 'upi') {
          paymentConfig.method = 'upi';
        }

        // Process Razorpay payment
        const paymentResult = await processRazorpayPayment(paymentConfig);

        if (paymentResult.success) {
          // Save order to localStorage
          const newOrder = {
            orderId,
            paymentId: paymentResult.paymentId,
            razorpayOrderId: paymentResult.orderId,
            formData,
            total,
            cartItems,
            paymentMethod: selectedMethod,
            paymentStatus: 'success',
            date: new Date().toISOString(),
          };
          const existing = JSON.parse(localStorage.getItem('orders') || '[]');
          localStorage.setItem('orders', JSON.stringify([newOrder, ...existing]));

          // Clear cart
          localStorage.removeItem('cart');
          if (typeof clearCart === 'function') clearCart();

          // Show success toast
          toast.success('Payment successful!');

          // Navigate to success page
          navigate('/success', {
            state: {
              orderId,
              formData,
              total,
              cartItems,
              paymentId: paymentResult.paymentId,
            },
          });
        }
      } else if (selectedMethod === 'cod') {
        // Handle COD - no payment processing needed
        const newOrder = {
          orderId,
          formData,
          total,
          cartItems,
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          date: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([newOrder, ...existing]));

        // Clear cart
        localStorage.removeItem('cart');
        if (typeof clearCart === 'function') clearCart();

        // Show success toast
        toast.success('Order placed! Pay on delivery.');

        // Navigate to success page
        navigate('/success', {
          state: {
            orderId,
            formData,
            total,
            cartItems,
            paymentMethod: 'cod',
          },
        });
      }
    } catch (err) {
      setIsProcessing(false);
      const errorMessage = err.message || 'Payment failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (!formData || !cartItems) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-medium">Missing payment information</p>
          <Link to="/cart" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            Return to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">
      <motion.div
        className="max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-8">
          <Link
            to="/checkout"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Checkout</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-8">Payment</h1>

        <div className="space-y-6">
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <p className="text-sm font-medium text-gray-600 mb-4">Amount to Pay</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Clock size={16} />
                    <span>Processing time: ~2 mins</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-4">Select Payment Method</p>
                <div className="grid gap-3">
                  {/* Card Option */}
                  <div
                    className={`relative flex items-center gap-4 p-4 rounded-lg cursor-pointer border-2 transition-all ${selectedMethod === 'card'
                      ? 'border-green-500 bg-green-50/50'
                      : 'border-gray-200 hover:border-green-200'
                      }`}
                    onClick={() => { setSelectedMethod('card'); setError(''); }}
                  >
                    <div className={`p-2 rounded-full ${selectedMethod === 'card' ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <CreditCard className={`w-6 h-6 ${selectedMethod === 'card' ? 'text-green-600' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${selectedMethod === 'card' ? 'text-green-700' : 'text-gray-700'}`}>Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">All major cards accepted</p>
                    </div>
                    {selectedMethod === 'card' && (
                      <div className="absolute right-4"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                    )}
                  </div>

                  {/* UPI Option */}
                  <div
                    className={`relative flex items-center gap-4 p-4 rounded-lg cursor-pointer border-2 transition-all ${selectedMethod === 'upi'
                      ? 'border-green-500 bg-green-50/50'
                      : 'border-gray-200 hover:border-green-200'
                      }`}
                    onClick={() => { setSelectedMethod('upi'); setError(''); }}
                  >
                    <div className={`p-2 rounded-full ${selectedMethod === 'upi' ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Wallet className={`w-6 h-6 ${selectedMethod === 'upi' ? 'text-green-600' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${selectedMethod === 'upi' ? 'text-green-700' : 'text-gray-700'}`}>UPI Payment</p>
                      <p className="text-sm text-gray-500">GPay, PhonePe, Paytm & more</p>
                    </div>
                    {selectedMethod === 'upi' && (
                      <div className="absolute right-4"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                    )}
                  </div>

                  {/* Cash on Delivery Option */}
                  <div
                    className={`relative flex items-center gap-4 p-4 rounded-lg cursor-pointer border-2 transition-all ${selectedMethod === 'cod'
                      ? 'border-green-500 bg-green-50/50'
                      : 'border-gray-200 hover:border-green-200'
                      }`}
                    onClick={() => { setSelectedMethod('cod'); setError(''); }}
                  >
                    <div className={`p-2 rounded-full ${selectedMethod === 'cod' ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Banknote className={`w-6 h-6 ${selectedMethod === 'cod' ? 'text-green-600' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${selectedMethod === 'cod' ? 'text-green-700' : 'text-gray-700'}`}>Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                    {selectedMethod === 'cod' && (
                      <div className="absolute right-4"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Form - Razorpay Checkout */}
              {selectedMethod === 'card' && (
                <motion.div className="space-y-4 pt-4 border-t border-gray-100" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="font-medium text-blue-800">Secure Card Payment via Razorpay</p>
                        <p className="text-sm text-blue-700">Your card details will be securely handled by Razorpay. Click "Pay Now" to proceed to the secure payment gateway.</p>
                        <p className="text-sm text-blue-600 font-medium">Accepted cards: Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* UPI Form */}
              {selectedMethod === 'upi' && (
                <UpiPaymentForm total={total} onPay={handlePayment} isProcessing={isProcessing} error={error} setError={setError} />
              )}

              {/* COD Confirmation */}
              {selectedMethod === 'cod' && (
                <motion.div className="pt-4 border-t border-gray-100 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Banknote className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="font-medium text-amber-800">Cash on Delivery Details</p>
                        <ul className="text-sm text-amber-700 space-y-1">
                          <li className="flex items-center gap-2"><span>•</span> Pay <strong>₹{total.toLocaleString('en-IN')}</strong> in cash when your order arrives</li>
                          <li className="flex items-center gap-2"><span>•</span> Please keep exact change ready</li>
                          <li className="flex items-center gap-2"><span>•</span> Our delivery agent will provide a receipt</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                      <Truck className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Delivery</p>
                        <p className="text-sm font-medium text-gray-800">30–60 Min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                      <PackageCheck className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="text-sm font-medium text-gray-800">On Delivery</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Card Pay Button */}
              {selectedMethod === 'card' && (
                <>
                  {error && (
                    <motion.p className="mt-4 text-red-600 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <AlertCircle size={16} /> {error}
                    </motion.p>
                  )}
                  <button disabled={isProcessing} onClick={handlePayment}
                    className={`w-full py-4 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${isProcessing ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                      }`}
                  >
                    {isProcessing ? (
                      <><div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> Processing Payment...</>
                    ) : (
                      <><CreditCard size={20} /> Pay ₹{total.toLocaleString('en-IN')}</>
                    )}
                  </button>
                </>
              )}

              {/* COD Place Order Button */}
              {selectedMethod === 'cod' && (
                <>
                  {error && (
                    <motion.p className="mt-4 text-red-600 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <AlertCircle size={16} /> {error}
                    </motion.p>
                  )}
                  <button disabled={isProcessing} onClick={handlePayment}
                    className={`w-full py-4 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${isProcessing ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 hover:shadow-lg'
                      }`}
                  >
                    {isProcessing ? (
                      <><div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> Placing Order...</>
                    ) : (
                      <><Banknote size={20} /> Place Order — Pay ₹{total.toLocaleString('en-IN')} on Delivery</>
                    )}
                  </button>
                </>
              )}
            </div>
          </motion.div>

          <div className="flex items-center justify-between text-sm text-gray-500 px-2">
            <div className="flex items-center gap-2"><Shield size={16} /><span>Secure Payment</span></div>
            <div className="flex items-center gap-2"><Clock size={16} /><span>⚡ Delivery within 30–60 minutes</span></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ==================== UPI PAYMENT COMPONENT ====================
const UpiPaymentForm = ({ total, onPay, isProcessing, error, setError }) => {
  const [upiId, setUpiId] = useState('');
  const [upiMethod, setUpiMethod] = useState('id');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const upiApps = [
    { name: 'Google Pay', icon: '💳', color: 'bg-blue-50 border-blue-200', suffix: '@okicici' },
    { name: 'PhonePe', icon: '📱', color: 'bg-purple-50 border-purple-200', suffix: '@ybl' },
    { name: 'Paytm', icon: '💰', color: 'bg-cyan-50 border-cyan-200', suffix: '@paytm' },
    { name: 'BHIM', icon: '🏦', color: 'bg-green-50 border-green-200', suffix: '@upi' },
  ];

  const validateUpiId = (id) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    return upiRegex.test(id);
  };

  const handleVerifyUpi = () => {
    if (!upiId.trim()) {
      setError('Please enter your UPI ID');
      return;
    }
    if (!validateUpiId(upiId)) {
      setError('Please enter a valid UPI ID (e.g., yourname@ybl, yourname@paytm)');
      return;
    }
    setIsVerifying(true);
    setError('');
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleUpiPay = () => {
    if (!isVerified && upiMethod === 'id') {
      setError('Please verify your UPI ID first');
      return;
    }
    onPay();
  };

  return (
    <motion.div className="pt-4 border-t border-gray-100 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {/* UPI Method Toggle */}
      <div className="flex gap-2">
        <button type="button" onClick={() => { setUpiMethod('id'); setError(''); }}
          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${upiMethod === 'id' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
          Enter UPI ID
        </button>
        <button type="button" onClick={() => { setUpiMethod('qr'); setError(''); }}
          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${upiMethod === 'qr' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
          Scan QR Code
        </button>
      </div>

      {upiMethod === 'id' ? (
        <>
          {/* UPI ID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="yourname@ybl, yourname@paytm"
                className={`w-full pl-10 pr-24 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${isVerified ? 'border-green-400 bg-green-50/30' : 'border-gray-200'
                  }`}
                value={upiId}
                onChange={(e) => { setUpiId(e.target.value.toLowerCase()); setIsVerified(false); setError(''); }}
                disabled={isProcessing}
              />
              <button type="button" onClick={handleVerifyUpi} disabled={isVerifying || isProcessing}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${isVerified ? 'bg-green-100 text-green-700' : isVerifying ? 'bg-gray-100 text-gray-400' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                {isVerified ? '✓ Verified' : isVerifying ? 'Verifying...' : 'Verify'}
              </button>
            </div>
            {isVerified && (
              <motion.p className="mt-1 text-xs text-green-600 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CheckCircle size={12} /> UPI ID verified successfully
              </motion.p>
            )}
          </div>

          {/* Popular UPI Apps */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Popular UPI Apps</p>
            <div className="grid grid-cols-4 gap-2">
              {upiApps.map((app, index) => (
                <button key={index} type="button"
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all hover:shadow-sm ${app.color}`}
                  onClick={() => { if (!upiId.includes('@')) setUpiId(upiId + app.suffix); }}>
                  <span className="text-xl">{app.icon}</span>
                  <span className="text-xs text-gray-600 font-medium">{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* QR Code – real scannable UPI QR with full payment info */
        <motion.div className="py-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>

          {/* ── Merchant / Bank info card ── */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-3 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">🌱</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Farmnest Pvt. Ltd.</p>
                <p className="text-xs text-gray-500">Agricultural Merchant · India</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full border border-green-200">✓ Verified</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded-lg p-2 border border-green-100">
                <p className="text-gray-400 mb-0.5">Payment via</p>
                <p className="font-semibold text-gray-700">🏦 Razorpay Gateway</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-green-100">
                <p className="text-gray-400 mb-0.5">UPI Merchant ID</p>
                <p className="font-mono font-semibold text-gray-700">success@razorpay</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-green-100">
                <p className="text-gray-400 mb-0.5">Beneficiary Bank</p>
                <p className="font-semibold text-gray-700">ICICI Bank Ltd</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-green-100">
                <p className="text-gray-400 mb-0.5">Order Ref.</p>
                <p className="font-mono font-semibold text-gray-700">FN{Date.now().toString().slice(-6)}</p>
              </div>
            </div>
          </div>

          {/* ── QR Code ── */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-3">Scan with any UPI app · Bank name will appear on your UPI app</p>
            <div className="bg-white border-2 border-green-300 rounded-2xl p-4 inline-block shadow-lg mb-3">
              <QRCodeSVG
                value={`upi://pay?pa=success@razorpay&pn=Farmnest%20Pvt%20Ltd&am=${total || 1}&cu=INR&tn=Farmnest%20Order%20Payment`}
                size={180}
                bgColor="#ffffff"
                fgColor="#15803d"
                level="H"
                includeMargin={false}
              />
            </div>

            {/* Amount highlight */}
            <div className="bg-green-600 rounded-xl py-3 px-6 inline-block mb-3">
              <p className="text-white text-xs font-medium opacity-80 mb-0.5">Amount to Pay</p>
              <p className="text-white text-2xl font-black">₹{(total || 0).toLocaleString('en-IN')}</p>
            </div>

            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Secured by <span className="font-semibold text-gray-600">Razorpay · NPCI · RBI</span></span>
            </div>

            {/* Test mode notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2 text-xs text-amber-700 flex items-center gap-1.5">
              <span>⚠️</span>
              <span><strong>Demo Mode:</strong> QR routes via Razorpay test gateway. Bank shown: <strong>Razorpay Payments Pvt Ltd</strong></span>
            </div>

            {/* Accepted apps */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {['💳 GPay', '📱 PhonePe', '💰 Paytm', '🏦 BHIM', '🔵 CRED'].map(app => (
                <span key={app} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{app}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p className="text-red-600 flex items-center gap-2 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AlertCircle size={16} /> {error}
        </motion.p>
      )}

      {/* UPI Pay Button */}
      <button disabled={isProcessing || (upiMethod === 'id' && !isVerified)} onClick={handleUpiPay}
        className={`w-full py-4 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${isProcessing || (upiMethod === 'id' && !isVerified)
          ? 'bg-green-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
          }`}>
        {isProcessing ? (
          <><div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> Processing UPI Payment...</>
        ) : (
          <><Wallet size={20} />
            {upiMethod === 'qr'
              ? `Pay ₹${total.toLocaleString('en-IN')}`
              : isVerified
                ? `Pay ₹${total.toLocaleString('en-IN')} via UPI`
                : 'Verify UPI ID to Pay'}
          </>
        )}
      </button>
    </motion.div>
  );
};

export default Payment;
