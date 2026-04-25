import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard, Package, Truck, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Cart = ({ cartItems, updateQuantity, removeItem, clearCart }) => {
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getShippingCharge = () => {
    const subtotal = getTotalPrice();
    return subtotal < 500 ? 50 : 0;
  };

  const getTaxAmount = () => {
    const subtotal = getTotalPrice();
    return subtotal * 0.18; // 18% GST on subtotal only
  };

  const getFinalTotal = () => {
    const subtotal = getTotalPrice();
    const shipping = getShippingCharge();
    const tax = getTaxAmount();
    return subtotal + shipping + tax;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 sm:mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center mt-8 sm:mt-10">
            <p className="text-gray-600 flex items-center gap-1 mb-3 sm:mb-4 text-sm sm:text-base">
              Your cart is empty <ShoppingCart className="w-4 h-4" />
            </p>
            <Link
              to="/"
              aria-label="Continue shopping and browse products"
              className="bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-green-700 transition text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Cart Items */}
            <div className="space-y-4 sm:space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex flex-col sm:flex-row items-center bg-white/90 backdrop-blur-md shadow rounded-xl p-3 sm:p-4 gap-3 sm:gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-green-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className={`bg-gray-200 p-1.5 sm:p-2 rounded ${
                        item.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-300"
                      }`}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    <span className="text-sm sm:text-md font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="bg-gray-200 p-1.5 sm:p-2 rounded hover:bg-gray-300"
                    >
                      <Plus size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    <button
                      onClick={() => removeItem(index)}
                      className="bg-red-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-red-600"
                    >
                      <Trash2 size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white/90 backdrop-blur-md shadow rounded-xl p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package size={18} className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Subtotal ({cartItems.length} items)</span>
                  </div>
                  <span className="text-base sm:text-lg font-medium">₹{getTotalPrice().toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield size={18} className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">GST (18%)</span>
                  </div>
                  <span className="text-base sm:text-lg">₹{getTaxAmount().toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck size={18} className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Shipping</span>
                  </div>
                  {getShippingCharge() > 0 ? (
                    <div className="flex flex-col items-end">
                      <span className="text-red-500 text-sm sm:text-base">₹{getShippingCharge()}</span>
                      <span className="text-xs text-gray-500">
                        Add ₹{500 - getTotalPrice()} more for free shipping
                      </span>
                    </div>
                  ) : (
                    <span className="text-green-600 font-medium text-sm sm:text-base">Free</span>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-semibold text-gray-800">Total Amount</span>
                    <span className="text-xl sm:text-2xl font-bold text-green-600">
                      ₹{getFinalTotal().toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-3 sm:p-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-green-700 mb-1 sm:mb-2">
                    <Clock size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">⚡ Instant Delivery</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Your order will be delivered within 30–60 minutes! {getShippingCharge() === 0 ? "Free shipping on orders above ₹500." : "Add more items to get free shipping!"}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-green-700 transition-colors text-sm sm:text-base"
                  >
                    <CreditCard size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Proceed to Checkout</span>
                  </Link>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link
                      to="/"
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
                    >
                      <ArrowLeft size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Continue Shopping</span>
                    </Link>
                    <button
                      onClick={clearCart}
                      className="flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-red-200 transition-colors text-sm sm:text-base"
                    >
                      <Trash2 size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Clear Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
