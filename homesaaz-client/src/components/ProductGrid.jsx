import React, { useState } from 'react';
import { 
  Bars3Icon, 
  Squares2X2Icon, 
  FunnelIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { useSearchContext } from '../contexts/SearchContext';
import SingleProductCard from './SingleProductCard';
import FilterPanel from './FilterPanel';

const ProductGrid = ({ 
  className = '',
  showFilters = true,
  showSortOptions = true,
  showViewToggle = true,
  itemsPerPage = 12
}) => {
  const {
    filteredProducts,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    showFilters: showFiltersPanel,
    setShowFilters
  } = useSearchContext();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (sortKey) => {
    if (sortBy !== sortKey) {
      return <ArrowsUpDownIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortOrder === 'asc' ? 
      <ArrowUpIcon className="h-4 w-4 text-coral-red" /> : 
      <ArrowDownIcon className="h-4 w-4 text-coral-red" />;
  };

  const SortButton = ({ sortKey, children }) => (
    <button
      onClick={() => handleSortChange(sortKey)}
      className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors ${
        sortBy === sortKey
          ? 'bg-coral-red text-white'
          : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
      }`}
    >
      <span>{children}</span>
      {getSortIcon(sortKey)}
    </button>
  );

  return (
    <div className={`${className}`}>
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Results Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Filter Toggle */}
          {showFilters && (
            <button
              onClick={() => setShowFilters(!showFiltersPanel)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                showFiltersPanel
                  ? 'bg-coral-red text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <FunnelIcon className="h-4 w-4" />
              <span>Filters</span>
              {showFiltersPanel && (
                <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  ON
                </span>
              )}
            </button>
          )}

          {/* Sort Options */}
          {showSortOptions && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <div className="flex space-x-1">
                <SortButton sortKey="name">Name</SortButton>
                <SortButton sortKey="category">Category</SortButton>
                <SortButton sortKey="brand">Brand</SortButton>
              </div>
            </div>
          )}

          {/* View Toggle */}
          {showViewToggle && (
            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-coral-red text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <Squares2X2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-coral-red text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <Bars3Icon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Filters Panel */}
        {showFilters && showFiltersPanel && (
          <div className="w-64 flex-shrink-0">
            <FilterPanel />
          </div>
        )}

        {/* Products Grid/List */}
        <div className="flex-1">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {paginatedProducts.map((product) => (
                  <SingleProductCard
                    key={product.productId}
                    {...product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? 'bg-coral-red text-white'
                          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
