import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, productFamilies } from '../constants';
import Breadcrumbs from './Breadcrumbs.jsx';

const SingleProduct = () => {
  const { productSlug } = useParams();

  const family = useMemo(
    () =>
      productFamilies.find(
        (item) => item.familySlug === productSlug || item.productId === Number(productSlug)
      ),
    [productSlug]
  );

  const [selectedVariantId, setSelectedVariantId] = useState(() => family?.variants?.[0]?.variantId);

  const selectedVariant = useMemo(() => {
    return (
      family?.variants?.find((variant) => variant.variantId === selectedVariantId) ||
      family?.variants?.[0]
    );
  }, [family, selectedVariantId]);

  const [selectedGalleryImage, setSelectedGalleryImage] = useState(() => {
    const variant = family?.variants?.[0];
    return variant?.gallery?.[0] || variant?.imgURL || null;
  });

  const category = family ? categories.find((c) => c.categoryId === family.categoryId) : null;

  useEffect(() => {
    if (selectedVariant) {
      setSelectedGalleryImage(selectedVariant.gallery?.[0] || selectedVariant.imgURL);
    }
  }, [selectedVariant]);

  useEffect(() => {
    if (family?.variants?.[0]?.variantId) {
      setSelectedVariantId(family.variants[0].variantId);
    }
  }, [productSlug, family]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productSlug]);

  const breadcrumbItems = useMemo(() => {
    if (!family) return [];
    const items = [{ label: 'Products', to: '/#products' }];
    if (category) {
      items.push({ label: category.category, to: `/single_category/${category.categoryId}` });
    }
    items.push({ label: family.familyName });
    return items;
  }, [category, family]);

  if (!family) {
    return (
      <div className="max-container section-shell pt-28 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Product not found</h1>
        <Link to="/products" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="section-shell pt-28">
      <div className="max-container">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="card-surface p-4">
            <div className="aspect-square overflow-hidden rounded-brand bg-surface-muted dark:bg-white/5">
              {selectedGalleryImage ? (
                <img
                  src={selectedGalleryImage}
                  alt={`${family.familyName} - ${selectedVariant?.variantCode || ''}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-ink-soft">No image</div>
              )}
            </div>

            {selectedVariant?.gallery?.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {selectedVariant.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedGalleryImage(img)}
                    className={`aspect-square overflow-hidden rounded-brand border transition ${
                      selectedGalleryImage === img
                        ? 'border-brand'
                        : 'border-black/8 hover:border-brand/50 dark:border-white/10'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {category?.category}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-white sm:text-4xl">
                {family.familyName}
              </h1>
              {(family.brand || family.brands) && (
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  {family.brand && (
                    <img src={family.brand} alt="" className="h-9 object-contain opacity-80" />
                  )}
                  {family.brands?.map((brandLogo, idx) => (
                    <img key={idx} src={brandLogo} alt="" className="h-9 object-contain opacity-80" />
                  ))}
                </div>
              )}
            </div>

            <p className="text-base leading-relaxed text-ink-muted dark:text-gray-300">
              {family.description || selectedVariant?.description}
            </p>

            {family.variants?.length > 1 && !family.description?.includes('Water Resistant Protector') && (
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Available shades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {family.variants.map((variant) => (
                    <button
                      key={variant.variantId}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedVariantId(variant.variantId);
                      }}
                      className={`rounded-brand border px-3 py-2 text-sm transition ${
                        selectedVariantId === variant.variantId
                          ? 'border-brand bg-brand/10 text-brand'
                          : 'border-black/10 text-ink-muted hover:border-brand/40 dark:border-white/10 dark:text-gray-300'
                      }`}
                      title={variant.description}
                    >
                      {variant.variantCode || variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(selectedVariant?.dimensions || selectedVariant?.color) && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedVariant?.dimensions && (
                  <div className="rounded-brand-lg border border-black/[0.06] p-4 dark:border-white/10">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      Size / Dimensions
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink dark:text-white">
                      {selectedVariant.dimensions}
                    </p>
                  </div>
                )}
                {selectedVariant?.color && (
                  <div className="rounded-brand-lg border border-black/[0.06] p-4 dark:border-white/10">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      Color
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink dark:text-white">
                      {selectedVariant.color}
                    </p>
                  </div>
                )}
              </div>
            )}

            {family.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {family.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-brand bg-surface-muted px-2.5 py-1 text-xs text-ink-muted dark:bg-white/5 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <Link to="/products" className="btn-secondary self-start">
              Browse all products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
