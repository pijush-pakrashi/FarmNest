// src/components/FilterDropdown.jsx

import React, { useRef, useEffect, useState } from "react";
import { Slider } from "@mui/material";

const FilterDropdown = ({ filters, setFilters, isOpen, setIsOpen }) => {
  const dropdownRef = useRef(null);
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 bg-white text-green-900 mt-2 rounded-xl shadow-xl z-50 p-5 w-72 space-y-5 border border-green-200"
      ref={dropdownRef}
    >
      {/* Categories */}
      <div>
        <h3 className="font-bold text-green-700 mb-2">Categories</h3>
        {Object.keys(tempFilters.categories).map((cat) => (
          <div key={cat} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              className="accent-green-600 w-4 h-4"
              checked={tempFilters.categories[cat]}
              onChange={() =>
                setTempFilters((prev) => ({
                  ...prev,
                  categories: {
                    ...prev.categories,
                    [cat]: !prev.categories[cat],
                  },
                }))
              }
            />
            <label className="text-sm">{cat}</label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-green-700 mb-2">Price Range (₹)</h3>
        <Slider
          value={tempFilters.priceRange}
          onChange={(e, newVal) =>
            setTempFilters((prev) => ({
              ...prev,
              priceRange: newVal,
            }))
          }
          valueLabelDisplay="auto"
          min={0}
          max={500}
          sx={{ color: "#15803d" }}
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={() => {
          setFilters(tempFilters);
          setIsOpen(false);
        }}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterDropdown;
