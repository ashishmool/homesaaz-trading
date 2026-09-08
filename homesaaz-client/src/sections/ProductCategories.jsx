import ProductGrid from '../components/ProductGrid';
import { brands, categories } from '../constants';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  const featuredCategories = categories.slice(0, 8);

  return (
    <section className="section-shell bg-white dark:bg-surface-dark">
      <div id="products" className="max-container scroll-mt-24">
        <div id="categories" className="flex flex-col items-center text-center">
          <p className="section-kicker">Catalogue</p>
          <h2 className="section-heading">
            Our <span className="text-brand">product range</span>
          </h2>
          <p className="section-lede">
            Explore premium home and hospitality products — filter by category, brand, or search to find the right fit.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.categoryId}
              to={`/single_category/${category.categoryId}`}
              className="group card-surface p-3 sm:p-4"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-brand bg-surface-muted dark:bg-white/5">
                <img
                  src={category.imgURL}
                  alt={category.category}
                  className="h-full w-full object-cover transition duration-500 ease-brand group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3">
                <h3 className="font-display text-sm font-semibold text-ink dark:text-white sm:text-base">
                  {category.category}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-ink-soft dark:text-gray-500">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink dark:text-white sm:text-2xl">
              All products
            </h3>
            <p className="mt-1 text-sm text-ink-muted dark:text-gray-400">
              Browse the full range with filters and sorting.
            </p>
          </div>
          <Link to="/products" className="btn-secondary self-start sm:self-auto">
            Open full catalogue
          </Link>
        </div>

        <div className="mt-6 w-full">
          <ProductGrid
            showFilters={true}
            showSortOptions={true}
            showViewToggle={true}
            itemsPerPage={16}
          />
        </div>

        <div className="mt-16">
          <div className="mb-8 text-center">
            <p className="section-kicker">Partners</p>
            <h3 className="section-heading text-2xl sm:text-3xl">
              Trusted <span className="text-brand">brands</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {brands
              .filter((brand) => brand.logo)
              .map((brand) => (
                <div
                  key={brand.brandId}
                  className="card-surface flex h-28 items-center justify-center p-5"
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-14 w-full object-contain opacity-80 grayscale transition duration-brand hover:opacity-100 hover:grayscale-0 dark:brightness-110"
                  />
                </div>
              ))}
          </div>

          {brands.some((b) => !b.logo) && (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {brands
                .filter((brand) => !brand.logo)
                .map((brand) => (
                  <div
                    key={brand.brandId}
                    className="flex items-center gap-4 rounded-brand-lg border border-black/[0.06] px-4 py-3 dark:border-white/10"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-brand bg-brand text-sm font-bold text-white">
                      {brand.name.charAt(0)}
                    </span>
                    <div>
                      <h5 className="text-sm font-semibold text-ink dark:text-white">{brand.name}</h5>
                      <p className="text-xs text-ink-muted dark:text-gray-400">{brand.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
