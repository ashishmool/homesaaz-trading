import { useState } from 'react';
import CategoryCard from '../components/CategoryCard.jsx';
import { categories } from '../constants';

const ProductCategories = ({ searchResults }) => {
  const [filteredProducts, setFilteredProducts] = useState(categories);

  // If searchResults are passed, use them to update the filtered products.
  const displayedProducts = searchResults && searchResults.length > 0 ? searchResults : filteredProducts;

  return (
      <section className="padding">
        <div id="categories" className="max-container max-sm:mt-12">
          <div className="flex flex-col justify-center items-center gap-5">
            <h2 className="text-4xl font-palanquin font-bold text-center">
              Our <span className="text-coral-red">Range of Products</span>
            </h2>
            <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray dark:text-gray-400 text-center">
              Experience top-notch quality and style with our sought-after selections. Discover a world of comfort and value.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
            {displayedProducts.map((product) => (
                <CategoryCard key={product.categoryId} {...product} />
            ))}
          </div>
        </div>
      </section>
  );
};

export default ProductCategories;
