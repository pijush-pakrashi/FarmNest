// data/farmnestStores.js
// Farmnest store locations — one per major Indian city

export const FARMNEST_STORES = [
  { city: 'Jaipur',         state: 'Rajasthan',       lat: 26.9124, lng: 75.7873 },
  { city: 'Jodhpur',        state: 'Rajasthan',       lat: 26.2389, lng: 73.0243 },
  { city: 'Udaipur',        state: 'Rajasthan',       lat: 24.5854, lng: 73.7125 },
  { city: 'Kota',           state: 'Rajasthan',       lat: 25.2138, lng: 75.8648 },
  { city: 'Ajmer',          state: 'Rajasthan',       lat: 26.4499, lng: 74.6399 },
  { city: 'Bikaner',        state: 'Rajasthan',       lat: 28.0229, lng: 73.3119 },
  { city: 'Delhi',          state: 'Delhi',           lat: 28.6139, lng: 77.2090 },
  { city: 'Noida',          state: 'Uttar Pradesh',   lat: 28.5355, lng: 77.3910 },
  { city: 'Gurgaon',        state: 'Haryana',         lat: 28.4595, lng: 77.0266 },
  { city: 'Agra',           state: 'Uttar Pradesh',   lat: 27.1767, lng: 78.0081 },
  { city: 'Lucknow',        state: 'Uttar Pradesh',   lat: 26.8467, lng: 80.9462 },
  { city: 'Varanasi',       state: 'Uttar Pradesh',   lat: 25.3176, lng: 82.9739 },
  { city: 'Kanpur',         state: 'Uttar Pradesh',   lat: 26.4499, lng: 80.3319 },
  { city: 'Mumbai',         state: 'Maharashtra',     lat: 19.0760, lng: 72.8777 },
  { city: 'Pune',           state: 'Maharashtra',     lat: 18.5204, lng: 73.8567 },
  { city: 'Nagpur',         state: 'Maharashtra',     lat: 21.1458, lng: 79.0882 },
  { city: 'Nashik',         state: 'Maharashtra',     lat: 19.9975, lng: 73.7898 },
  { city: 'Bangalore',      state: 'Karnataka',       lat: 12.9716, lng: 77.5946 },
  { city: 'Mysore',         state: 'Karnataka',       lat: 12.2958, lng: 76.6394 },
  { city: 'Chennai',        state: 'Tamil Nadu',      lat: 13.0827, lng: 80.2707 },
  { city: 'Coimbatore',     state: 'Tamil Nadu',      lat: 11.0168, lng: 76.9558 },
  { city: 'Madurai',        state: 'Tamil Nadu',      lat: 9.9252,  lng: 78.1198 },
  { city: 'Hyderabad',      state: 'Telangana',       lat: 17.3850, lng: 78.4867 },
  { city: 'Visakhapatnam',  state: 'Andhra Pradesh',  lat: 17.6868, lng: 83.2185 },
  { city: 'Kochi',          state: 'Kerala',          lat: 9.9312,  lng: 76.2673 },
  { city: 'Thiruvananthapuram', state: 'Kerala',      lat: 8.5241,  lng: 76.9366 },
  { city: 'Kolkata',        state: 'West Bengal',     lat: 22.5726, lng: 88.3639 },
  { city: 'Bhubaneswar',    state: 'Odisha',          lat: 20.2961, lng: 85.8189 },
  { city: 'Patna',          state: 'Bihar',           lat: 25.5941, lng: 85.1376 },
  { city: 'Ranchi',         state: 'Jharkhand',       lat: 23.3441, lng: 85.3096 },
  { city: 'Ahmedabad',      state: 'Gujarat',         lat: 23.0225, lng: 72.5714 },
  { city: 'Surat',          state: 'Gujarat',         lat: 21.1702, lng: 72.8311 },
  { city: 'Vadodara',       state: 'Gujarat',         lat: 22.3072, lng: 73.1812 },
  { city: 'Bhopal',         state: 'Madhya Pradesh',  lat: 23.2599, lng: 77.4126 },
  { city: 'Indore',         state: 'Madhya Pradesh',  lat: 22.7196, lng: 75.8577 },
  { city: 'Gwalior',        state: 'Madhya Pradesh',  lat: 26.2183, lng: 78.1828 },
  { city: 'Raipur',         state: 'Chhattisgarh',    lat: 21.2514, lng: 81.6296 },
  { city: 'Chandigarh',     state: 'Punjab',          lat: 30.7333, lng: 76.7794 },
  { city: 'Amritsar',       state: 'Punjab',          lat: 31.6340, lng: 74.8723 },
  { city: 'Ludhiana',       state: 'Punjab',          lat: 30.9010, lng: 75.8573 },
  { city: 'Dehradun',       state: 'Uttarakhand',     lat: 30.3165, lng: 78.0322 },
  { city: 'Haridwar',       state: 'Uttarakhand',     lat: 29.9457, lng: 78.1642 },
  { city: 'Guwahati',       state: 'Assam',           lat: 26.1445, lng: 91.7362 },
  { city: 'Shillong',       state: 'Meghalaya',       lat: 25.5788, lng: 91.8933 },
  { city: 'Shimla',         state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
];

/**
 * Haversine straight-line distance between two lat/lng points (km)
 */
export const haversineKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/**
 * Returns the nearest Farmnest store to given coordinates
 */
export const findNearestStore = (userLat, userLng) => {
  let nearest = FARMNEST_STORES[0];
  let minDist = haversineKm(userLat, userLng, nearest.lat, nearest.lng);

  for (const store of FARMNEST_STORES) {
    const d = haversineKm(userLat, userLng, store.lat, store.lng);
    if (d < minDist) {
      minDist = d;
      nearest = store;
    }
  }
  return { ...nearest, straightKm: Math.round(minDist * 10) / 10 };
};

/**
 * Human-readable delivery label based on road distance in km
 */
export const getDeliveryLabel = (km) => {
  if (km <= 5)   return { time: '20 – 30 min', tag: '⚡ Ultra Fast', color: '#059669', bg: '#ecfdf5' };
  if (km <= 15)  return { time: '30 – 60 min', tag: '⚡ Instant',    color: '#16a34a', bg: '#f0fdf4' };
  if (km <= 40)  return { time: '1 – 2 hrs',   tag: '🚀 Fast',       color: '#0891b2', bg: '#ecfeff' };
  if (km <= 100) return { time: '2 – 4 hrs',   tag: '📦 Same Day',   color: '#d97706', bg: '#fffbeb' };
  if (km <= 300) return { time: '4 – 8 hrs',   tag: '🛵 Same Day',   color: '#ea580c', bg: '#fff7ed' };
  if (km <= 700) return { time: 'Next Day',     tag: '🚚 Next Day',   color: '#dc2626', bg: '#fef2f2' };
  return           { time: '2 – 3 Days',        tag: '📫 Standard',   color: '#7c3aed', bg: '#f5f3ff' };
};
