import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const FILTER_CATEGORIES = [
  { id: 'customerRatings', label: 'Customer Ratings' },
  { id: 'offers', label: 'Offers' },
  { id: 'discount', label: 'Discount' },
  { id: 'organicType', label: 'Organic Type' },
  { id: 'availability', label: 'Availability' },
  { id: 'category', label: 'Category' }
];

const CUSTOMER_RATINGS_OPTIONS = [
  { id: '4', label: '4★ & above' },
  { id: '3', label: '3★ & above' },
  { id: '2', label: '2★ & above' },
  { id: '1', label: '1★ & above' }
];

const CATEGORY_OPTIONS = [
  { id: 'Fruits', label: 'Fruits' },
  { id: 'Vegetables', label: 'Vegetables' },
  { id: 'Grains', label: 'Grains' }
];

const FilterModal = ({ filters, setFilters, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('category');
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    // When modal opens, sync tempFilters with actual filters
    if (isOpen) {
      setTempFilters(filters);
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleClear = () => {
    setTempFilters({
       ...tempFilters,
       categories: { Fruits: false, Vegetables: false, Grains: false },
       customerRatings: { "4": false, "3": false, "2": false, "1": false },
    });
  };

  const handleApply = () => {
    setFilters(tempFilters);
    onClose();
  };

  const handleCategoryChange = (catId) => {
    setTempFilters(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [catId]: !prev.categories[catId]
      }
    }));
  };

  const handleRatingChange = (ratingId) => {
    setTempFilters(prev => ({
      ...prev,
      customerRatings: {
        ...prev.customerRatings,
        [ratingId]: !prev.customerRatings?.[ratingId]
      }
    }));
  };

  return (
    <>
      {/* Backdrop for desktop modal */}
      <div className="fixed inset-0 bg-black/60 z-[90] md:block hidden animate-fade-in" onClick={onClose} />
      
      <div className="fixed inset-0 z-[100] flex flex-col bg-gray-50 sm:animate-fade-in w-full h-[100dvh] md:w-[600px] md:h-[600px] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:shadow-2xl overflow-hidden shadow-xl slide-in-bottom md:slide-in-center">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-[#FCD34D] text-white shrink-0">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          <button onClick={handleClear} className="text-white/90 font-semibold hover:text-white transition-colors">
            Clear Filters
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden bg-white">
          {/* Left Sidebar */}
          <div className="w-[35%] bg-[#F3F4F6] border-r border-gray-200 overflow-y-auto">
            {FILTER_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`w-full text-left px-4 py-4 text-[15px] transition-colors border-l-4 ${
                  activeTab === cat.id 
                    ? 'bg-white border-blue-600 text-blue-700 font-medium' 
                    : 'border-transparent text-gray-800 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-[65%] p-4 overflow-y-auto bg-white">
            {activeTab === 'category' && (
              <div className="space-y-4">
                {CATEGORY_OPTIONS.map(opt => (
                  <label key={opt.id} className="flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                    <div className="relative flex items-center justify-center flex-shrink-0">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-6 h-6 border-[1.5px] border-gray-400 rounded-sm checked:bg-white checked:border-blue-600 transition-colors"
                        checked={tempFilters?.categories?.[opt.id] || false}
                        onChange={() => handleCategoryChange(opt.id)}
                      />
                      <svg className="absolute w-4 h-4 text-blue-600 hidden peer-checked:block pointer-events-none" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-800 text-[16px]">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}

            {activeTab === 'customerRatings' && (
              <div className="space-y-4">
                {CUSTOMER_RATINGS_OPTIONS.map(opt => (
                  <label key={opt.id} className="flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                    <div className="relative flex items-center justify-center flex-shrink-0">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-6 h-6 border-[1.5px] border-gray-400 rounded-sm checked:bg-white checked:border-blue-600 transition-colors"
                        checked={tempFilters?.customerRatings?.[opt.id] || false}
                        onChange={() => handleRatingChange(opt.id)}
                      />
                      <svg className="absolute w-4 h-4 text-blue-600 hidden peer-checked:block pointer-events-none" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-800 text-[16px]">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}
            
            {/* Placeholders for un-implemented filter tabs */}
            {['offers', 'discount', 'organicType', 'availability'].includes(activeTab) && (
              <div className="text-gray-400 text-sm flex items-center justify-center h-full">
                Coming soon...
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0 flex items-center justify-center z-10">
          <button 
            onClick={handleApply}
            className="bg-[#FA5D11] hover:bg-[#e04f0b] text-white font-semibold py-3 px-16 rounded-sm text-[16px] transition-colors focus:ring-4 focus:ring-orange-200 w-full max-w-xs"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
