
import ProductGrid from '../components/ProductGrid';
import { categories, brands } from '../constants';

const ProductCategories = ({ searchResults }) => {
  return (
      <section className="padding">
        <div id="categories" className="max-container max-sm:mt-12">
          {/* Search Demo Component */}
          {/* <SearchDemo /> */}
          
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-4xl font-palanquin font-bold text-center">
              Our <span className="text-coral-red">Product Range</span>
            </h2>
            <p className="lg:max-w-xl mt-2 font-montserrat text-slate-gray dark:text-gray-400 text-center">
              Explore our comprehensive range of premium home and hospitality products. We partner with leading manufacturers to bring you the finest quality products for your home and hospitality needs.
            </p>
            {/* <Link 
              to="/products" 
              className="mt-4 px-8 py-4 bg-coral-red text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 text-lg"
            >
              🔍 Browse All Products with Advanced Search & Filters
            </Link> */}
          </div>

          {/* Inline All Products grid with pagination */}
          <div className="mt-12 w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h3 className="text-2xl font-palanquin font-bold text-gray-900 dark:text-white">
                All Products
              </h3>
              <p className="text-sm text-slate-gray dark:text-gray-400">
                Browse everything right here — 16 items per page with filters and sort.
              </p>
            </div>
            <ProductGrid
              showFilters={true}
              showSortOptions={true}
              showViewToggle={true}
              itemsPerPage={16}
            />
          </div>

          {/* Featured Brands Section */}
          <div className="mt-16">
            {/* <div className="text-center mb-12">
              <h3 className="text-2xl font-palanquin font-bold text-gray-900 dark:text-white mb-4">
                Our <span className="text-coral-red">Trusted Brands</span>
              </h3>
              <p className="text-slate-gray dark:text-gray-400 max-w-2xl mx-auto">
                We partner with leading manufacturers to bring you the finest quality products for your home and hospitality needs.
              </p>
            </div> */}

            

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
  {brands.filter(brand => brand.logo).map((brand) => (
    <div
      key={brand.brandId}
      className="group flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
    >
      <div className="w-32 h-32 mb-4 flex items-center justify-center dark:bg-slate-700 rounded-lg overflow-hidden">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-coral-red to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {brand.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 w-8 h-1 bg-coral-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  ))}
</div>


            {/* Brands without logos */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {brands.filter(brand => !brand.logo).map((brand) => (
                <div
                  key={brand.brandId}
                  className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-coral-red to-red-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {brand.name}
                    </h5>
                    <p className="text-sm text-slate-gray dark:text-gray-400">
                      {brand.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link 
                key={category.categoryId} 
                to={`/single_category/${category.categoryId}`}
                className="group relative flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-20 h-20 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={category.imgURL} 
                    alt={category.category}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">
                  {category.category}
                </h3>
                <p className="text-sm text-center text-slate-gray dark:text-gray-400">
                  {category.description}
                </p>
                <div className="absolute top-4 right-4 w-3 h-3 bg-coral-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div> */}

          
        </div>
      </section>
  );
};

export default ProductCategories;
