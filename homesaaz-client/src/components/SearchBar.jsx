import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useSearchContext } from '../contexts/SearchContext';

const SearchBar = ({ className = '', showFilterToggle = true }) => {
  const {
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    filteredProducts,
    clearFilters,
    selectedCategory,
    selectedBrand,
    selectedTags
  } = useSearchContext();

  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const suggestionRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
      searchRef.current?.blur();
    }
  };

  // Get active filter count
  const activeFiltersCount = [
    selectedCategory,
    selectedBrand,
    selectedTags.length > 0
  ].filter(Boolean).length;

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div 
        ref={searchRef}
        className={`relative flex items-center bg-white dark:bg-slate-800 border-2 rounded-lg transition-all duration-200 ${
          isFocused 
            ? 'border-coral-red shadow-lg' 
            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
        }`}
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-3" />
        
        <input
          type="text"
          placeholder="Search products, brands, categories..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
        />
        
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}

        {/* Filter Toggle Button */}
        {showFilterToggle && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative p-2 mr-2 rounded-md transition-colors ${
              activeFiltersCount > 0
                ? 'bg-coral-red text-white'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            title="Toggle filters"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-coral-red text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && filteredProducts.length > 0 && (
        <div
          ref={suggestionRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {filteredProducts.slice(0, 5).map((product) => (
            <Link
              key={product.familySlug || product.productId}
              to={`/product/${product.familySlug || product.productId}`}
              className="block p-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={product.imgURL}
                  alt={product.familyName || product.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {product.familyName || product.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          
          {filteredProducts.length > 5 && (
            <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
              And {filteredProducts.length - 5} more results...
            </div>
          )}
        </div>
      )}

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {filteredProducts.length === 0 ? (
            <span>No products found for "{searchQuery}"</span>
          ) : (
            <span>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="ml-2 text-coral-red hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
