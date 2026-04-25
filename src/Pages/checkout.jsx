// Pages/checkout.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { findNearestStore, getDeliveryLabel, haversineKm } from '../data/farmnestStores';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ArrowLeft, 
  Shield, 
  Truck, 
  Clock,
  CheckCircle,
  Crosshair,
  Heart
} from 'lucide-react';

const TIP_OPTIONS = [20, 30, 50];

const DeliveryEstimate = ({ city, coords }) => {
  const [est, setEst] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = useCallback(async (userLat, userLng, userCityName) => {
    setLoading(true); setEst(null);
    try {
      // 1. Find nearest Farmnest store
      const store = findNearestStore(userLat, userLng);

      // 2. Same-city detection → intra-city estimate (avoids 0 km OSRM bug)
      const sameCity = store.city.toLowerCase() === (userCityName || '').toLowerCase();
      if (sameCity) {
        // Realistic intra-city distance: haversine × 1.4 road factor
        const straightKm = haversineKm(store.lat, store.lng, userLat, userLng);
        const roadKm = Math.max(1.5, Math.round(straightKm * 1.4 * 10) / 10);
        setEst({
          km: roadKm,
          mins: Math.round(roadKm * 3),
          userCity: userCityName,
          storeName: `${store.city}, ${store.state}`,
          intraCity: true,
        });
        return;
      }

      // 3. Different city → real OSRM road route
      const url = `https://router.project-osrm.org/route/v1/driving/${store.lng},${store.lat};${userLng},${userLat}?overview=false`;
      const res  = await fetch(url);
      const data = await res.json();
      if (data.code !== 'Ok') throw new Error();
      const km   = (data.routes[0].distance / 1000).toFixed(1);
      const mins = Math.round(data.routes[0].duration / 60);
      setEst({
        km:        parseFloat(km),
        mins,
        userCity:  userCityName,
        storeName: `${store.city}, ${store.state}`,
        intraCity: false,
      });
    } catch { setEst(null); }
    finally  { setLoading(false); }
  }, []);

  // Triggered by city text
  useEffect(() => {
    if (!city || city.trim().length < 3) { setEst(null); return; }
    const timer = setTimeout(async () => {
      try {
        const r = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)},India&format=json&limit=1&accept-language=en`
        );
        const d = await r.json();
        if (d && d[0]) calculate(parseFloat(d[0].lat), parseFloat(d[0].lon), city);
      } catch { /* ignore */ }
    }, 900);
    return () => clearTimeout(timer);
  }, [city, calculate]);

  // Triggered by GPS
  useEffect(() => {
    if (coords) calculate(coords.lat, coords.lng, coords.name);
  }, [coords, calculate]);

  if (!city && !coords) return null;
  if (loading) return (
    <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent" />
      <span style={{ fontSize: 12, color: '#15803d', fontWeight: 600 }}>Finding nearest Farmnest store…</span>
    </div>
  );
  if (!est) return null;
  // Ensure km is never 0 displayed — always at least 1.5 for intra-city
  const displayKm = est.intraCity
    ? Math.max(1.5, est.km)
    : Math.max(1.0, est.km);
  const label = getDeliveryLabel(displayKm);
  return (
    <div style={{ background: label.bg, border: `1.5px solid ${label.color}44`, borderRadius: 12, padding: '12px 14px', marginTop: 12 }}>
      <p style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Delivery Estimate</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, color: '#374151', marginBottom: 2 }}>
            <span style={{ fontWeight: 700, color: '#15803d' }}>🏪 {est.storeName}</span>
          </p>
          <p style={{ fontSize: 12, color: '#6b7280' }}>
            {est.intraCity
              ? <>🏙️ Within city · <strong style={{ color: '#15803d' }}>~{displayKm} km</strong> to 🏠 <span style={{ fontWeight: 700, color: '#dc2626' }}>{est.userCity}</span></>
              : <>↓ <strong style={{ color: '#15803d' }}>{displayKm} km</strong> by road → <span style={{ fontWeight: 700, color: '#dc2626' }}>🏠 {est.userCity}</span></>}
          </p>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <p style={{ fontSize: 16, fontWeight: 900, color: label.color, lineHeight: 1.1 }}>{label.time}</p>
          <span style={{ fontSize: 10, background: label.color, color: '#fff', borderRadius: 999, padding: '2px 10px', fontWeight: 700, display: 'inline-block', marginTop: 3 }}>{label.tag}</span>
        </div>
      </div>
    </div>
  );
};

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [geoCoords, setGeoCoords] = useState(null);

  const [error, setError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const navigate = useNavigate();

  const handleTipSelect = (amount) => {
    setShowCustomTip(false);
    setCustomTip('');
    setTip(tip === amount ? 0 : amount);
  };

  const handleCustomTip = (val) => {
    const n = parseInt(val.replace(/\D/g, ''), 10);
    setCustomTip(val.replace(/\D/g, ''));
    setTip(isNaN(n) || n < 0 ? 0 : n);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user starts typing
  };

  const handleProceedToPayment = () => {
    const { name, email, phone, address, city, pincode } = formData;

    if (!name || !email || !phone || !address || !city || !pincode) {
      setError('Please fill all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    setError('');
    setIsPlacingOrder(true);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal < 500 ? 50 : 0;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax + tip;

    navigate('/payment', {
      state: {
        formData,
        cartItems,
        subtotal,
        shipping,
        tax,
        tip,
        total,
      },
    });
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Using OpenStreetMap Nominatim free reverse geocoding API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en`,
            {
              headers: {
                'Accept': 'application/json',
              }
            }
          );
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            
            // Build address line from available parts
            const addressParts = [
              addr.house_number || '',
              addr.road || addr.pedestrian || addr.footway || '',
              addr.neighbourhood || addr.suburb || ''
            ].filter(Boolean);

            const city = addr.city || addr.town || addr.village || addr.county || '';
            const pincode = addr.postcode || '';
            
            setFormData(prev => ({
              ...prev,
              address: addressParts.length > 0 ? addressParts.join(', ') : (data.display_name || ''),
              city: city,
              pincode: pincode,
            }));
            // Feed coordinates into DeliveryEstimate
            setGeoCoords({ lat: latitude, lng: longitude, name: city || 'Your Location' });
          } else {
            setError('Could not find address for your location. Please enter manually.');
          }
        } catch (errorMsg) {
          setError('Failed to fetch location details. Please enter manually.');
          console.error('Location fetch error:', errorMsg);
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (errorMsg) => {
        let errorMessage = 'Failed to get your location. ';
        if (errorMsg.code === 1) {
          errorMessage += 'Please allow location access in your browser settings.';
        } else if (errorMsg.code === 2) {
          errorMessage += 'Location unavailable. Please try again.';
        } else if (errorMsg.code === 3) {
          errorMessage += 'Location request timed out. Please try again.';
        } else {
          errorMessage += 'Please enter address manually.';
        }
        setError(errorMessage);
        console.error('Geolocation error:', errorMsg);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal < 500 ? 50 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax + tip;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-2 mb-8">
          <Link 
            to="/cart" 
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-8">Checkout</h1>

        <div className="space-y-6">
          {/* Shipping Information */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
              <button
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                {isLoadingLocation ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent" />
                ) : (
                  <Crosshair size={18} />
                )}
                <span className="text-sm">Use My Location</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-4 text-gray-400" size={18} />
                <textarea
                  name="address"
                  placeholder="Delivery Address *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode *"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && (
              <motion.p 
                className="text-red-600 mt-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-xl">⚠</span> {error}
              </motion.p>
            )}

            {/* ── Real-time delivery estimate ── */}
            <DeliveryEstimate city={formData.city} coords={geoCoords} />

          </motion.div>

          {/* Order Benefits */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Truck className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-gray-800">Instant Delivery ⚡</h3>
                  <p className="text-sm text-gray-600">30–60 min delivery to your door</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Shield className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-gray-800">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure checkout</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Tip your delivery partner ── */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-1">
              <Heart size={18} className="text-red-400 fill-red-400" />
              <h2 className="text-lg font-bold text-gray-800">Tip your delivery partner</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Your kindness means a lot! 100% of the tip goes directly to your delivery partner.
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              {TIP_OPTIONS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleTipSelect(amount)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                    tip === amount && !showCustomTip
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600'
                  }`}
                >
                  {amount === 20 ? '😊' : amount === 30 ? '😄' : '🤩'} ₹{amount}
                </button>
              ))}

              {/* Custom tip */}
              {showCustomTip ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-semibold">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter amount"
                    value={customTip}
                    onChange={(e) => handleCustomTip(e.target.value)}
                    autoFocus
                    className="w-28 px-3 py-1.5 border-2 border-green-500 rounded-full text-sm focus:outline-none text-green-800 font-semibold"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => { setShowCustomTip(true); setTip(0); }}
                  className="px-4 py-2 rounded-full border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-500 hover:border-green-400 hover:text-green-600 transition-all"
                >
                  🎁 Custom
                </button>
              )}
            </div>

            {tip > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-3 py-2"
              >
                <CheckCircle size={14} />
                <span className="text-xs font-semibold">₹{tip} tip added — Thank you for your generosity! 🙏</span>
                <button
                  onClick={() => { setTip(0); setCustomTip(''); setShowCustomTip(false); }}
                  className="ml-auto text-xs text-gray-400 hover:text-red-500 underline"
                >Remove</button>
              </motion.div>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 py-4 bg-gray-50 px-4 rounded-lg">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                {shipping > 0 ? (
                  <div className="text-right">
                    <span className="text-red-500">₹{shipping}</span>
                    <p className="text-xs text-gray-500">Add ₹{500 - subtotal} more for free shipping</p>
                  </div>
                ) : (
                  <span className="text-green-600">Free</span>
                )}
              </div>
              {tip > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1"><Heart size={13} className="text-red-400 fill-red-400" /> Delivery Tip</span>
                  <span className="text-green-600 font-medium">₹{tip}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold text-gray-800 pt-4 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-green-600">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              disabled={isPlacingOrder}
              onClick={handleProceedToPayment}
              className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                isPlacingOrder
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
              }`}
            >
              {isPlacingOrder ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Proceed to Payment
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield size={16} />
              <span>Your payment information is secure</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;



