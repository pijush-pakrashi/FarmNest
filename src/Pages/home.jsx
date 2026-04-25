import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Components/productcard.jsx';
import guava from '../assets/guava.webp';
import sugarcane from '../assets/sugarcane.webp';
import carrot from '../assets/carrot.webp';
import cauliflower from '../assets/cauliflower.webp';
import rice from '../assets/rice.webp';
import onion from '../assets/onion.webp';
import coconut from '../assets/coconut.png';
import apple from '../assets/apple.webp';
import banana from '../assets/banana.png';
import potato from '../assets/potato.png';
import tomato from '../assets/tomato.png';
import mango from '../assets/mango.png';
import spinach from '../assets/spinach.png';
import cabbage from '../assets/cabbage.png';
import greenapple from '../assets/greenapple.png';
import coconutwater from '../assets/coconutwater.png';

const allProducts = [
  {
    title: 'Guava',
    description: 'Enjoy the crisp texture and subtly sweet flavor of our farm-fresh guavas.',
    price: 100,
    originalPrice: 120,
    weight: '1 kg',
    discount: 16,
    rating: 4.5,
    image: guava,
    category: 'Fruits',
  },
  {
    title: 'Sugarcane',
    description: 'Fresh, high-quality sugarcane straight from the farm.',
    price: 200,
    originalPrice: 220,
    weight: '1 Bundle',
    discount: 9,
    rating: 4.2,
    image: sugarcane,
    category: 'Grains',
  },
  {
    title: 'Carrot',
    description: 'A crunchy, sweet root vegetable rich in vitamin A.',
    price: 100,
    originalPrice: 150,
    weight: '500 g',
    discount: 33,
    rating: 4.8,
    image: carrot,
    category: 'Vegetables',
  },
  {
    title: 'Cauliflower',
    description: 'Fresh cauliflower perfect for curries and stir-fry dishes.',
    price: 80,
    originalPrice: 100,
    weight: '1 pc',
    discount: 20,
    rating: 4.1,
    image: cauliflower,
    category: 'Vegetables',
  },
  {
    title: 'Rice',
    description: 'Organic white rice straight from the paddy fields.',
    price: 60,
    originalPrice: 80,
    weight: '1 kg',
    discount: 25,
    rating: 4.6,
    image: rice,
    category: 'Grains',
  },
  {
    title: 'Onion',
    description: 'Red onions with great flavor, harvested locally.',
    price: 90,
    originalPrice: 110,
    weight: '1 kg',
    discount: 18,
    rating: 4.3,
    image: onion,
    category: 'Vegetables',
  },
  {
    title: 'Coconut',
    description: 'Fresh tender coconut for a refreshing drink.',
    price: 40,
    originalPrice: 50,
    weight: '1 pc',
    discount: 20,
    rating: 4.7,
    image: coconut,
    category: 'Fruits',
  },
  {
    title: 'Apple',
    description: 'Crisp and sweet red apples from the hills.',
    price: 150,
    originalPrice: 180,
    weight: '1 kg',
    discount: 16,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
    category: 'Fruits',
  },
  {
    title: 'Potato',
    description: 'Fresh and versatile farm potatoes.',
    price: 40,
    originalPrice: 50,
    weight: '1 kg',
    discount: 20,
    rating: 4.5,
    image: potato,
    category: 'Vegetables',
  },
  {
    title: 'Tomato',
    description: 'Juicy, ripe red tomatoes.',
    price: 60,
    originalPrice: 80,
    weight: '1 kg',
    discount: 25,
    rating: 4.6,
    image: tomato,
    category: 'Vegetables',
  },
  {
    title: 'Banana',
    description: 'Sweet and nutritious yellow bananas.',
    price: 50,
    originalPrice: 60,
    weight: '1 Dozen',
    discount: 16,
    rating: 4.8,
    image: banana,
    category: 'Fruits',
  },
  {
    title: 'Mango',
    description: 'Delicious seasonal mangoes.',
    price: 150,
    originalPrice: 200,
    weight: '1 kg',
    discount: 25,
    rating: 4.9,
    image: mango,
    category: 'Fruits',
  },
  {
    title: 'Spinach',
    description: 'Fresh, organic green spinach leaves.',
    price: 30,
    originalPrice: 40,
    weight: '250 g',
    discount: 25,
    rating: 4.4,
    image: spinach,
    category: 'Vegetables',
  },
  {
    title: 'Cabbage',
    description: 'Crisp green cabbage for your healthy diet.',
    price: 35,
    originalPrice: 45,
    weight: '1 pc',
    discount: 22,
    rating: 4.2,
    image: cabbage,
    category: 'Vegetables',
  },
  {
    title: 'Green Apple',
    description: 'Tangy and crunchy green Granny Smith apples.',
    price: 180,
    originalPrice: 220,
    weight: '1 kg',
    discount: 18,
    rating: 4.6,
    image: greenapple,
    category: 'Fruits',
  },
  {
    title: 'Avocado',
    description: 'Creamy and soft, great for spreads or salads.',
    price: 95,
    originalPrice: 119,
    weight: '1 pc',
    discount: 20,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
    category: 'Fruits',
  },
  {
    title: 'Coconut Water',
    description: 'Refreshing natural coconut water, never from concentrate.',
    price: 80,
    originalPrice: 100,
    weight: '1 pc (Big)',
    discount: 20,
    rating: 4.8,
    image: coconutwater,
    category: 'Fruits',
  }
];

const Home = ({ onAddToCart, filters, isBlurred }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts or route changes
    setAnimate(false);
    setTimeout(() => setAnimate(true), 100);

    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    setSearchQuery(search || '');
  }, [location.search, location.pathname]);

  const filteredProducts = allProducts
    .filter((product) => {
      const categoryMatch =
        Object.values(filters.categories).every((val) => !val) ||
        filters.categories[product.category];
      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const searchMatch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'nameAsc':
          return a.title.localeCompare(b.title);
        case 'nameDesc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="relative">
      {isBlurred && (
        <div className="fixed inset-0 bg-black opacity-30 z-40 pointer-events-none" />
      )}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 transition duration-300 ${
          isBlurred ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        {/* Hero */}
        <div className={`text-center mb-6 sm:mb-10 transition-all duration-500 transform ${
          animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">Fresh From the Farm</h1>
          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
            Get your favorite farm produce delivered fresh and fast!
          </p>
          {searchQuery && (
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Showing results for: <span className="font-semibold">{searchQuery}</span>
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                className={`transition-all duration-500 transform ${
                  animate 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} onAddToCart={onAddToCart} />
              </div>
            ))
          ) : (
            <div className={`col-span-full text-center py-6 sm:py-10 transition-all duration-500 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <p className="text-gray-600 text-base sm:text-lg">
                {searchQuery
                  ? `No products found matching "${searchQuery}"`
                  : 'No products found matching your filters'}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className={`text-center mt-6 sm:mt-10 transition-all duration-500 transform ${
          animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <a
            href="/signup"
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white text-green-600 font-medium rounded-md shadow-md hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
