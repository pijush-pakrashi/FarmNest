// Comprehensive Indian Region-wise Soil & Crop Database
// Based on real agricultural soil survey data from Indian Council of Agricultural Research (ICAR)

const soilDatabase = {
  // ===================== WEST BENGAL =====================
  'west bengal': {
    default: {
      soilType: 'Alluvial Soil',
      ph: { min: 6.0, max: 7.5 },
      moisture: { min: 55, max: 75 },
      nutrients: { nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Jute', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
        { name: 'Tea', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
        { name: 'Potato', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40?w=400' },
        { name: 'Mustard', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400' },
      ]
    },
    districts: {
      'kolkata': {
        soilType: 'Coastal Alluvial Soil',
        ph: { min: 6.5, max: 7.8 },
        moisture: { min: 65, max: 85 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Vegetables', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
          { name: 'Jute', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Banana', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
          { name: 'Coconut', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
        ]
      },
      'howrah': {
        soilType: 'Gangetic Alluvial Soil',
        ph: { min: 6.3, max: 7.5 },
        moisture: { min: 60, max: 80 },
        nutrients: { nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Potato', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40?w=400' },
          { name: 'Jute', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Sesame', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        ]
      },
      'bardhaman': {
        soilType: 'Old Alluvial Soil',
        ph: { min: 5.8, max: 7.0 },
        moisture: { min: 50, max: 70 },
        nutrients: { nitrogen: 'High', phosphorus: 'Medium', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Potato', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40?w=400' },
          { name: 'Mustard', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400' },
          { name: 'Lentil', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
        ]
      },
      'burdwan': {
        soilType: 'Old Alluvial Soil',
        ph: { min: 5.8, max: 7.0 },
        moisture: { min: 50, max: 70 },
        nutrients: { nitrogen: 'High', phosphorus: 'Medium', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Potato', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40?w=400' },
          { name: 'Mustard', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400' },
          { name: 'Lentil', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
        ]
      },
      'asansol': {
        soilType: 'Laterite & Red Soil',
        ph: { min: 5.2, max: 6.5 },
        moisture: { min: 35, max: 55 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Groundnut', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1567892320421-1c657571ea4e?w=400' },
          { name: 'Pigeon Pea', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
          { name: 'Millets', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
          { name: 'Sweet Potato', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1596097635092-6e7e0eb0f4cc?w=400' },
        ]
      },
      'durgapur': {
        soilType: 'Laterite Soil',
        ph: { min: 5.0, max: 6.3 },
        moisture: { min: 30, max: 50 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Low' },
        crops: [
          { name: 'Millets', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
          { name: 'Groundnut', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1567892320421-1c657571ea4e?w=400' },
          { name: 'Cashew', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1563292245-cb1cc90f0ae9?w=400' },
          { name: 'Rice', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        ]
      },
      'siliguri': {
        soilType: 'Terai Alluvial Soil',
        ph: { min: 5.5, max: 6.8 },
        moisture: { min: 60, max: 80 },
        nutrients: { nitrogen: 'High', phosphorus: 'Medium', potassium: 'High' },
        crops: [
          { name: 'Tea', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Jute', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Pineapple', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400' },
          { name: 'Ginger', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        ]
      },
      'darjeeling': {
        soilType: 'Mountain Forest Soil',
        ph: { min: 4.5, max: 6.0 },
        moisture: { min: 70, max: 90 },
        nutrients: { nitrogen: 'High', phosphorus: 'Low', potassium: 'Medium' },
        crops: [
          { name: 'Tea', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
          { name: 'Cardamom', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
          { name: 'Orange', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
          { name: 'Ginger', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        ]
      },
      'murshidabad': {
        soilType: 'New Alluvial Soil',
        ph: { min: 6.5, max: 7.8 },
        moisture: { min: 55, max: 75 },
        nutrients: { nitrogen: 'High', phosphorus: 'High', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Silk (Mulberry)', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Mango', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
          { name: 'Wheat', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Lentil', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
        ]
      },
      'nadia': {
        soilType: 'Gangetic Alluvial Soil',
        ph: { min: 6.5, max: 7.5 },
        moisture: { min: 60, max: 78 },
        nutrients: { nitrogen: 'High', phosphorus: 'High', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Potato', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40?w=400' },
          { name: 'Jute', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Vegetables', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        ]
      },
    }
  },

  // ===================== MAHARASHTRA =====================
  'maharashtra': {
    default: {
      soilType: 'Black Cotton Soil (Regur)',
      ph: { min: 7.0, max: 8.5 },
      moisture: { min: 35, max: 55 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
      crops: [
        { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
        { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
        { name: 'Soybean', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Jowar (Sorghum)', suitability: 'High', season: 'Kharif/Rabi', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
        { name: 'Onion', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400' },
      ]
    },
    districts: {
      'mumbai': {
        soilType: 'Coastal Laterite Soil',
        ph: { min: 5.5, max: 6.8 },
        moisture: { min: 65, max: 85 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
          { name: 'Mango', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
          { name: 'Vegetables', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        ]
      },
      'pune': {
        soilType: 'Red Laterite Soil',
        ph: { min: 6.0, max: 7.2 },
        moisture: { min: 40, max: 60 },
        nutrients: { nitrogen: 'Medium', phosphorus: 'Low', potassium: 'Medium' },
        crops: [
          { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
          { name: 'Grapes', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400' },
          { name: 'Pomegranate', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400' },
          { name: 'Wheat', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Bajra', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
        ]
      },
      'nagpur': {
        soilType: 'Black Cotton Soil (Deep)',
        ph: { min: 7.5, max: 8.5 },
        moisture: { min: 30, max: 50 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
        crops: [
          { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
          { name: 'Orange', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
          { name: 'Soybean', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
          { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Chickpea', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
        ]
      },
      'nashik': {
        soilType: 'Red & Black Mixed Soil',
        ph: { min: 6.5, max: 7.8 },
        moisture: { min: 35, max: 55 },
        nutrients: { nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'Medium' },
        crops: [
          { name: 'Grapes', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400' },
          { name: 'Onion', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400' },
          { name: 'Tomato', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400' },
          { name: 'Wheat', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Bajra', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
        ]
      },
    }
  },

  // ===================== UTTAR PRADESH =====================
  'uttar pradesh': {
    default: {
      soilType: 'Alluvial Soil (Indo-Gangetic)',
      ph: { min: 7.0, max: 8.5 },
      moisture: { min: 40, max: 65 },
      nutrients: { nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'High' },
      crops: [
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
        { name: 'Potato', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40?w=400' },
        { name: 'Mustard', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400' },
      ]
    },
    districts: {
      'lucknow': {
        soilType: 'Alluvial Loamy Soil',
        ph: { min: 7.2, max: 8.2 },
        moisture: { min: 42, max: 62 },
        nutrients: { nitrogen: 'Medium', phosphorus: 'High', potassium: 'High' },
        crops: [
          { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Mango', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
          { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
          { name: 'Vegetables', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        ]
      },
      'varanasi': {
        soilType: 'Older Alluvial (Bangar)',
        ph: { min: 7.5, max: 8.5 },
        moisture: { min: 38, max: 58 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
        crops: [
          { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Betel Leaf', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Chickpea', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
        ]
      },
    }
  },

  // ===================== KARNATAKA =====================
  'karnataka': {
    default: {
      soilType: 'Red Soil',
      ph: { min: 5.5, max: 7.0 },
      moisture: { min: 30, max: 55 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'Low' },
      crops: [
        { name: 'Ragi (Finger Millet)', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
        { name: 'Coffee', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400' },
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Sugarcane', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
        { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
      ]
    },
    districts: {
      'bengaluru': {
        soilType: 'Red Sandy Loam',
        ph: { min: 5.5, max: 6.8 },
        moisture: { min: 30, max: 50 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
        crops: [
          { name: 'Ragi', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
          { name: 'Grapes', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400' },
          { name: 'Vegetables', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
          { name: 'Flowers', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400' },
          { name: 'Mulberry', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
        ]
      },
      'bangalore': {
        soilType: 'Red Sandy Loam',
        ph: { min: 5.5, max: 6.8 },
        moisture: { min: 30, max: 50 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
        crops: [
          { name: 'Ragi', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
          { name: 'Grapes', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400' },
          { name: 'Vegetables', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
          { name: 'Flowers', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400' },
        ]
      },
      'mysuru': {
        soilType: 'Red Loamy Soil',
        ph: { min: 6.0, max: 7.0 },
        moisture: { min: 35, max: 55 },
        nutrients: { nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'Medium' },
        crops: [
          { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Tobacco', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
        ]
      },
    }
  },

  // ===================== TAMIL NADU =====================
  'tamil nadu': {
    default: {
      soilType: 'Red Soil & Black Soil',
      ph: { min: 6.0, max: 7.5 },
      moisture: { min: 30, max: 55 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
        { name: 'Cotton', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
        { name: 'Banana', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
        { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
      ]
    },
    districts: {
      'chennai': {
        soilType: 'Coastal Sandy Soil',
        ph: { min: 7.5, max: 8.5 },
        moisture: { min: 50, max: 70 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'High' },
        crops: [
          { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
          { name: 'Casuarina', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Rice', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Vegetables', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        ]
      },
      'coimbatore': {
        soilType: 'Black Clayey Soil',
        ph: { min: 7.0, max: 8.2 },
        moisture: { min: 25, max: 45 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
        crops: [
          { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
          { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
          { name: 'Turmeric', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
          { name: 'Banana', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
          { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
        ]
      },
    }
  },

  // ===================== PUNJAB =====================
  'punjab': {
    default: {
      soilType: 'Alluvial Loamy Soil',
      ph: { min: 7.5, max: 8.8 },
      moisture: { min: 35, max: 55 },
      nutrients: { nitrogen: 'High', phosphorus: 'High', potassium: 'High' },
      crops: [
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
        { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
        { name: 'Maize', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== RAJASTHAN =====================
  'rajasthan': {
    default: {
      soilType: 'Desert & Arid Soil',
      ph: { min: 7.5, max: 9.0 },
      moisture: { min: 15, max: 35 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Bajra (Pearl Millet)', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
        { name: 'Mustard', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400' },
        { name: 'Guar (Cluster Bean)', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        { name: 'Wheat', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Cumin', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
      ]
    },
    districts: {
      'jaipur': {
        soilType: 'Sandy Loam Soil',
        ph: { min: 7.0, max: 8.5 },
        moisture: { min: 20, max: 40 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'Medium' },
        crops: [
          { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
          { name: 'Mustard', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400' },
          { name: 'Bajra', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
          { name: 'Onion', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400' },
        ]
      },
    }
  },

  // ===================== KERALA =====================
  'kerala': {
    default: {
      soilType: 'Laterite Soil',
      ph: { min: 4.5, max: 6.5 },
      moisture: { min: 65, max: 90 },
      nutrients: { nitrogen: 'Medium', phosphorus: 'Low', potassium: 'Low' },
      crops: [
        { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
        { name: 'Rubber', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
        { name: 'Black Pepper', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Tea', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
        { name: 'Cardamom', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== MADHYA PRADESH =====================
  'madhya pradesh': {
    default: {
      soilType: 'Black Soil (Regur)',
      ph: { min: 7.0, max: 8.5 },
      moisture: { min: 30, max: 50 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
      crops: [
        { name: 'Soybean', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Chickpea', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
        { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
        { name: 'Maize', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== GUJARAT =====================
  'gujarat': {
    default: {
      soilType: 'Black & Alluvial Soil',
      ph: { min: 7.0, max: 8.5 },
      moisture: { min: 25, max: 45 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'High' },
      crops: [
        { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
        { name: 'Groundnut', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1567892320421-1c657571ea4e?w=400' },
        { name: 'Cumin', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Mango', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== ANDHRA PRADESH =====================
  'andhra pradesh': {
    default: {
      soilType: 'Red & Black Soil',
      ph: { min: 6.5, max: 7.8 },
      moisture: { min: 35, max: 55 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
        { name: 'Chilli', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1588252303782-cb80119a4e0d?w=400' },
        { name: 'Mango', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
        { name: 'Groundnut', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1567892320421-1c657571ea4e?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== TELANGANA =====================
  'telangana': {
    default: {
      soilType: 'Red & Black Soil',
      ph: { min: 6.5, max: 8.0 },
      moisture: { min: 30, max: 50 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Medium', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
        { name: 'Turmeric', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Maize', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
        { name: 'Soybean', suitability: 'Medium', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
      ]
    },
    districts: {
      'hyderabad': {
        soilType: 'Red Sandy Soil',
        ph: { min: 6.0, max: 7.5 },
        moisture: { min: 25, max: 45 },
        nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
        crops: [
          { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
          { name: 'Vegetables', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
          { name: 'Mango', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
          { name: 'Millets', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
        ]
      },
    }
  },

  // ===================== BIHAR =====================
  'bihar': {
    default: {
      soilType: 'Alluvial Soil (Gangetic Plain)',
      ph: { min: 6.5, max: 8.0 },
      moisture: { min: 50, max: 70 },
      nutrients: { nitrogen: 'High', phosphorus: 'Medium', potassium: 'High' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Maize', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
        { name: 'Litchi', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
        { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== JHARKHAND =====================
  'jharkhand': {
    default: {
      soilType: 'Red & Laterite Soil',
      ph: { min: 5.0, max: 6.5 },
      moisture: { min: 35, max: 55 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Low' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Maize', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
        { name: 'Vegetables', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        { name: 'Lac', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
        { name: 'Pulses', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== ODISHA =====================
  'odisha': {
    default: {
      soilType: 'Red & Laterite Soil',
      ph: { min: 5.5, max: 7.0 },
      moisture: { min: 50, max: 70 },
      nutrients: { nitrogen: 'Medium', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Jute', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
        { name: 'Groundnut', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1567892320421-1c657571ea4e?w=400' },
        { name: 'Sugarcane', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
        { name: 'Turmeric', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== ASSAM =====================
  'assam': {
    default: {
      soilType: 'Alluvial & Laterite Soil',
      ph: { min: 4.5, max: 6.0 },
      moisture: { min: 65, max: 85 },
      nutrients: { nitrogen: 'High', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Tea', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Jute', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
        { name: 'Banana', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
        { name: 'Orange', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== CHHATTISGARH =====================
  'chhattisgarh': {
    default: {
      soilType: 'Red & Yellow Soil',
      ph: { min: 5.5, max: 7.0 },
      moisture: { min: 40, max: 60 },
      nutrients: { nitrogen: 'Medium', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Maize', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
        { name: 'Soybean', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Wheat', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Lentil', suitability: 'Medium', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== HARYANA =====================
  'haryana': {
    default: {
      soilType: 'Alluvial Sandy Loam',
      ph: { min: 7.5, max: 8.8 },
      moisture: { min: 30, max: 50 },
      nutrients: { nitrogen: 'Medium', phosphorus: 'High', potassium: 'High' },
      crops: [
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Mustard', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400' },
        { name: 'Sugarcane', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1600021386498-74c2c70f76b8?w=400' },
        { name: 'Cotton', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1595258655624-80e4575b7e13?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== INTERNATIONAL REGIONS =====================

  // Dubai / UAE
  'dubai': {
    default: {
      soilType: 'Arid Desert Sandy Soil',
      ph: { min: 7.8, max: 9.0 },
      moisture: { min: 2, max: 12 },
      nutrients: { nitrogen: 'Very Low', phosphorus: 'Low', potassium: 'Low' },
      crops: [
        { name: 'Date Palm', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=400' },
        { name: 'Tomato (Hydroponic)', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400' },
        { name: 'Cucumber (Greenhouse)', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400' },
        { name: 'Lettuce (Vertical Farm)', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        { name: 'Herbs (Greenhouse)', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
      ]
    },
    districts: {
      'dubai': {
        soilType: 'Coastal Desert Sandy Soil',
        ph: { min: 7.8, max: 8.8 },
        moisture: { min: 3, max: 10 },
        nutrients: { nitrogen: 'Very Low', phosphorus: 'Low', potassium: 'Low' },
        crops: [
          { name: 'Date Palm', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=400' },
          { name: 'Tomato (Hydroponic)', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400' },
          { name: 'Cucumber (Greenhouse)', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400' },
          { name: 'Pepper (Controlled Env)', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1588252303782-cb80119a4e0d?w=400' },
        ]
      },
      'abu dhabi': {
        soilType: 'Sandy Gypsiferous Soil',
        ph: { min: 8.0, max: 9.2 },
        moisture: { min: 2, max: 8 },
        nutrients: { nitrogen: 'Very Low', phosphorus: 'Very Low', potassium: 'Low' },
        crops: [
          { name: 'Date Palm', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=400' },
          { name: 'Alfalfa', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
          { name: 'Tomato (Greenhouse)', suitability: 'High', season: 'Winter', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400' },
        ]
      },
    }
  },

  // UAE (state-level alias)
  'uae': {
    default: {
      soilType: 'Arid Desert Sandy Soil',
      ph: { min: 7.8, max: 9.0 },
      moisture: { min: 2, max: 12 },
      nutrients: { nitrogen: 'Very Low', phosphorus: 'Low', potassium: 'Low' },
      crops: [
        { name: 'Date Palm', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=400' },
        { name: 'Tomato (Hydroponic)', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400' },
        { name: 'Lettuce (Vertical Farm)', suitability: 'Medium', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
      ]
    },
    districts: {}
  },

  // Saudi Arabia
  'saudi arabia': {
    default: {
      soilType: 'Arid Sandy & Rocky Soil',
      ph: { min: 7.5, max: 9.0 },
      moisture: { min: 2, max: 10 },
      nutrients: { nitrogen: 'Very Low', phosphorus: 'Very Low', potassium: 'Low' },
      crops: [
        { name: 'Date Palm', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=400' },
        { name: 'Wheat (Irrigated)', suitability: 'Medium', season: 'Winter', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Tomato (Greenhouse)', suitability: 'High', season: 'Winter', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400' },
        { name: 'Watermelon', suitability: 'Medium', season: 'Spring', image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400' },
      ]
    },
    districts: {}
  },

  // Nepal
  'nepal': {
    default: {
      soilType: 'Mountain & Alluvial Soil',
      ph: { min: 5.5, max: 7.5 },
      moisture: { min: 45, max: 70 },
      nutrients: { nitrogen: 'Medium', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Maize', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
        { name: 'Cardamom', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400' },
        { name: 'Tea', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
      ]
    },
    districts: {}
  },

  // Singapore / Southeast Asia
  'singapore': {
    default: {
      soilType: 'Tropical Marine Clay',
      ph: { min: 4.5, max: 6.5 },
      moisture: { min: 65, max: 90 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Vegetables (Vertical Farm)', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
        { name: 'Herbs', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1515543904397-7a38a1084308?w=400' },
        { name: 'Leafy Greens (Hydroponic)', suitability: 'High', season: 'All Year', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
      ]
    },
    districts: {}
  },

  // GOA =====================
  'goa': {
    default: {
      soilType: 'Laterite & Coastal Soil',
      ph: { min: 5.0, max: 6.5 },
      moisture: { min: 60, max: 80 },
      nutrients: { nitrogen: 'Low', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Coconut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400' },
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Cashew', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1563292245-cb1cc90f0ae9?w=400' },
        { name: 'Mango', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
        { name: 'Arecanut', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== HIMACHAL PRADESH =====================
  'himachal pradesh': {
    default: {
      soilType: 'Mountain & Forest Soil',
      ph: { min: 5.0, max: 6.5 },
      moisture: { min: 55, max: 75 },
      nutrients: { nitrogen: 'High', phosphorus: 'Low', potassium: 'Medium' },
      crops: [
        { name: 'Apple', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Maize', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
        { name: 'Tea', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
        { name: 'Potato', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40?w=400' },
      ]
    },
    districts: {}
  },

  // ===================== UTTARAKHAND =====================
  'uttarakhand': {
    default: {
      soilType: 'Mountain & Forest Soil',
      ph: { min: 5.5, max: 7.0 },
      moisture: { min: 50, max: 70 },
      nutrients: { nitrogen: 'High', phosphorus: 'Medium', potassium: 'Medium' },
      crops: [
        { name: 'Rice', suitability: 'High', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536304993881-460e4e1d1b41?w=400' },
        { name: 'Wheat', suitability: 'High', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { name: 'Litchi', suitability: 'High', season: 'Summer', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
        { name: 'Tea', suitability: 'Medium', season: 'Perennial', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
        { name: 'Mandarin Orange', suitability: 'High', season: 'Perennial', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
      ]
    },
    districts: {}
  },
};

/**
 * Look up soil data for a given city and state.
 * Tries city-level match first, then falls back to state default.
 */
export function getSoilDataForLocation(city, state) {
  const stateKey = state?.toLowerCase()?.trim();
  const cityKey = city?.toLowerCase()?.trim();

  // 1. Try to find state data (or city as state)
  const stateData = soilDatabase[stateKey] || soilDatabase[cityKey];
  
  if (stateData) {
    // Try to find city/district-level data
    if (cityKey && stateData.districts && stateData.districts[cityKey]) {
      return stateData.districts[cityKey];
    }

    // Try partial matching for city names in this state
    if (cityKey && stateData.districts) {
      for (const [districtName, districtData] of Object.entries(stateData.districts)) {
        if (cityKey.includes(districtName) || districtName.includes(cityKey)) {
          return districtData;
        }
      }
    }
    return stateData.default;
  }

  // 2. Fallback: Try partial city match across ALL states
  for (const data of Object.values(soilDatabase)) {
    if (data.districts) {
      for (const [districtName, districtData] of Object.entries(data.districts)) {
        if (cityKey.includes(districtName) || districtName.includes(cityKey)) {
          return districtData;
        }
      }
    }
  }

  return null;
}

/**
 * Fetch real-time weather data using Open-Meteo API (free, no API key)
 */
export async function fetchWeatherData(city, state) {
  try {
    // First, geocode the city to get coordinates using Nominatim
    const locationQuery = `${city}, ${state}`;
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=1`,
      { headers: { 'Accept': 'application/json' } }
    );
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      return null;
    }

    const { lat, lon } = geoData[0];

    // Fetch current weather from Open-Meteo (free, no API key)
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,soil_temperature_0cm,soil_moisture_0_to_1cm&timezone=auto`
    );
    const weatherData = await weatherResponse.json();

    if (weatherData && weatherData.current) {
      return {
        temperature: Math.round(weatherData.current.temperature_2m),
        humidity: Math.round(weatherData.current.relative_humidity_2m),
        soilTemperature: weatherData.current.soil_temperature_0cm 
          ? Math.round(weatherData.current.soil_temperature_0cm) 
          : Math.round(weatherData.current.temperature_2m - 3),
        soilMoisture: weatherData.current.soil_moisture_0_to_1cm
          ? Math.round(weatherData.current.soil_moisture_0_to_1cm * 100)
          : null,
      };
    }
    return null;
  } catch (error) {
    console.error('Weather fetch error:', error);
    return null;
  }
}

export default soilDatabase;
