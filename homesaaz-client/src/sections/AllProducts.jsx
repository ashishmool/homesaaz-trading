import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';

const AllProducts = () => {
  return (
    <section className="section-shell pt-28">
      <div id="products" className="max-container scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Catalogue</p>
          <h1 className="section-heading">
            All <span className="text-brand">products</span>
          </h1>
          <p className="section-lede">
            Browse the complete collection. Search, filter by category or brand, and sort to find exactly what you need.
          </p>
        </div>

        <div className="mx-auto mb-8 mt-10 max-w-2xl">
          <SearchBar showFilterToggle={true} />
        </div>

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
