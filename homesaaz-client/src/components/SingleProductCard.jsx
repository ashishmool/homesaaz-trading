import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { star } from '../assets/icons'; // Assuming the star icon is in assets/icons
import { categories } from '../constants'; // Import categories

const SingleProductCard = ({ productId, imgURL, name, description, dimensions, color, categoryId, brand }) => {
  // Find the category name using the categoryId
  const category = categories.find(cat => cat.categoryId === categoryId);
  const categoryName = category ? category.category : 'Unknown Category'; // Fallback if category is not found

  return (
      <div
          id={productId}
          className="relative flex flex-col justify-between w-full max-sm:w-full rounded-lg p-4 shadow-lg dark:bg-slate-800 gap-10"
      >
        {/* Category Tag */}
        <div className="absolute top-8 right-0 bg-coral-red text-white text-xs font-bold py-1 px-2 rounded-l-full">
          {categoryName}
        </div>

        {/* Product Image */}
        <div className="flex justify-center w-full mt-6">
          <img src={imgURL} alt={`${name}-product`} height={282} className="rounded-lg text-center" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center w-full">
          {/* Product Name */}
          <h3 className="mt-2 text-xl sm:text-2xl leading-normal font-semibold font-palanquin">{name}</h3>

          {/* Product Description */}
          <p className="mt-4 text-sm leading-normal text-slate-gray dark:text-gray-300">{description}</p>

          {/* Product Dimensions, Color, and Brand */}
          <p className="mt-2 text-base font-bold text-slate-gray dark:text-gray-300">Dimensions: {dimensions}</p>
          <p className="mt-2 text-base font-bold text-slate-gray dark:text-gray-300">Color: {color}</p>
          <p className="mt-2 text-base font-bold text-slate-gray dark:text-gray-300">Brand: {brand}</p>

          {/*/!* Category *!/*/}
          {/*<p className="mt-2 text-sm text-slate-gray dark:text-gray-300">Category: {categoryName}</p>*/}
        </div>
      </div>
  );
};

export default SingleProductCard;
