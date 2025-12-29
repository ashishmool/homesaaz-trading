import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, productFamilies } from '../constants';
import Breadcrumbs from './Breadcrumbs.jsx';

const SingleProduct = () => {
  const { productSlug } = useParams();

  const family = useMemo(
    () => productFamilies.find((item) => item.familySlug === productSlug || item.productId === Number(productSlug)),
    [productSlug]
  );

  const [selectedVariantId, setSelectedVariantId] = useState(() => family?.variants?.[0]?.variantId);
  
  const selectedVariant = useMemo(() => {
    return family?.variants?.find((variant) => variant.variantId === selectedVariantId) || family?.variants?.[0];
  }, [family, selectedVariantId]);
  
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(() => {
    const variant = family?.variants?.[0];
    return variant?.gallery?.[0] || variant?.imgURL || null;
  });

  const category = family ? categories.find((c) => c.categoryId === family.categoryId) : null;

  // Update selected gallery image when variant changes
  useEffect(() => {
    if (selectedVariant) {
      const firstGalleryImage = selectedVariant.gallery?.[0] || selectedVariant.imgURL;
      setSelectedGalleryImage(firstGalleryImage);
    }
  }, [selectedVariant]);

  // Reset selected variant when product family changes
  useEffect(() => {
    if (family?.variants?.[0]?.variantId) {
      setSelectedVariantId(family.variants[0].variantId);
    }
  }, [productSlug, family]);

  // Scroll to top when component mounts or product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productSlug]);

  const breadcrumbItems = useMemo(() => {
    if (!family) return [];
    const items = [{ label: 'Product Range', to: '/#categories' }];
    if (category) {
      items.push({ label: category.category, to: `/single_category/${category.categoryId}` });
    }
    items.push({ label: family.familyName });
    return items;
  }, [category, family]);

  if (!family) {
    return (
      <div className="max-w-4xl mx-auto mt-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Product not found</h1>
        <Link to="/products" className="text-coral-red font-semibold hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="padding-x pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-gray-100 dark:border-gray-700">
              {selectedGalleryImage ? (
                <img
                  src={selectedGalleryImage}
                  alt={`${family.familyName} - ${selectedVariant.variantCode}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No image</div>
              )}
            </div>

            {selectedVariant?.gallery && selectedVariant.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {selectedVariant.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryImage(img)}
                    className="aspect-square rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-coral-red transition-colors"
                  >
                    <img src={img} alt={`${family.familyName}-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{category?.category}</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{family.familyName}</h1>
            {(family.brand || family.brands) && (
              <div className="mt-2 flex items-center gap-4">
                {family.brand && (
                  <img src={family.brand} alt={`${family.familyName}-brand`} className="h-10 object-contain" />
                )}
                {family.brands && family.brands.map((brandLogo, idx) => (
                  <img key={idx} src={brandLogo} alt={`${family.familyName}-brand-${idx}`} className="h-10 object-contain" />
                ))}
              </div>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {family.description || selectedVariant?.description}
          </p>

          {/* Variant chooser */}
          {family.variants?.length > 1 && !family.description?.includes('Water Resistant Protector') && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Available shades</h3>
              <div className="flex flex-wrap gap-2">
                {family.variants.map((variant) => (
                  <button
                    key={variant.variantId}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedVariantId(variant.variantId);
                    }}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      selectedVariantId === variant.variantId
                        ? 'border-coral-red bg-coral-red/10 text-coral-red'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-coral-red'
                    }`}
                    title={variant.description}
                  >
                    {variant.variantCode || variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / dimensions */}
          {(selectedVariant?.dimensions || selectedVariant?.color) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedVariant?.dimensions && (
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs uppercase text-gray-500">Size / Dimensions</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedVariant.dimensions}</p>
                </div>
              )}
              {selectedVariant?.color && (
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs uppercase text-gray-500">Color</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedVariant.color}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {family.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {family.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
