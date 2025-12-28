import React, { createContext, useContext, useState, useMemo } from 'react';
import { categories, brands, enhancedCategories, productFamilies } from '../constants';

const SearchContext = createContext();

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // name, category, brand
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let filtered = productFamilies.map((family) => ({
      ...family,
      tags: family.tags || [],
    }));

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(family => {
        const familyName = (family.familyName || '').toLowerCase();
        const description = (family.description || '').toLowerCase();
        const tags = Array.isArray(family.tags) ? family.tags : [];

        const variantMatch = family.variants?.some((variant) => {
          const variantName = (variant.name || '').toLowerCase();
          const variantDescription = (variant.description || '').toLowerCase();
          const variantColor = (variant.color || '').toLowerCase();
          return (
            variantName.includes(query) ||
            variantDescription.includes(query) ||
            variantColor.includes(query)
          );
        });

        return (
          familyName.includes(query) ||
          description.includes(query) ||
          tags.some(tag => (tag || '').toLowerCase().includes(query)) ||
          variantMatch
        );
      });
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(family => 
        family.categoryId === selectedCategory ||
        family.variants?.some(v => v.categoryId === selectedCategory)
      );
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(family => 
        family.subcategoryId === selectedSubcategory ||
        family.variants?.some(v => v.subcategoryId === selectedSubcategory)
      );
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(family => 
        family.brandId === selectedBrand ||
        family.variants?.some(v => v.brandId === selectedBrand)
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(family =>
        family.tags && selectedTags.every(tag => family.tags.includes(tag))
      );
    }

    // Price range filter
    if (priceRange.min > 0 || priceRange.max < 10000) {
      filtered = filtered.filter(family => {
        const hasPricedVariant = family.variants?.some((variant) =>
          variant.price !== null &&
          variant.price >= priceRange.min &&
          variant.price <= priceRange.max
        );

        // If no variant has price, keep it visible
        return hasPricedVariant || family.variants?.every(v => v.price === null);
      });
    }

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(family => family.inStock || family.variants?.some(v => v.inStock));
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.familyName || a.name;
          bValue = b.familyName || b.name;
          break;
        case 'category':
          aValue = categories.find(cat => cat.categoryId === a.categoryId)?.category || '';
          bValue = categories.find(cat => cat.categoryId === b.categoryId)?.category || '';
          break;
        case 'brand':
          aValue = brands.find(brand => brand.brandId === a.brandId)?.name || '';
          bValue = brands.find(brand => brand.brandId === b.brandId)?.name || '';
          break;
        default:
          aValue = a.familyName || a.name;
          bValue = b.familyName || b.name;
      }

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedTags,
    sortBy,
    sortOrder,
    priceRange,
    inStockOnly
  ]);

  // Get available subcategories for selected category
  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    
    const category = enhancedCategories.find(cat => cat.categoryId === selectedCategory);
    return category?.subcategories || [];
  }, [selectedCategory]);

  // Get available brands from filtered products
  const availableBrands = useMemo(() => {
    const brandIds = new Set();
    filteredProducts.forEach(product => {
      if (product.brandId) {
        brandIds.add(product.brandId);
      }
    });
    
    return brands.filter(brand => brandIds.has(brand.brandId));
  }, [filteredProducts]);

  // Get available tags from filtered products
  const availableTags = useMemo(() => {
    const tagSet = new Set();
    filteredProducts.forEach(product => {
      if (product.tags) {
        product.tags.forEach(tag => tagSet.add(tag));
      }
    });
    
    return Array.from(tagSet).sort();
  }, [filteredProducts]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedBrand(null);
    setSelectedTags([]);
    setPriceRange({ min: 0, max: 10000 });
    setInStockOnly(false);
  };

  // Add/remove tag from filter
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const value = {
    // State
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedTags,
    sortBy,
    sortOrder,
    showFilters,
    priceRange,
    inStockOnly,
    
    // Computed values
    filteredProducts,
    availableSubcategories,
    availableBrands,
    availableTags,
    
    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedBrand,
    setSelectedTags,
    setSortBy,
    setSortOrder,
    setShowFilters,
    setPriceRange,
    setInStockOnly,
    clearFilters,
    toggleTag
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
