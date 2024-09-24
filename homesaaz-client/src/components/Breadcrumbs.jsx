import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Breadcrumbs = ({ categoryName }) => {
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

    const parts = location.pathname.split('/').filter(Boolean);

    return (
        <nav className="text-sm font-montserrat mb-4">
            <ol className="list-reset flex">
                <li>
                    <Link to="/" className="text-coral-red hover:underline">Home</Link>
                </li>
                {parts.length > 1 && (
                    <>
                        <li>
                            <span className="mx-2">/</span>
                        </li>
                        <li>
                            <Link to="/categories" className="text-coral-red hover:underline">Categories</Link>
                        </li>
                        <li>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-500">
                            {categoryName}
                        </li>
                    </>
                )}
            </ol>
        </nav>
    );
};

// Make sure this is exported as the default export
export default Breadcrumbs;
