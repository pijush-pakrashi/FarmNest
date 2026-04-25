import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Sidebar from "./Components/sidebar";
import Footer from "./Components/footer";

import Home from "./Pages/home";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import SoilMonitoringSystem from "./Pages/soilmonitoringsystem";
import Cart from "./Pages/cart";
import Checkout from "./Pages/checkout";
import Success from "./Pages/success";
import Payment from "./Pages/payment";
import Orders from "./Pages/Orders";
import AddAddressPage from './Pages/AddAddressPage';
import { OfflineDetector } from './Components/OfflineScreen';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    categories: { Fruits: false, Vegetables: false, Grains: false },
    customerRatings: { "4": false, "3": false, "2": false, "1": false },
    priceRange: [0, 500],
    sort: ""
  });
  const [isBlurred, setIsBlurred] = useState(false); // renamed from isDropdownOpen

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.title === product.title
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((_, i) => i !== index);
      } else {
        return prevItems.map((item, i) =>
          i === index ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  const removeItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <OfflineDetector>
    <Router>
      <div className="flex flex-col min-h-screen bg-[var(--background-color)]">
        <Navbar
          toggleSidebar={toggleSidebar}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          filters={filters}
          setFilters={setFilters}
          setIsBlurred={setIsBlurred}
          className="sticky top-0 z-50 shadow-md"
        />
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
          className="fixed top-0 left-0 h-full z-40"
        />
        <main className="flex-grow animate-fade-in">
          <div className={`transition-opacity duration-300 ${isBlurred ? 'opacity-50' : 'opacity-100'}`}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    onAddToCart={handleAddToCart}
                    filters={filters}
                    isBlurred={isBlurred}
                    className="animate-slide-up"
                  />
                }
              />
              <Route path="/login" element={<Login className="animate-fade-in" />} />
              <Route path="/signup" element={<Signup className="animate-fade-in" />} />
              <Route path="/soilmonitoringsystem" element={<SoilMonitoringSystem className="animate-fade-in" />} />
              <Route path="/add-address" element={<AddAddressPage className="animate-fade-in" />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    clearCart={clearCart}
                    className="animate-fade-in"
                  />
                }
              />
              <Route
                path="/checkout"
                element={<Checkout cartItems={cartItems} clearCart={clearCart} className="animate-fade-in" />}
              />
              <Route path="/success" element={<Success className="animate-fade-in" />} />
              <Route path="/payment" element={<Payment clearCart={clearCart} className="animate-fade-in" />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </main>
        <Footer className="bg-[var(--primary-color)] text-white mt-auto" />
      </div>
    </Router>
    </OfflineDetector>
  );
}

export default App;
