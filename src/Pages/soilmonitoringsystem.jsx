import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Droplet, 
  Thermometer, 
  Sun, 
  Leaf, 
  Plus, 
  Edit2,
  ChevronRight,
  Info,
  AlertCircle,
  Cloud,
  Loader2
} from 'lucide-react';
import { getSoilDataForLocation, fetchWeatherData } from '../data/soilDatabase';

const SoilMonitoringSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address;
  
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [soilInfo, setSoilInfo] = useState(null);
  
  const [soilData, setSoilData] = useState({
    moisture: 0,
    temperature: 0,
    ph: 0,
    soilType: '',
    nutrients: {
      nitrogen: '-',
      phosphorus: '-',
      potassium: '-'
    }
  });

  const [recommendedCrops, setRecommendedCrops] = useState([]);

  // Fetch real data based on address location
  useEffect(() => {
    if (!address) {
      setIsLoading(false);
      return;
    }

    const loadLocationData = async () => {
      setIsLoading(true);
      
      try {
        // 1. Get soil data from our region database
        const regionSoilData = getSoilDataForLocation(address.city, address.state);
        
        // 2. Fetch real-time weather data
        const weather = await fetchWeatherData(address.city, address.state);
        setWeatherData(weather);
        
        if (regionSoilData) {
          setSoilInfo(regionSoilData);
          
          // Calculate soil moisture - use real weather data if available, 
          // otherwise use region-based estimated range
          let moisture;
          if (weather && weather.soilMoisture !== null) {
            moisture = weather.soilMoisture;
          } else {
            // Use region average with slight variation based on humidity
            const avgMoisture = (regionSoilData.moisture.min + regionSoilData.moisture.max) / 2;
            const humidityFactor = weather ? (weather.humidity - 50) / 100 * 10 : 0;
            moisture = Math.round(avgMoisture + humidityFactor);
          }
          
          // Calculate soil temperature - soil is typically ~3°C less than air
          let soilTemp;
          if (weather && weather.soilTemperature) {
            soilTemp = weather.soilTemperature;
          } else if (weather) {
            soilTemp = weather.temperature - 3;
          } else {
            soilTemp = 25; // fallback
          }
          
          // Calculate pH - use region average
          const avgPh = ((regionSoilData.ph.min + regionSoilData.ph.max) / 2).toFixed(1);
          
          setSoilData({
            moisture: Math.max(0, Math.min(100, moisture)),
            temperature: soilTemp,
            ph: parseFloat(avgPh),
            soilType: regionSoilData.soilType,
            nutrients: regionSoilData.nutrients
          });
          
          setRecommendedCrops(regionSoilData.crops || []);
        } else {
          // No region data found, use weather data only
          setSoilData({
            moisture: weather ? Math.round(weather.humidity * 0.7) : 45,
            temperature: weather ? weather.temperature - 3 : 25,
            ph: 6.5,
            soilType: 'Data not available for this region',
            nutrients: {
              nitrogen: 'N/A',
              phosphorus: 'N/A',
              potassium: 'N/A'
            }
          });
          
          setRecommendedCrops([
            { name: 'Rice', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
            { name: 'Wheat', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
            { name: 'Vegetables', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
          ]);
        }
      } catch (error) {
        console.error('Error loading soil data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocationData();
  }, [address]);

  const getSuitabilityColor = (suitability) => {
    switch (suitability?.toLowerCase()) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMoistureColor = (moisture) => {
    if (moisture >= 70) return 'text-blue-600';
    if (moisture >= 40) return 'text-green-700';
    return 'text-orange-600';
  };

  const getPhColor = (ph) => {
    if (ph < 5.5) return 'text-red-600';
    if (ph < 6.5) return 'text-yellow-600';
    if (ph <= 7.5) return 'text-green-600';
    if (ph <= 8.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNutrientColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-800">Soil Monitoring System</h1>
          {!address ? (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/add-address')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Address</span>
            </motion.button>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/add-address')}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-green-600 px-4 py-2 rounded-lg border border-green-200 transition-colors"
            >
              <Edit2 size={20} />
              <span>Edit Address</span>
            </motion.button>
          )}
        </div>

        {address ? (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Farm Location</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Full Name</p>
                  <p className="font-medium">{address.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Phone Number</p>
                  <p className="font-medium">{address.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 mb-1">Address</p>
                  <p className="font-medium">{address.addressLine1}</p>
                  {address.addressLine2 && (
                    <p className="font-medium">{address.addressLine2}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 mb-1">City</p>
                  <p className="font-medium">{address.city}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">State</p>
                  <p className="font-medium">{address.state}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">PIN Code</p>
                  <p className="font-medium">{address.pincode}</p>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Analyzing Soil for {address.city}, {address.state}...
                </h3>
                <p className="text-gray-600">
                  Fetching real-time weather data and regional soil information
                </p>
              </div>
            ) : (
              <>
                {/* Weather Info Banner */}
                {weatherData && (
                  <motion.div 
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm p-4 border border-blue-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Cloud className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Live Weather Data — {address.city}, {address.state}
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm text-blue-700">
                      <span>🌡️ Air Temp: <strong>{weatherData.temperature}°C</strong></span>
                      <span>💧 Humidity: <strong>{weatherData.humidity}%</strong></span>
                      <span>🏔️ Soil Temp: <strong>{weatherData.soilTemperature || (weatherData.temperature - 3)}°C</strong></span>
                    </div>
                  </motion.div>
                )}

                {/* Soil Type Banner */}
                {soilData.soilType && (
                  <motion.div 
                    className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-sm p-4 border border-amber-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <Leaf className="w-5 h-5 text-amber-700" />
                      <span className="text-sm text-amber-800">
                        Soil Type: <strong className="text-base">{soilData.soilType}</strong>
                        {soilInfo && (
                          <span className="ml-2 text-amber-600">
                            (pH Range: {soilInfo.ph.min} - {soilInfo.ph.max})
                          </span>
                        )}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Soil Parameters */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Soil Parameters</h2>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-auto">
                      📍 {address.city}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">Moisture</span>
                      </div>
                      <p className={`text-2xl font-bold ${getMoistureColor(soilData.moisture)}`}>
                        {soilData.moisture}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {soilData.moisture >= 70 ? 'High - Waterlogged risk' : 
                         soilData.moisture >= 40 ? 'Optimal range' : 'Low - Needs irrigation'}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">Temperature</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700">{soilData.temperature}°C</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {soilData.temperature >= 30 ? 'Warm - Summer crops' : 
                         soilData.temperature >= 20 ? 'Moderate - Ideal' : 'Cool - Rabi season'}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">pH Level</span>
                      </div>
                      <p className={`text-2xl font-bold ${getPhColor(soilData.ph)}`}>
                        {soilData.ph}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {soilData.ph < 6.0 ? 'Acidic soil' : 
                         soilData.ph <= 7.5 ? 'Neutral - Ideal' : 'Alkaline soil'}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">Nutrients (NPK)</span>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-sm flex items-center justify-between">
                          <span>N:</span>
                          <span className={`font-medium px-2 py-0.5 rounded text-xs ${getNutrientColor(soilData.nutrients.nitrogen)}`}>
                            {soilData.nutrients.nitrogen}
                          </span>
                        </p>
                        <p className="text-sm flex items-center justify-between">
                          <span>P:</span>
                          <span className={`font-medium px-2 py-0.5 rounded text-xs ${getNutrientColor(soilData.nutrients.phosphorus)}`}>
                            {soilData.nutrients.phosphorus}
                          </span>
                        </p>
                        <p className="text-sm flex items-center justify-between">
                          <span>K:</span>
                          <span className={`font-medium px-2 py-0.5 rounded text-xs ${getNutrientColor(soilData.nutrients.potassium)}`}>
                            {soilData.nutrients.potassium}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Crops */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">Recommended Crops</h2>
                        <p className="text-xs text-gray-500">Based on {soilData.soilType} in {address.city}</p>
                      </div>
                    </div>
                    <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
                      <span className="text-sm">View All</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendedCrops.slice(0, 3).map((crop, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="bg-green-50 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="h-32 bg-gray-200">
                          <img 
                            src={crop.image} 
                            alt={crop.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400';
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-1">{crop.name}</h3>
                          <p className="text-sm">
                            Suitability: <span className={`font-medium ${getSuitabilityColor(crop.suitability)}`}>
                              {crop.suitability}
                            </span>
                          </p>
                          {crop.season && (
                            <p className="text-xs text-gray-500 mt-1">
                              Season: {crop.season}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Show remaining crops if more than 3 */}
                  {recommendedCrops.length > 3 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Also suitable for this region:</h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendedCrops.slice(3).map((crop, index) => (
                          <span 
                            key={index}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${
                              crop.suitability === 'High' 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : crop.suitability === 'Medium'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {crop.name}
                            <span className="text-xs opacity-70">({crop.suitability})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Get Detailed Analysis
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-white hover:bg-gray-50 text-green-600 py-3 px-4 rounded-lg border border-green-200 font-medium transition-colors"
              >
                Download Report
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Address Added</h2>
            <p className="text-gray-600 mb-6">Please add your farm location to get soil monitoring data and crop recommendations.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/add-address')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Farm Location
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SoilMonitoringSystem;
