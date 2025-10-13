import React from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';

const AllProducts = () => {
  const { clearFilters } = useSearchContext();

  return (
    <section className="padding mt-24">
      <div className="max-container">
        {/* Header */}
        <div className="flex flex-col justify-center items-center gap-5 mb-8">
          <h2 className="text-4xl font-palanquin font-bold text-center">
            All <span className="text-coral-red">Products</span>
          </h2>
          <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray dark:text-gray-400 text-center">
            Browse our complete collection of premium home and hospitality products. Use our advanced search and filtering tools to find exactly what you need.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar className="max-w-2xl mx-auto" showFilterToggle={true} />
        </div>

        {/* Product Grid */}
        <ProductGrid 
          showFilters={true}
          showSortOptions={true}
          showViewToggle={true}
          itemsPerPage={24}
        />
      </div>
    </section>
  );
};

export default AllProducts;
