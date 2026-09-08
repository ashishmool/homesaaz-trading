import { categories } from '../constants/index.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcrumbs from './Breadcrumbs.jsx';
import ProductGrid from './ProductGrid.jsx';
import { useSearchContext } from '../contexts/SearchContext';

const SingleCategory = () => {
  const currentURL = useLocation();
  const urlCategoryId = parseInt(currentURL.pathname.split('/').pop(), 10);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const { setSelectedCategory } = useSearchContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    const category = categories.find((cat) => cat.categoryId === urlCategoryId);
    setCategoryName(category ? category.category : 'Unknown Category');
    setCategoryDescription(category ? category.description : '');
    setSelectedCategory(urlCategoryId);

    const images = [];
    for (let i = 1; i <= 10; i++) {
      const imageKey = `categoryImage${i}`;
      if (category && category[imageKey]) {
        images.push(category[imageKey]);
      } else {
        break;
      }
    }
    setCategoryImages(images);
  }, [urlCategoryId, setSelectedCategory]);

  return (
    <section className="section-shell pt-28">
      <div className="max-container">
        <Breadcrumbs
          items={[
            { label: 'Products', to: '/#products' },
            { label: categoryName }
          ]}
        />

        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Category</p>
          <h1 className="section-heading">
            <span className="text-brand">{categoryName}</span>
          </h1>
          <p className="section-lede">{categoryDescription}</p>
        </div>

        <div className="mt-10">
          <ProductGrid
            showFilters={true}
            showSortOptions={true}
            showViewToggle={true}
            itemsPerPage={12}
          />
        </div>

        {categoryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-center font-display text-2xl font-semibold text-ink dark:text-white">
              {categoryName} <span className="text-brand">gallery</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {categoryImages.map((image, index) => (
                <div key={index} className="card-surface overflow-hidden">
                  <img
                    src={image}
                    alt={`${categoryName} ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SingleCategory;
