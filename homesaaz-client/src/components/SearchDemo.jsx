import React from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { Link } from 'react-router-dom';

const SearchDemo = () => {
  const { 
    searchQuery, 
    selectedCategory, 
    selectedBrand, 
    selectedTags, 
    filteredProducts,
    clearFilters 
  } = useSearchContext();

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand || selectedTags.length > 0;

  return (
    <div className="bg-gradient-to-r from-coral-red to-red-600 text-white p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-4">🔍 Enhanced Search & Filter System</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold mb-2">✨ New Features:</h4>
          <ul className="space-y-1 text-sm">
            <li>• Advanced product search with real-time suggestions</li>
            <li>• Filter by category, brand, and subcategory</li>
            <li>• Tag-based filtering system</li>
            <li>• Grid and list view modes</li>
            <li>• Sort by name, category, or brand</li>
            <li>• Price range and stock availability filters</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">🏷️ Product Examples:</h4>
          <ul className="space-y-1 text-sm">
            <li>• <strong>Laminate Flooring:</strong> Grade AC4 & AC5 with color variations</li>
            <li>• <strong>Sofa Fabric:</strong> Avalon, Bitcoin, Canosa collections</li>
            <li>• <strong>Pillows:</strong> Fiber, Memory Foam, Micro-Fiber types</li>
            <li>• <strong>Brands:</strong> King Koil, Gem, Springtek, Darling, Trident</li>
          </ul>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-white/20 rounded-lg">
          <p className="text-sm">
            <strong>Active Filters:</strong> 
            {searchQuery && ` Search: "${searchQuery}"`}
            {selectedCategory && ` Category: ${selectedCategory}`}
            {selectedBrand && ` Brand: ${selectedBrand}`}
            {selectedTags.length > 0 && ` Tags: ${selectedTags.join(', ')}`}
          </p>
          <p className="text-sm mt-1">
            Showing {filteredProducts.length} products
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link 
          to="/products" 
          className="px-6 py-3 bg-white text-coral-red font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
        >
          🚀 Launch Product Browser
        </Link>
        <button 
          onClick={clearFilters}
          className="px-4 py-2 bg-white/20 text-white font-semibold rounded hover:bg-white/30 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default SearchDemo;
