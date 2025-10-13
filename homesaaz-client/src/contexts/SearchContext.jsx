import React, { createContext, useContext, useState, useMemo } from 'react';
import { products, categories, brands, enhancedCategories } from '../constants';

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
    let filtered = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.color.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategoryId === selectedSubcategory);
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brandId === selectedBrand);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        product.tags && selectedTags.every(tag => product.tags.includes(tag))
      );
    }

    // Price range filter
    if (priceRange.min > 0 || priceRange.max < 10000) {
      filtered = filtered.filter(product =>
        product.price === null || 
        (product.price >= priceRange.min && product.price <= priceRange.max)
      );
    }

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
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
          aValue = a.name;
          bValue = b.name;
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
