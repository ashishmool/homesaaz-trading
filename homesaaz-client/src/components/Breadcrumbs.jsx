import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { scrollToId, getHashId } from '../helpers/scroll';

const Breadcrumbs = ({ items, categoryName }) => {
  const location = useLocation();

  useEffect(() => {
    const id = getHashId(location.hash);
    if (id) scrollToId(id);
  }, [location]);

  const trail = useMemo(() => {
    if (items?.length) return items;
    if (categoryName) return [{ label: categoryName }];
    return [];
  }, [items, categoryName]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-muted dark:text-gray-400">
        <li>
          <Link to="/" className="font-medium text-brand hover:underline">
            Home
          </Link>
        </li>
        {trail.map((crumb, index) => (
          <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
            <span className="text-ink-soft" aria-hidden="true">
              /
            </span>
            {crumb.to ? (
              <Link to={crumb.to} className="font-medium text-brand hover:underline">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink dark:text-gray-200">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
