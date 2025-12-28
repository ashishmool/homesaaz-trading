import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

const Breadcrumbs = ({ items, categoryName }) => {
    const location = useLocation();

    // Scroll to the corresponding section when the hash changes
    useEffect(() => {
        if (location.hash) {
            const targetElement = document.getElementById(location.hash.slice(1));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const trail = useMemo(() => {
        if (items?.length) return items;
        if (categoryName) return [{ label: categoryName }];
        return [];
    }, [items, categoryName]);

    return (
        <nav className="text-sm font-montserrat mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-gray-500 dark:text-gray-400">
                <li>
                    <Link to="/" className="text-coral-red hover:underline">Home</Link>
                </li>
                {trail.map((crumb, index) => (
                    <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
                        <span className="text-gray-400">/</span>
                        {crumb.to ? (
                            <Link to={crumb.to} className="text-coral-red hover:underline">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-gray-700 dark:text-gray-200">{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
