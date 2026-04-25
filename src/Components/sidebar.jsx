import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Leaf, ShoppingCart, User, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-green-700 via-emerald-600 to-lime-500 text-white shadow-xl md:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gradient-to-b from-green-700 to-emerald-600 z-10">
              <Link to="/" className="flex items-center space-x-2" onClick={toggleSidebar}>
                <span className="text-xl md:text-2xl font-bold">Farmnest</span>
              </Link>
              <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="px-4 py-6">
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors active:bg-white/20"
                  onClick={toggleSidebar}
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/soilmonitoringsystem" 
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors active:bg-white/20"
                  onClick={toggleSidebar}
                >
                  <Leaf size={20} />
                  <span>Soil Monitoring</span>
                </Link>
                <Link 
                  to="/cart" 
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors active:bg-white/20"
                  onClick={toggleSidebar}
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors active:bg-white/20"
                  onClick={toggleSidebar}
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </nav>

              {/* Auth Buttons */}
              <div className="mt-8 space-y-3">
                <Link 
                  to="/login" 
                  className="flex items-center justify-center space-x-2 w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:bg-white/30"
                  onClick={toggleSidebar}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center justify-center space-x-2 w-full p-3 rounded-xl bg-white text-green-700 hover:bg-white/90 transition-colors active:bg-white/80"
                  onClick={toggleSidebar}
                >
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 left-0 right-0 p-4 text-center text-sm text-white/60 bg-gradient-to-t from-green-700 to-transparent">
              © 2024 Farmnest. All rights reserved.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;