import React, { useState } from 'react';
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  XMarkIcon,
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useSearchContext } from '../contexts/SearchContext';
import { categories, brands } from '../constants';

const FilterPanel = ({ className = '' }) => {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedTags,
    priceRange,
    inStockOnly,
    availableSubcategories,
    availableBrands,
    availableTags,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedBrand,
    setSelectedTags,
    setPriceRange,
    setInStockOnly,
    clearFilters,
    toggleTag,
    filteredProducts
  } = useSearchContext();

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    tags: false,
    price: false,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, icon: Icon, sectionKey, children }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-b-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left py-2"
      >
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-5 w-5 text-gray-500" />}
          <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const CheckboxOption = ({ label, checked, onChange, count }) => (
    <label className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-2 rounded">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="rounded border-gray-300 text-coral-red focus:ring-coral-red"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-slate-600 px-2 py-1 rounded">
          {count}
        </span>
      )}
    </label>
  );

  const RadioOption = ({ label, value, checked, onChange }) => (
    <label className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-2 rounded">
      <input
        type="radio"
        // Avoid passing null as a value prop to satisfy React's controlled input expectations
        value={value ?? ''}
        checked={checked}
        onChange={onChange}
        className="text-coral-red focus:ring-coral-red"
      />
      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-coral-red hover:underline flex items-center space-x-1"
        >
          <XMarkIcon className="h-4 w-4" />
          <span>Clear all</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
      </div>

      {/* Category Filter */}
      <FilterSection title="Category" sectionKey="category">
        <div className="space-y-2">
          <RadioOption
            label="All Categories"
            value={null}
            checked={selectedCategory === null}
            onChange={() => {
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
          />
          {categories.map((category) => (
            <RadioOption
              key={category.categoryId}
              label={category.category}
              value={category.categoryId}
              checked={selectedCategory === category.categoryId}
              onChange={() => {
                setSelectedCategory(category.categoryId);
                setSelectedSubcategory(null);
              }}
            />
          ))}
        </div>

        {/* Subcategory Filter */}
        {availableSubcategories.length > 0 && (
          <div className="ml-4 mt-3 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subcategories</h4>
            <div className="space-y-2">
              <RadioOption
                label="All Subcategories"
                value={null}
                checked={selectedSubcategory === null}
                onChange={() => setSelectedSubcategory(null)}
              />
              {availableSubcategories.map((subcategory) => (
                <RadioOption
                  key={subcategory.id}
                  label={subcategory.name}
                  value={subcategory.id}
                  checked={selectedSubcategory === subcategory.id}
                  onChange={() => setSelectedSubcategory(subcategory.id)}
                />
              ))}
            </div>
          </div>
        )}
      </FilterSection>

      {/* Brand Filter */}
      {availableBrands.length > 0 && (
        <FilterSection title="Brand" sectionKey="brand">
          <div className="space-y-2">
            <RadioOption
              label="All Brands"
              value={null}
              checked={selectedBrand === null}
              onChange={() => setSelectedBrand(null)}
            />
            {availableBrands.map((brand) => (
              <RadioOption
                key={brand.brandId}
                label={brand.name}
                value={brand.brandId}
                checked={selectedBrand === brand.brandId}
                onChange={() => setSelectedBrand(brand.brandId)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Tags Filter */}
      {availableTags.length > 0 && (
        <FilterSection title="Tags" icon={TagIcon} sectionKey="tags">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableTags.map((tag) => (
              <CheckboxOption
                key={tag}
                label={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {/* Price Range Filter */}
      <FilterSection title="Price Range" icon={CurrencyDollarIcon} sectionKey="price">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min || ''}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max === 10000 ? '' : priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 10000 }))}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection title="Availability" icon={CheckCircleIcon} sectionKey="availability">
        <CheckboxOption
          label="In Stock Only"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
      </FilterSection>
    </div>
  );
};

export default FilterPanel;
