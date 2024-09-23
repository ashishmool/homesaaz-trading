import { categories, products } from '../constants/index.js';
import CategoryCard from './CategoryCard.jsx';
import SingleProductCard from './SingleProductCard.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SingleCategory = () => {
    const currentURL = useLocation();
    const urlString = currentURL.pathname;
    const parts = urlString.split('/');
    const urlCategoryId = parseInt(parts[parts.length - 1]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top

        // Find the category name based on the category ID
        const category = categories.find(cat => cat.categoryId === urlCategoryId);
        setCategoryName(category ? category.category : 'Unknown Category');

        // Filter products by categoryId
        const filteredProducts = products.filter(
            (product) => product.categoryId === urlCategoryId
        );
        setCategoryProducts(filteredProducts);
    }, [urlCategoryId]);

    return (
        <section className="padding">
            <div className="max-container max-sm:mt-12">
                <div className="flex flex-col justify-center items-center gap-5">
                    <h2 className="text-4xl font-palanquin font-bold text-center mt-24 mb-4">
                        Products in <span className="text-coral-red">{categoryName}</span>
                    </h2>
                    <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray dark:text-gray-400 text-center">
                        Explore our selection tailored just for you.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
                    {categoryProducts.map((product) => (
                        <SingleProductCard key={product.productId} {...product} />
                    ))}
                </div>
            </div>

            {/* Uncomment if you want to show similar products */}
            {/*<div className="flex justify-center align-center mt-12 bg-pale-blue dark:bg-slate-700">*/}
            {/*    <div className="m-12 mb-20 max-container max-sm:mt-12">*/}
            {/*        <h2 className="text-2xl font-palanquin font-bold dark:text-slate-200">*/}
            {/*            Similar Products You Might Enjoy*/}
            {/*        </h2>*/}
            {/*        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">*/}
            {/*            {categoryProducts.map((product) => (*/}
            {/*                <CategoryCard key={product.productId} {...product} />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </section>
    );
};

export default SingleCategory;
