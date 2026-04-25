import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Home, 
  Building2, 
  Phone, 
  User, 
  Mail,
  ChevronLeft,
  MapPinned,
  Building,
  CheckCircle,
  Crosshair
} from 'lucide-react';

const AddAddressPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/soilmonitoringsystem', { state: { address: formData } });
      }, 1500);
    }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (errors.addressLine1) {
      setErrors(prev => ({ ...prev, addressLine1: '' }));
    }

    if (!navigator.geolocation) {
      setErrors(prev => ({ 
        ...prev, 
        addressLine1: 'Geolocation is not supported by your browser'
      }));
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
            const state = addr.state || '';
            const pincode = addr.postcode || '';
            
            setFormData(prev => ({
              ...prev,
              addressLine1: addressParts.length > 0 ? addressParts.join(', ') : (data.display_name || ''),
              addressLine2: addr.suburb || addr.neighbourhood || '',
              city: city,
              state: state,
              pincode: pincode,
            }));
          } else {
            setErrors(prev => ({
              ...prev,
              addressLine1: 'Could not find address for your location. Please enter manually.'
            }));
          }
        } catch (err) {
          console.error('Location fetch error:', err);
          setErrors(prev => ({
            ...prev,
            addressLine1: 'Failed to fetch location details. Please enter manually.'
          }));
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (err) => {
        let errorMessage = 'Failed to get your location. ';
        if (err.code === 1) {
          errorMessage += 'Please allow location access in your browser settings.';
        } else if (err.code === 2) {
          errorMessage += 'Location unavailable. Please try again.';
        } else if (err.code === 3) {
          errorMessage += 'Location request timed out. Please try again.';
        } else {
          errorMessage += 'Please enter address manually.';
        }
        setErrors(prev => ({
          ...prev,
          addressLine1: errorMessage
        }));
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
      <motion.div 
        className="max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPinned className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Add New Address</h1>
            </div>
            <button
              type="button"
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <User size={18} />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.fullName ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="Enter your phone number"
                      maxLength="10"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={18} />
                Address Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.addressLine1 ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="House/Flat number, Street, Locality"
                  />
                  {errors.addressLine1 && (
                    <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Landmark, Area (optional)"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.city ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.state ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    >
                      <option value="">Select State</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.pincode ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="6-digit PIN code"
                      maxLength="6"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Type */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Building size={18} />
                Address Type
              </h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, addressType: 'home' }))}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    formData.addressType === 'home'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-200'
                  }`}
                >
                  <Home className={formData.addressType === 'home' ? 'text-green-600' : 'text-gray-400'} size={20} />
                  <span className={formData.addressType === 'home' ? 'text-green-700' : 'text-gray-600'}>
                    Home
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, addressType: 'office' }))}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    formData.addressType === 'office'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-200'
                  }`}
                >
                  <Building2 className={formData.addressType === 'office' ? 'text-green-600' : 'text-gray-400'} size={20} />
                  <span className={formData.addressType === 'office' ? 'text-green-700' : 'text-gray-600'}>
                    Office
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all ${
                isSubmitting
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Saving Address...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Save Address
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddAddressPage;
