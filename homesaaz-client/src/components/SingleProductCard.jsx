import { TagIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { categories, brands } from '../constants';

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
  viewMode = 'grid'
}) => {
  const category = categories.find((cat) => cat.categoryId === categoryId);
  const categoryName = category ? category.category : 'Category';
  const brandInfo = brands.find((b) => b.brandId === brandId);
  const brandName = brandInfo ? brandInfo.name : null;
  const displayName = familyName || name;
  const summaryDescription = description || variants?.[0]?.description || '';
  const primaryImage = imgURL || variants?.[0]?.imgURL;
  const variantBadges = variants?.slice(0, 3) || [];

  if (viewMode === 'grid') {
    return (
      <Link
        to={`/product/${familySlug || variants?.[0]?.variantId || ''}`}
        className="group card-surface flex h-full flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted dark:bg-white/5">
          {primaryImage && (
            <img
              src={primaryImage}
              alt={displayName}
              className="h-full w-full object-cover transition duration-500 ease-brand group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded-brand bg-ink/85 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
              {categoryName}
            </span>
            {!inStock && (
              <span className="rounded-brand bg-black/55 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                Out of stock
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          {brandName && (
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand">
              {brandName}
            </p>
          )}
          <h3 className="font-display text-lg font-semibold leading-snug text-ink dark:text-white">
            {displayName}
          </h3>
          {summaryDescription && (
            <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted dark:text-gray-400">
              {summaryDescription}
            </p>
          )}

          {(dimensions || color) && (
            <div className="mt-1 space-y-0.5 text-xs text-ink-soft dark:text-gray-500">
              {dimensions && <p>Dimensions: {dimensions}</p>}
              {color && <p>Color: {color}</p>}
            </div>
          )}

          {tags?.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-brand bg-surface-muted px-2 py-1 text-[0.7rem] text-ink-muted dark:bg-white/5 dark:text-gray-400"
                >
                  <TagIcon className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {variantBadges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {variantBadges.map((variant) => (
                <span
                  key={variant.variantId}
                  className="rounded-brand border border-black/8 px-2 py-0.5 text-[0.7rem] text-ink-muted dark:border-white/10 dark:text-gray-400"
                >
                  {variant.variantCode || variant.name}
                </span>
              ))}
              {variantCount > variantBadges.length && (
                <span className="text-[0.7rem] text-ink-soft">
                  +{variantCount - variantBadges.length} more
                </span>
              )}
            </div>
          )}

          {brand && (
            <div className="mt-2 flex justify-start">
              <img src={brand} alt="" className="h-8 w-auto object-contain opacity-70" />
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${familySlug || variants?.[0]?.variantId || ''}`}
      className="card-surface flex gap-4 p-4 transition hover:border-brand/30"
    >
      {primaryImage && (
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-brand bg-surface-muted dark:bg-white/5">
          <img src={primaryImage} alt={displayName} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-semibold text-ink dark:text-white">{displayName}</h3>
          <span className="rounded-brand bg-brand px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
            {categoryName}
          </span>
          {!inStock && (
            <span className="rounded-brand bg-black/50 px-2 py-0.5 text-[0.65rem] font-semibold text-white">
              Out of stock
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted dark:text-gray-400">{summaryDescription}</p>
        {brandName && <p className="mt-1 text-xs font-semibold text-brand">{brandName}</p>}
        {(dimensions || color) && (
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-ink-soft">
            {dimensions && <span>Dimensions: {dimensions}</span>}
            {color && <span>Color: {color}</span>}
          </div>
        )}
      </div>
      {brand && <img src={brand} alt="" className="hidden h-10 w-auto object-contain sm:block" />}
    </Link>
  );
};

export default SingleProductCard;
