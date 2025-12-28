import { ShoppingCartIcon, TagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { star } from '../assets/icons'; // Assuming the star icon is in assets/icons
import { categories, brands } from '../constants'; // Import categories and brands

const SingleProductCard = ({ 
  familySlug,
  familyName,
  imgURL, 
  name, 
  description, 
  dimensions, 
  color, 
  categoryId, 
  brand,
  brandId,
  tags = [],
  inStock = true,
  variants = [],
  variantCount,
  viewMode = 'grid' // 'grid' or 'list'
}) => {
  // Find the category name using the categoryId
  const category = categories.find(cat => cat.categoryId === categoryId);
  const categoryName = category ? category.category : 'Unknown Category'; // Fallback if category is not found
  
  // Find the brand name using the brandId
  const brandInfo = brands.find(b => b.brandId === brandId);
  const brandName = brandInfo ? brandInfo.name : null;

  // Determine if dimensions and color are present
  const hasDetails = dimensions || color;

  const displayName = familyName || name;
  const summaryDescription = description || (variants?.[0]?.description ?? '');
  const primaryImage = imgURL || variants?.[0]?.imgURL;
  const variantBadges = variants?.slice(0, 3) || [];

  // Grid View Layout
  if (viewMode === 'grid') {
    return (
      <Link to={`/product/${familySlug || variants?.[0]?.variantId || ''}`} className="relative flex flex-col justify-between w-full max-sm:w-full rounded-lg p-4 shadow-lg dark:bg-slate-800 gap-4 hover:shadow-xl transition-shadow duration-300">
        {/* Category Tag */}
        <div className="absolute top-16 right-0 bg-coral-red text-white text-xs font-bold py-1 px-2 rounded-l-full">
          {categoryName}
        </div>

        {/* Stock Status */}
        {!inStock && (
          <div className="absolute top-4 left-4 bg-gray-500 text-white text-xs font-bold py-1 px-2 rounded-full">
            Out of Stock
          </div>
        )}

        {/* Product Image */}
        {primaryImage && (
          <div className="flex justify-center items-center w-full mt-6 aspect-square overflow-hidden">
            <img src={primaryImage} alt={`${displayName}-product`} className="h-full w-full object-cover rounded-lg" />
          </div>
        )}

        {/* Product Details */}
        <div className={`flex flex-col ${hasDetails ? 'justify-start' : 'justify-center items-center mt-0'} w-full`}>
          {/* Product Name */}

          {/*<h3 className={`text-xl sm:text-2xl leading-normal font-semibold font-palanquin ${!hasDetails ? 'text-center' : ''}`}>*/}
          {/*  {displayName}*/}
          {/*</h3>*/}

          <h3 className={`text-xl sm:text-2xl leading-normal font-semibold font-palanquin ${!hasDetails ? 'text-center' : ''}`}>
            {displayName}
          </h3>

          {/* Product Description */}
          <p className={`mt-2 text-sm leading-normal text-slate-gray dark:text-gray-300 ${hasDetails ? 'mt-4' : 'mt-2'}`}>
            {summaryDescription}
          </p>

          {/* Brand Name */}
          {brandName && (
            <p className="mt-1 text-xs text-coral-red font-semibold">
              {brandName}
            </p>
          )}

          {/* Conditionally render Dimensions and Color if they are available */}
          {dimensions && (
            <p className="mt-2 text-base font-bold text-slate-gray dark:text-gray-300">Dimensions: {dimensions}</p>
          )}
          {color && (
            <p className="mt-2 text-base font-bold text-slate-gray dark:text-gray-300">Color: {color}</p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Variant badges */}
          {variantBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {variantBadges.map((variant) => (
                <span
                  key={variant.variantId}
                  className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {variant.variantCode || variant.name}
                </span>
              ))}
              {variantCount > variantBadges.length && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full">
                  +{variantCount - variantBadges.length} more shades
                </span>
              )}
            </div>
          )}
        </div>

        {/* Conditionally render Brand Logo if available */}
        {brand && (
          <div className="flex justify-center items-center mt-4 mb-4">
            <img src={brand} alt={`${name}-brand-logo`} width={130} className="rounded-lg" />
          </div>
        )}
      </Link>
    );
  }

  // List View Layout
  return (
    <Link to={`/product/${familySlug || variants?.[0]?.variantId || ''}`} className="flex bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      {primaryImage && (
        <div className="flex-shrink-0 w-24 h-24 mr-4">
          <img src={primaryImage} alt={`${displayName}-product`} className="w-full h-full object-cover rounded-lg" />
        </div>
      )}

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold font-palanquin text-gray-900 dark:text-white truncate">
                {displayName}
              </h3>
              <span className="inline-flex items-center px-2 py-1 text-xs bg-coral-red text-white rounded-full">
                {categoryName}
              </span>
              {!inStock && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-500 text-white rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-gray dark:text-gray-300">
              {summaryDescription}
            </p>

            {brandName && (
              <p className="mt-1 text-xs text-coral-red font-semibold">
                {brandName}
              </p>
            )}

            {/* Details */}
            <div className="mt-2 space-y-1">
              {dimensions && (
                <p className="text-sm text-slate-gray dark:text-gray-300">
                  <span className="font-medium">Dimensions:</span> {dimensions}
                </p>
              )}
              {color && (
                <p className="text-sm text-slate-gray dark:text-gray-300">
                  <span className="font-medium">Color:</span> {color}
                </p>
              )}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {tags.length > 5 && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full">
                    +{tags.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Brand Logo */}
          {brand && (
            <div className="flex-shrink-0 ml-4">
              <img src={brand} alt={`${name}-brand-logo`} width={80} className="rounded-lg" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SingleProductCard;
