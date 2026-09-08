import { useState, useRef, useEffect } from 'react';
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
      <div
        ref={searchRef}
        className={`relative flex items-center rounded-brand border bg-white transition duration-brand dark:bg-surface-dark-raised ${
          isFocused
            ? 'border-brand shadow-soft'
            : 'border-black/10 hover:border-black/20 dark:border-white/10'
        }`}
      >
        <MagnifyingGlassIcon className="ml-3 h-5 w-5 text-ink-soft" />

        <input
          type="text"
          placeholder="Search products, brands, categories..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-3 py-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none dark:text-white"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="mr-2 p-1 text-ink-soft hover:text-ink dark:hover:text-white"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}

        {showFilterToggle && (
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`relative mr-2 rounded-brand p-2 transition ${
              activeFiltersCount > 0
                ? 'bg-brand text-white'
                : 'text-ink-soft hover:text-ink dark:hover:text-white'
            }`}
            title="Toggle filters"
            aria-label="Toggle filters"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[0.65rem] font-bold text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>
        )}
      </div>

      {showSuggestions && filteredProducts.length > 0 && (
        <div
          ref={suggestionRef}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-brand-lg border border-black/[0.06] bg-white shadow-soft dark:border-white/10 dark:bg-surface-dark-raised"
        >
          {filteredProducts.slice(0, 5).map((product) => (
            <Link
              key={product.familySlug || product.productId}
              to={`/product/${product.familySlug || product.productId}`}
              className="flex items-center gap-3 border-b border-black/[0.04] p-3 last:border-0 hover:bg-surface-muted dark:border-white/5 dark:hover:bg-white/5"
            >
              <img
                src={product.imgURL}
                alt=""
                className="h-10 w-10 rounded-brand object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink dark:text-white">
                  {product.familyName || product.name}
                </p>
                <p className="truncate text-xs text-ink-soft">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {searchQuery && (
        <div className="mt-2 text-sm text-ink-muted dark:text-gray-400">
          {filteredProducts.length === 0 ? (
            <span>No products found for “{searchQuery}”</span>
          ) : (
            <span>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              {activeFiltersCount > 0 && (
                <button type="button" onClick={clearFilters} className="ml-2 text-brand hover:underline">
                  Clear filters
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
