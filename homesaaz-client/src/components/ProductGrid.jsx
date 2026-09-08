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

  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
  };

  const getSortIcon = (sortKey) => {
    if (sortBy !== sortKey) {
      return <ArrowsUpDownIcon className="h-3.5 w-3.5 opacity-50" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUpIcon className="h-3.5 w-3.5" />
    ) : (
      <ArrowDownIcon className="h-3.5 w-3.5" />
    );
  };

  const SortButton = ({ sortKey, children }) => (
    <button
      type="button"
      onClick={() => handleSortChange(sortKey)}
      className={`inline-flex items-center gap-1.5 rounded-brand px-3 py-2 text-xs font-semibold transition ${
        sortBy === sortKey
          ? 'bg-brand text-white'
          : 'border border-black/10 bg-white text-ink-muted hover:border-brand/40 hover:text-ink dark:border-white/10 dark:bg-surface-dark-raised dark:text-gray-300'
      }`}
    >
      <span>{children}</span>
      {getSortIcon(sortKey)}
    </button>
  );

  return (
    <div className={className}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted dark:text-gray-400">
          Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}–
          {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {showFilters && (
            <button
              type="button"
              onClick={() => setShowFilters(!showFiltersPanel)}
              className={`inline-flex items-center gap-2 rounded-brand px-3 py-2 text-xs font-semibold transition ${
                showFiltersPanel
                  ? 'bg-brand text-white'
                  : 'border border-black/10 text-ink-muted hover:border-brand/40 dark:border-white/10 dark:text-gray-300'
              }`}
            >
              <FunnelIcon className="h-4 w-4" />
              Filters
            </button>
          )}

          {showSortOptions && (
            <div className="flex flex-wrap items-center gap-1.5">
              <SortButton sortKey="name">Name</SortButton>
              <SortButton sortKey="category">Category</SortButton>
              <SortButton sortKey="brand">Brand</SortButton>
            </div>
          )}

          {showViewToggle && (
            <div className="inline-flex overflow-hidden rounded-brand border border-black/10 dark:border-white/10">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-brand text-white' : 'text-ink-muted hover:bg-surface-muted dark:hover:bg-white/5'}`}
              >
                <Squares2X2Icon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-brand text-white' : 'text-ink-muted hover:bg-surface-muted dark:hover:bg-white/5'}`}
              >
                <Bars3Icon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`flex flex-col gap-6 ${showFilters && showFiltersPanel ? 'lg:flex-row' : ''}`}>
        {showFilters && showFiltersPanel && (
          <aside className="w-full shrink-0 lg:w-64">
            <FilterPanel />
          </aside>
        )}

        <div className="min-w-0 flex-1">
          {paginatedProducts.length === 0 ? (
            <div className="rounded-brand-lg border border-dashed border-black/10 px-6 py-16 text-center dark:border-white/10">
              <h3 className="font-display text-xl font-semibold text-ink dark:text-white">No products found</h3>
              <p className="mt-2 text-sm text-ink-muted dark:text-gray-400">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                    : 'space-y-3'
                }
              >
                {paginatedProducts.map((product) => (
                  <SingleProductCard
                    key={product.familySlug || product.productId}
                    {...product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="rounded-brand border border-black/10 px-3 py-2 text-sm disabled:opacity-40 dark:border-white/10"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                    .map((page, idx, arr) => (
                      <React.Fragment key={page}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-1 text-ink-soft">…</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-10 rounded-brand px-3 py-2 text-sm font-medium ${
                            currentPage === page
                              ? 'bg-brand text-white'
                              : 'border border-black/10 dark:border-white/10'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-brand border border-black/10 px-3 py-2 text-sm disabled:opacity-40 dark:border-white/10"
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
