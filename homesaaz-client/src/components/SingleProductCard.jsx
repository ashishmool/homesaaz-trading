import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { star } from '../assets/icons'; // Assuming the star icon is in assets/icons
import { categories } from '../constants'; // Import categories

const SingleProductCard = ({ productId, imgURL, name, description, dimensions, color, categoryId, brand }) => {
  // Find the category name using the categoryId
  const category = categories.find(cat => cat.categoryId === categoryId);
  const categoryName = category ? category.category : 'Unknown Category'; // Fallback if category is not found

  // Determine if dimensions and color are present
  const hasDetails = dimensions || color;

  return (
      <div
          id={productId}
          className="relative flex flex-col justify-between w-full max-sm:w-full rounded-lg p-4 shadow-lg dark:bg-slate-800 gap-4"
      >
        {/* Category Tag */}
        <div className="absolute top-8 right-0 bg-coral-red text-white text-xs font-bold py-1 px-2 rounded-l-full">
          {categoryName}
        </div>

        {/* Product Image */}
        {imgURL && (
            <div className="flex justify-center items-center w-full mt-6 aspect-square overflow-hidden">
              <img src={imgURL} alt={`${name}-product`} className="h-full w-full object-cover rounded-lg" />
            </div>
        )}


        {/* Product Details */}
        <div className={`flex flex-col ${hasDetails ? 'justify-start' : 'justify-center items-center mt-0'} w-full`}>
          {/* Product Name */}
          <h3 className={`text-xl sm:text-2xl leading-normal font-semibold font-palanquin ${!hasDetails ? 'text-center' : ''}`}>
            {name}
          </h3>

          {/* Product Description */}
          <p className={`mt-2 text-sm leading-normal text-slate-gray dark:text-gray-300 ${hasDetails ? 'mt-4' : 'mt-2'}`}>
            {description}
          </p>

          {/* Conditionally render Dimensions and Color if they are available */}
          {dimensions && (
              <p className="mt-2 text-base font-bold text-slate-gray dark:text-gray-300">Dimensions: {dimensions}</p>
          )}
          {color && (
              <p className="mt-2 text-base font-bold text-slate-gray dark:text-gray-300">Color: {color}</p>
          )}
        </div>

        {/* Conditionally render Brand Logo if available */}
        {brand && (
            <div className="flex justify-center items-center mt-4 mb-4">
              <img src={brand} alt={`${name}-brand-logo`} width={130} className="rounded-lg" />
            </div>
        )}
      </div>
  );
};

export default SingleProductCard;
